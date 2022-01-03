import { ButtonCounter } from '../src/button-counter';
import {fixture, html, expect} from '@open-wc/testing';
import sinon from 'sinon'


describe('ButtonCounter', () => {

    it('button should be enabled at start', async () => {
        const el = await fixture(html`<button-counter></button-counter>`);
        
        expect(el.Buttonrunning).to.be.equal(undefined);
        expect(el.counterRunning).to.be.equal(undefined);
    });

    it('expect button clicked  requestAnimationFrame is called', async () => {
        const el = await fixture(html`<button-counter></button-counter>`);
        const _requestAnimationFrameSpy = sinon.spy(window, 'requestAnimationFrame');
        const button = el.shadowRoot.querySelector('button');

        button.click();

        expect(_requestAnimationFrameSpy).to.have.called;
        expect(el.counterRunning).to.be.equal(true);
        expect(el.Buttonrunning).to.be.equal(true);   
        
    });

    it('expect after countDown is finished button and counter will be enabled with default text', async () => {
        const el = await fixture(html`<button-counter></button-counter>`);
              
        el.startFromInit();
        
        expect(el.counterRunning).to.be.equal(false);
        expect(el.Buttonrunning).to.be.equal(false);
        expect(el.count).to.be.equal(500);
            
    });
    
});