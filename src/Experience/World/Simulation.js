import Experience from "../Experience";
import * as THREE from "three"

export default class Simulation {
    constructor() {

        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.simParticipants = []

        // Creating the Meshes
        this.cube = new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.MeshBasicMaterial({wireframe: true})
        )

        this.sphere = new THREE.Mesh(
            new THREE.SphereGeometry(2, 10, 10),
            new THREE.MeshBasicMaterial({wireframe: true})
        )
        
        // Modifying positions as needed
        this.cube.position.x = 10


        // Add to the scene
        this.scene.add(this.cube)
        this.scene.add(this.sphere)

    }

    runSimulation() {
    }
}   
