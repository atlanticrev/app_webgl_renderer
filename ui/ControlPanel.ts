import WebGLRenderer from "../WebGLRenderer";

class ControlPanel extends HTMLElement {
    renderer: WebGLRenderer;

    constructor(renderer: WebGLRenderer) {
        super();
        this.renderer = renderer;
        this.setTemplate();
        this.setStyles();
    }

    get sceneActiveEl () {
        return this.renderer.activeElement;
    }

    connectedCallback () {
        // this.appendChild(new Range(this.sceneActiveEl, {min: 0, max: 200, step: 1}));

        const rangeTranslationX = this.querySelector('.control-panel__range-translation-x') as HTMLElement;
        const rangeTranslationXInput = rangeTranslationX.querySelector('.control-panel__range-input') as HTMLInputElement;
        const rangeTranslationXDisplay = rangeTranslationX.querySelector('.control-panel__range-display') as HTMLElement;
        rangeTranslationXInput.addEventListener('input', (e) => {
            const target = e.target as HTMLInputElement;
            rangeTranslationXDisplay.textContent = target.value;
            this.dispatchEvent(new CustomEvent('EVENT_POSITION_CHANGE', {detail: {x: target.value}}));
        });

        const rangeTranslationY = this.querySelector('.control-panel__range-translation-y') as HTMLElement;
        const rangeTranslationYInput = rangeTranslationY.querySelector('.control-panel__range-input') as HTMLInputElement;
        const rangeTranslationYDisplay = rangeTranslationY.querySelector('.control-panel__range-display') as HTMLElement;
        rangeTranslationYInput.addEventListener('input', (e) => {
            const target = e.target as HTMLInputElement;
            rangeTranslationYDisplay.textContent = target.value;
            this.dispatchEvent(new CustomEvent('EVENT_POSITION_CHANGE', {detail: {y: target.value}}));
        });

        const rangeRotation = this.querySelector('.control-panel__range-rotation') as HTMLElement;
        const rangeRotationInput = rangeRotation.querySelector('.control-panel__range-input') as HTMLInputElement;
        const rangeRotationDisplay = rangeRotation.querySelector('.control-panel__range-display') as HTMLElement;
        rangeRotationInput.addEventListener('input', (e) => {
            const target = e.target as HTMLInputElement;
            rangeRotationDisplay.textContent = `${target.value}°`;
            this.dispatchEvent(new CustomEvent('EVENT_ROTATION_CHANGE', {detail: {angle: target.value}}));
        });

        const rangeScale = this.querySelector('.control-panel__range-scale') as HTMLElement;
        const rangeScaleInput = rangeScale.querySelector('.control-panel__range-input') as HTMLInputElement;
        const rangeScaleDisplay = rangeScale.querySelector('.control-panel__range-display') as HTMLElement;
        rangeScaleInput.addEventListener('input', (e) => {
            const target = e.target as HTMLInputElement;
            rangeScaleDisplay.textContent = target.value;
            this.dispatchEvent(new CustomEvent('EVENT_SCALE_CHANGE', {detail: {scalar: target.value}}));
        });
    }

    setTemplate () {
        this.appendChild(this.importTemplate(this.getTemplate()));
    }

    getTemplate () {
        const template = document.createElement('template');
        template.innerHTML = `
            <div class="control-panel">
                <div class="control-panel__range control-panel__range-translation-x">
                    <input class="control-panel__range-input" type="range" min="0" max="2000" value="${this.sceneActiveEl.properties.translation[0]}"/>
                    <span class="control-panel__range-display">${this.sceneActiveEl.properties.translation[0]}</span>
                </div>
                <div class="control-panel__range control-panel__range-translation-y">
                    <input class="control-panel__range-input" type="range" min="0" max="2000" value="${this.sceneActiveEl.properties.translation[1]}"/>
                    <span class="control-panel__range-display">${this.sceneActiveEl.properties.translation[1]}</span>
                </div>
                <div class="control-panel__range control-panel__range-rotation">
                    <input class="control-panel__range-input" type="range" min="0" max="360" value="${this.sceneActiveEl.properties.rotation}"/>
                    <span class="control-panel__range-display">${this.sceneActiveEl.properties.rotation}°</span>
                </div>
                <div class="control-panel__range control-panel__range-scale">
                    <input class="control-panel__range-input" type="range" min="0.1" max="10" step="0.1" value="${this.sceneActiveEl.properties.scale[0]}"/>
                    <span class="control-panel__range-display">${this.sceneActiveEl.properties.scale[0]}</span>
                </div>
            </div>
        `;
        return template;
    }

    importTemplate (template: HTMLTemplateElement) {
        return document.importNode(template.content, true);
    }

    setStyles () {
        const styles = document.createElement('style');
        styles.textContent = `
            x-control-panel {
                display: block;
                position: absolute;
                top: 10px;
                right: 10px;
                font-family: monospace;
                font-size: 14px;
                font-weight: bold;
            }
            
            x-control-panel .control-panel {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                width: 220px;
                padding: 20px;
            }
            
            x-control-panel .control-panel__range {
                display: flex;
                flex-flow: row nowrap;
                justify-content: space-between;
                align-items: center;
                width: 100%;
                height: 30px;
            }
            
            x-control-panel .control-panel__range-display {
                margin-left: 10px;
            }
        `;
        document.head.appendChild(styles);
    }
}

customElements.define('x-control-panel', ControlPanel);

export default ControlPanel;
