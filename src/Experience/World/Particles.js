import Experience from "../Experience"
import * as THREE from "three"
import particlesVertexShader from "../Shaders/Particles/particles.vs?raw"
import particlesFragmentShader from "../Shaders/Particles/particles.fs?raw"

export default class Particles{
    constructor() {
        
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.time = this.experience.time
        this.renderer = this.experience.renderer
        this.sizes = this.experience.sizes

        this.params = {}
        this.params.count = Math.pow(2, 14)
        this.params.perimeterCount = Math.sqrt(this.params.count)
        this.params.perimeterLength = 100
        this.params.size = 0.005
        this.params.color = '#ffffff'

        this.geometry = null
        this.material = null
        this.points = null

        this.generateParticles()
    }

    generateParticles() {
        
        if(this.points !== null) {
            this.geometry.dispose()
            this.material.dispose()
            this.scene.remove(this.points)
        }

        this.geometry = new THREE.BufferGeometry()
        const positions = new Float32Array(this.params.count * 3)

        // let rowCounter = 0
        // let z_displacement = (this.params.perimeterLength / 2)
        // let x_displacement = -(this.params.perimeterLength / 2)

        // for(let i = 0; i < this.params.count; i++) {
        //     let i3 = i * 3
        //     positions[i3 + 0] = x_displacement
        //     positions[i3 + 1] = 0
        //     positions[i3 + 2] = z_displacement

        //     // console.log(positions[i])

        //     if(rowCounter % this.params.perimeterCount == 0) {
        //         z_displacement -= this.params.perimeterLength / this.params.perimeterCount
        //         x_displacement = -(this.params.perimeterLength / 2)
        //     }

        //     x_displacement += this.params.perimeterLength / this.params.perimeterCount
        //     rowCounter += 1

        //     positions[i]
        // }

        // for(let i = 0; i < this.params.count; i++) {
        //     let i3 = i * 3
        //     positions[i3 + 0] = 
        //     positions[i3 + 1] =
        //     positions[i3 + 2] =

        // }

        this.geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))

        this.material = new THREE.ShaderMaterial({
            depthWrite: false,
            blending: THREE.AdditiveBlending,
            vertexColors: true,
            uniforms:
            {
                uTime: { value: 0 },
                uSize: { value: 60 * this.sizes.pixelRatio }
            },    
            vertexShader: particlesVertexShader,
            fragmentShader: particlesFragmentShader
        }) 

        this.points = new THREE.Points(this.geometry, this.material)
        this.scene.add(this.points)

    }

    update() {
        this.material.uniforms.uTime.value = this.time.elapsed * 0.0001
    }
}