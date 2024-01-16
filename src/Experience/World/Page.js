import * as THREE from 'three'
import Experience from '../Experience.js'

import simVertex from '../Shaders/Particles/FBO/simulation.vert?raw';
import simFragment from '../Shaders/Particles/FBO/simulation.frag?raw';

import renderVertex from '../Shaders/Particles/FBO/render.vert?raw';
import renderFragment from '../Shaders/Particles/FBO/render.frag?raw';

export default class Page {
    constructor() {
        this.experience = new Experience()
        this.debug = this.experience.debug
        this.scene = this.experience.scene
        this.time = this.experience.time
        this.camera = this.experience.camera.instance
        this.renderer = this.experience.renderer.instance
        this.sizes = this.experience.sizes
        this.width = 512
        this.height = 512
        this.size = 512
        this.raycaster = new THREE.Raycaster()
        this.pointer = new THREE.Vector2()

        this.setFBOParticles()
        this.createParticles()
        this.trackMousePos()
    }

    trackMousePos() {
        this.dummy = new THREE.Mesh(
            new THREE.PlaneGeometry(100, 100),
            new THREE.MeshBasicMaterial({color: 'red'})
        )
        
        document.addEventListener('pointermove', (e) => {
            this.pointer.x = (e.clientX / window.innerWidth) * 2 - 1
            this.pointer.y = -((e.clientY / window.innerHeight) * 2 - 1)

            this.raycaster.setFromCamera(this.pointer, this.camera)
            let intersects = this.raycaster.intersectObject(this.dummy)
            if(intersects.length > 0) {
                let {x, y} = intersects[0].point
                this.fboMaterial.uniforms.uMouse.value = new THREE.Vector2(x, y)
            }
        })
    }

    createParticles() {
        this.count = this.size * this.size

        let geometry = new THREE.BufferGeometry()
        let positions = new Float32Array(this.count * 3)
        let uv = new Float32Array(this.count * 2)

        for(let i = 0; i < this.size; i++) {
            for(let j = 0; j < this.size; j++) {
                let index = (i + j ) * 4
                let i3 = index * 3
                let i2 = index * 2

                positions[i3 + 0] = Math.random()
                positions[i3 + 1] = Math.random()
                positions[i3 + 2] = 1.0

                uv[i2 + 0] = i / this.size
                uv[i2 + 1] = j / this.size
            }
        }

        console.log(positions.length / 3);

        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
        geometry.setAttribute('uv', new THREE.BufferAttribute(uv, 2))

        this.particleMaterial = new THREE.ShaderMaterial( {
            uniforms: {
                uTime: { value: 0},
                uSize: { value: 10 * this.renderer.getPixelRatio()},
                uPositions: { value: this.fboTexture}
            },
            vertexShader: renderVertex,
            fragmentShader: renderFragment,
            transparent: false,
            // depthWrite: false,
            // depthTest: false,
            blending:THREE.AdditiveBlending
        } );

        this.points = new THREE.Points(geometry, this.particleMaterial)
        this.scene.add(this.points)
    }

    createTarget() {
        // Create a render target texture
        let rtt = new THREE.WebGLRenderTarget(this.width, this.height, {
            minFilter: THREE.NearestFilter, // Important because we want to sample square pixels
            magFilter: THREE.NearestFilter,
            generateMipmaps: false, // No need
            colorSpace: THREE.SRGBColorSpace, // No need
            depthBuffer: false, // No need
            stencilBuffer: false, // No need
            format: THREE.RGBAFormat, // Or RGBAFormat instead (to have a color for each particle, for example)
            type: THREE.FloatType // Important because we need precise coordinates (not ints)
        });

        return rtt
    }

    setFBOParticles() {
        // Render target's scene and camera
        this.fboScene = new THREE.Scene();
        this.fboCamera = new THREE.OrthographicCamera(-1, 1, 1, -1, -1, 1);
        this.fboCamera.position.set(0, 0, 0.5)
        this.fboCamera.lookAt(0, 0, 0)

        // two render targets
        this.fbo = this.createTarget()
        this.fbo1 = this.createTarget()
        this.geometry = new THREE.PlaneGeometry(2, 2)

        this.data = new Float32Array(this.size * this.size * 4)

        for(let i = 0; i < this.size; i++) {
            for(let j = 0; j < this.size; j++) {
                let index = (i + j * this.size) * 4
                let theta = Math.random() * Math.PI * 2
                let r = 0.5 + 0.5*Math.random()
                this.data[index + 0] = r*Math.cos(theta)
                this.data[index + 1] = r*Math.sin(theta)
                this.data[index + 2] = 1.0
                this.data[index + 3] = 1.0
            }
        }

        this.fboTexture = new THREE.DataTexture(
            this.data, 
            this.size, 
            this.size, 
            THREE.RGBAFormat, 
            THREE.FloatType, 
            )

        this.fboTexture.magFilter = THREE.NearestFilter
        this.fboTexture.minFilter = THREE.NearestFilter
        this.fboTexture.needsUpdate = true; 

        this.fboMaterial = new THREE.ShaderMaterial({
            uniforms: {
                uPositions: {value: this.fboTexture },
                uInfo: {value: null},
                uTime: {value: 0},
                uMouse: {value: new THREE.Vector2(0, 0)}
            },
            vertexShader: simVertex,
            fragmentShader:  simFragment
        });

        // Second Texture

        this.infoArray = new Float32Array(this.size * this.size * 4)

        for(let i = 0; i < this.size; i++) {
            for(let j = 0; j < this.size; j++) {
                let index = (i + j * this.size) * 4
                this.infoArray[index + 0] = 0.5 + Math.random()
                this.infoArray[index + 1] = 0.5 + Math.random()
                this.infoArray[index + 2] = 1.0
                this.infoArray[index + 3] = 1.0
            }
        }

        this.info = new THREE.DataTexture(
            this.infoArray, 
            this.size, 
            this.size, 
            THREE.RGBAFormat, 
            THREE.FloatType, 
            )

        this.info.magFilter = THREE.NearestFilter
        this.info.minFilter = THREE.NearestFilter
        this.info.needsUpdate = true;
        
        this.fboMaterial.uniforms.uInfo.value = this.info

        this.fboMesh = new THREE.Mesh(this.geometry, this.fboMaterial)
        this.fboScene.add(this.fboMesh)

        this.renderer.setRenderTarget(this.fbo)
        this.renderer.render(this.fboScene, this.fboCamera)
        this.renderer.setRenderTarget(this.fbo1)
        this.renderer.render(this.fboScene, this.fboCamera)

    }

    resize() {
        // this.FBO.resize(this.sizes.width, this.sizes.height);
        // this.renderShader.uniforms.uPixelRatio.value = Math.min(window.devicePixelRatio, 2)
    }

    update() {
        this.fboMaterial.uniforms.uTime.value = this.time.elapsed * 0.0001
        this.particleMaterial.uniforms.uTime.value = this.time.elapsed * 0.0001

        this.fboMaterial.uniforms.uPositions.value = this.fbo1.texture
        this.particleMaterial.uniforms.uPositions.value = this.fbo.texture
        this.renderer.setRenderTarget(this.fbo)
        this.renderer.render(this.fboScene, this.fboCamera)
        this.renderer.setRenderTarget(null)
        this.renderer.render(this.scene, this.camera)

        // swap render targets
        let temp = this.fbo
        this.fbo = this.fbo1
        this.fbo1 = temp
    }
}
