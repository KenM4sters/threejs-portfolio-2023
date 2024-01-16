import Experience from "../Experience";
import starsVertex from '../Shaders/stars.vs?raw'
import starsFragment from '../Shaders/stars.fs?raw'
import * as THREE from 'three'

export default class StarDome {
    constructor() {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.renderer = this.experience.renderer
        this.time = this.experience.time
        this.sizes = this.experience.sizes
        this.params = {}
        this.params.count = 10000
        this.params.domeLength = 100

        this.generateStars()
    }

    generateStars() {
        const positions = new Float32Array(this.params.count * 3)
        
        for(let i = 0; i < this.params.count * 3; i++) {
            let i3 = i * 3
            
            positions[i3 + 0] = (Math.random() - 0.5) * 100
            positions[i3 + 1] = (Math.random() - 0.5) * 100
            positions[i3 + 2] = (Math.random() - 0.5) * 100
        }

        this.geometry = new THREE.BufferGeometry()
        this.geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
        this.material = new THREE.ShaderMaterial({
            depthWrite: false,
            blending: THREE.AdditiveBlending,
            vertexColors: true,
            uniforms:
            {
                uTime: { value: 0 },
                uSize: { value: 30 * this.sizes.pixelRatio }
            },    
            vertexShader: starsVertex,
            fragmentShader: starsFragment
        }) 

        this.points = new THREE.Points(this.geometry, this.material)

        this.scene.add(this.points)

    }

    update() {
        // this.material.uniforms.uTime.value = this.time.elapsed * 0.0001
    }
}