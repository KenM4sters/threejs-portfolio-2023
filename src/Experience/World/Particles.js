import Experience from "../Experience";
import * as THREE from "three";
import particlesVertexShader from "../Shaders/Particles/particles.vs?raw"
import particlesFragmentShader from "../Shaders/Particles/particles.fs?raw"

export default class Particles {
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.time = this.experience.time;
        this.renderer = this.experience.renderer;
        this.sizes = this.experience.sizes;

        this.params = {};
        this.params.count = 1000;
        this.params.size = 0.005;
        this.params.color = '#ffffff';

        this.geometry = null;
        this.material = null;
        this.points = null;

        this.generateParticles();
    }

    generateParticles() {
        if(this.points !== null) {
            this.geometry.dispose();
            this.material.dispose();
            this.scene.remove(this.points);
        }

        this.geometry = new THREE.TorusGeometry(0.7, 0.2, 16, 100);
        this.material = new THREE.ShaderMaterial({
            depthWrite: false,
            blending: THREE.AdditiveBlending,
            vertexColors: true,
            uniforms:
            {
                uTime: { value: this.time },
                uSize: { value: 30 * this.sizes.pixelRatio }
            },    
            vertexShader: particlesVertexShader,
            fragmentShader: particlesFragmentShader
        }) 

        this.points = new THREE.Points(this.geometry, this.material);
        this.scene.add(this.points);

    }
}