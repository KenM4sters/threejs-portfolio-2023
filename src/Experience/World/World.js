import Experience from '../Experience.js'
import Environment from './Environment.js'
import Page from './Page.js'
import Particles from './Particles.js'
import Simulation from './Simulation.js'


export default class World
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        // this.simulation = new Simulation()
        
        this.resources.on('ready', () => {
            console.log('resources are ready')
            // Setup
            this.page = new Page()
            this.particles = new Particles()
            this.environment = new Environment()
        })

    }

    update() {
        this.page.update()
        this.particles.update()
    }

}