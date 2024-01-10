import Experience from '../Experience.js'
import Resources from '../Utils/Resources.js'
import Environment from './Environment.js'
import * as THREE from "three"
import Particles from './Particles.js'


export default class World
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.particles = new Particles()

        // const testMesh = new THREE.Mesh(
        //     new THREE.BoxGeometry(1, 1, 1),
        //     new THREE.MeshBasicMaterial({wireframe: true})
        // )


        // this.scene.add(testMesh)

        this.resources.on('ready', () => {
            console.log('resources are ready')
            // Setup
            this.environment = new Environment()
        })

        

    }

}