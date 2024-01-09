import Experience from "../Experience";
import * as THREE from "three"

export default class World {

    experience: Experience;
    scene: THREE.Scene;

    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;

        const testMesh = new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.MeshBasicMaterial({wireframe: true})
        )

        this.scene.add(testMesh);

        console.log(this.experience.canvas);
        
    }
}