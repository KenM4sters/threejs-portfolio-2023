import Camera from "./Camera";
import Experience from "./Experience";
import Sizes from "./Utils/Sizes";
import * as THREE from "three"

export default class Renderer {

    experience: Experience;
    canvas: HTMLElement;
    sizes: Sizes;
    scene: THREE.Scene;
    camera: Camera;
    instance: THREE.WebGLRenderer

    constructor() {
        this.experience = new Experience();
        this.canvas = this.experience.canvas;
        this.sizes = this.experience.sizes;
        this.scene = this.experience.scene;
        this.camera = this.experience.camera;

        this.setInstance();
    }

    setInstance() {
        this.instance = new THREE.WebGLRenderer({
            canvas: this.canvas,
            antialias: true
        });

        this.instance.setSize(this.sizes.width, this.sizes.height);
        this.instance.setPixelRatio(this.sizes.pixelRatio);
        this.instance.setClearColor('#ff0000', 1.0);

        console.log(this.instance);
        
        
    }

    resize() {
        this.instance.setSize(this.sizes.width, this.sizes.height);
        this.instance.setPixelRatio(this.sizes.pixelRatio);
    }

    update() {
        this.instance.render(this.scene, this.camera.instance)
    }
}