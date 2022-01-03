import { LitElement, html, css } from 'lit-element';

export class ButtonCounter extends LitElement {

    static get styles() {
        return css`
            :host {
                padding: 5px 10px;
                font-family: sans-serif;
                text-align: center;
            }

            h1 {
                text-align: center;
            }

            .container {
                border: 1px solid lightgrey;
                border-radius: 10px;
                width: 500px;
                height:20px;
                text-align: center;
                margin: auto;              
                overflow: hidden;
            }

            .inside {
                border: none;
                background: lightgrey;
                height:22px;
                margin-top:-1px;
                width:0;
                border-radius: 10px;
            }

            button {
                background: transparent;
                position: relative;
                top:-29px;
                border: none;
                cursor: pointer;
                width: 100%;
                height:40px;
                opacity: 1;
                transition: all 1.5s ease;
            }
           
            .runButton {
                margin-left:-500px;
                opacity: 0;
                transition: all 1.5s ease;
            }

            .counter {
                position: relative;
                top:-59px;
                width: 100%;
                opacity: 0;
                right:-500px;
                transition: all 1.5s ease;
            }

            .runCounter {
                
                right: 0;
                opacity: 1;
                transition: all 1.5s ease;
            }

        `;
    }

    static get properties() {
        return {
            buttonText: { type: String },
            count: { type: Number},
            Buttonrunning: { type: Boolean},
            counterRunning: { type: Boolean}
        };
    }

    constructor() {
        super();
        this.buttonText = 'Click here to start count down'
        this.count = 500;
    }

    render() {
        return html`
        <h1>Button counter with requestAnimationFrame</h1>
        <div id="content" class="container">
            <div id="progressBarr" class="inside"></div> 
            <button class="${this.Buttonrunning ? 'runButton' : ''} " @click = "${this.countDown}">${this.buttonText}</button>  
            <div id="counting" class="counter ${this.counterRunning ? 'runCounter' : ''}">${this.count}</div>
        </div>
        `;
    }

    countDown() {

        let getRequestAnimationFrame = () => {  
            return window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||   
            window.mozRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            function(/* function */ callback){
                    window.setTimeout(callback, 1000 / 60);
                };           
        };

        let getCountDown = getRequestAnimationFrame(); 
        let progress = this.shadowRoot.getElementById("progressBarr")
        let animProgressBar = progress.clientWidth;
        this.Buttonrunning = true;
        this.counterRunning = true;
        let letCount = () => {  
            this.count--;                
            animProgressBar++;
            let tWidth = animProgressBar + 'px';           
            progress.style.width = tWidth;    
            if(this.count > 0) {                             
                getCountDown(letCount);
            } else {
                this.startFromInit();
            }                    
        }
        
        
        getCountDown(letCount);
    }

    startFromInit() {
        this.shadowRoot.getElementById("progressBarr").style.width = "0";
        this.count = 500;
        this.Buttonrunning = false;
        this.counterRunning = false;
    }

    
    
}
customElements.define('button-counter', ButtonCounter);
