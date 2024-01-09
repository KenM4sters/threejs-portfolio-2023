import Sizes from "./Utils/Sizes";
import Time from "./Utils/Time";
import * as THREE from "three";
import Camera from "./Camera";
import Renderer from "./Renderer";
import World from "./World/World";

let instance: any = null;

export default class Experience {

    canvas: HTMLElement;
    sizes: Sizes;
    time: Time; 
    scene: THREE.Scene;
    camera: Camera;
    renderer: Renderer;
    world: World;

    constructor(canvas?: HTMLElement) {

        if(instance) {
            return instance;
        }
        
        instance = this;

        // Options

        this.canvas = canvas;
        
        // Setup
        this.sizes = new Sizes();
        this.time = new Time();
        this.scene = new THREE.Scene();
        this.camera = new Camera();
        this.renderer = new Renderer();
        this.world = new World();

        // Sizes - resize event
        this.sizes.on('resize', () => {

            this.resize();

        })

        // Time - updating time
        this.time.on("tick", () => {
            this.update();
        })

    }
    
    resize() {
        this.camera.resize();
        this.renderer.resize();
        
    }

    update() {

        this.camera.update();
        this.renderer.update();
        
    }
}