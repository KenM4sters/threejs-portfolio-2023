import { EventEmitter } from "./EventEmitter";

export default class Time extends EventEmitter {

    start: number;
    current: number;
    elapsedTime: number;
    delta: number;
    
    constructor() {
        super();

        // Setup
        this.start = Date.now();
        this.current = this.start
        this.elapsedTime = 0;
        this.delta = 16;

        window.requestAnimationFrame(() => {

            this.tick();
        })

    }

    tick() {

        const currentTime = Date.now();
        this.delta = currentTime - this.current;
        this.current = currentTime;
        this.elapsedTime = this.current - this.start;
        

        window.requestAnimationFrame(() => {
            this.tick();
        });
        
    }
}