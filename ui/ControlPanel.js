class ControlPanel extends HTMLElement {
    constructor(renderer) {
        super();
        this.renderer = renderer;
        this.setTemplate();
        this.setStyles();
    }
    get sceneActiveEl() {
        return this.renderer.activeElement;
    }
    connectedCallback() {
        // this.appendChild(new Range(this.sceneActiveEl, {min: 0, max: 200, step: 1}));
        const rangeTranslationX = this.querySelector('.control-panel__range-translation-x');
        const rangeTranslationXInput = rangeTranslationX.querySelector('.control-panel__range-input');
        const rangeTranslationXDisplay = rangeTranslationX.querySelector('.control-panel__range-value');
        rangeTranslationXInput.addEventListener('input', (e) => {
            const target = e.target;
            rangeTranslationXDisplay.textContent = `${target.value}px`;
            this.dispatchEvent(new CustomEvent('EVENT_POSITION_CHANGE', { detail: { x: target.value } }));
        });
        const rangeTranslationY = this.querySelector('.control-panel__range-translation-y');
        const rangeTranslationYInput = rangeTranslationY.querySelector('.control-panel__range-input');
        const rangeTranslationYDisplay = rangeTranslationY.querySelector('.control-panel__range-value');
        rangeTranslationYInput.addEventListener('input', (e) => {
            const target = e.target;
            rangeTranslationYDisplay.textContent = `${target.value}px`;
            this.dispatchEvent(new CustomEvent('EVENT_POSITION_CHANGE', { detail: { y: target.value } }));
        });
        const rangeTranslationZ = this.querySelector('.control-panel__range-translation-z');
        const rangeTranslationZInput = rangeTranslationZ.querySelector('.control-panel__range-input');
        const rangeTranslationZDisplay = rangeTranslationZ.querySelector('.control-panel__range-value');
        rangeTranslationZInput.addEventListener('input', (e) => {
            const target = e.target;
            rangeTranslationZDisplay.textContent = `${target.value}px`;
            this.dispatchEvent(new CustomEvent('EVENT_POSITION_CHANGE', { detail: { z: target.value } }));
        });
        const rangeRotationX = this.querySelector('.control-panel__range-rotation-x');
        const rangeRotationXInput = rangeRotationX.querySelector('.control-panel__range-input');
        const rangeRotationXDisplay = rangeRotationX.querySelector('.control-panel__range-value');
        rangeRotationXInput.addEventListener('input', (e) => {
            const target = e.target;
            rangeRotationXDisplay.textContent = `${target.value}°`;
            this.dispatchEvent(new CustomEvent('EVENT_ROTATION_CHANGE', { detail: { angleX: target.value } }));
        });
        const rangeRotationY = this.querySelector('.control-panel__range-rotation-y');
        const rangeRotationYInput = rangeRotationY.querySelector('.control-panel__range-input');
        const rangeRotationYDisplay = rangeRotationY.querySelector('.control-panel__range-value');
        rangeRotationYInput.addEventListener('input', (e) => {
            const target = e.target;
            rangeRotationYDisplay.textContent = `${target.value}°`;
            this.dispatchEvent(new CustomEvent('EVENT_ROTATION_CHANGE', { detail: { angleY: target.value } }));
        });
        const rangeRotationZ = this.querySelector('.control-panel__range-rotation-z');
        const rangeRotationZInput = rangeRotationZ.querySelector('.control-panel__range-input');
        const rangeRotationZDisplay = rangeRotationZ.querySelector('.control-panel__range-value');
        rangeRotationZInput.addEventListener('input', (e) => {
            const target = e.target;
            rangeRotationZDisplay.textContent = `${target.value}°`;
            this.dispatchEvent(new CustomEvent('EVENT_ROTATION_CHANGE', { detail: { angleZ: target.value } }));
        });
        const rangeScale = this.querySelector('.control-panel__range-scale');
        const rangeScaleInput = rangeScale.querySelector('.control-panel__range-input');
        const rangeScaleDisplay = rangeScale.querySelector('.control-panel__range-value');
        rangeScaleInput.addEventListener('input', (e) => {
            const target = e.target;
            rangeScaleDisplay.textContent = target.value;
            this.dispatchEvent(new CustomEvent('EVENT_SCALE_CHANGE', { detail: { scalar: target.value } }));
        });
    }
    setTemplate() {
        this.appendChild(this.importTemplate(this.getTemplate()));
    }
    getTemplate() {
        const template = document.createElement('template');
        template.innerHTML = `
            <div class="control-panel">
                <h3>Active element: ${this.sceneActiveEl.constructor.name}</h3>
                <div class="control-panel__range control-panel__range-translation-x">
                    <span class="control-panel__range-name">position <b>x</b></span>
                    <input class="control-panel__range-input" type="range" min="-2000" max="2000" value="${this.sceneActiveEl.properties.translation[0]}"/>
                    <span class="control-panel__range-value">${this.sceneActiveEl.properties.translation[0]}px</span>
                </div>
                <div class="control-panel__range control-panel__range-translation-y">
                    <span class="control-panel__range-name">position <b>y</b></span>
                    <input class="control-panel__range-input" type="range" min="-2000" max="2000" value="${this.sceneActiveEl.properties.translation[1]}"/>
                    <span class="control-panel__range-value">${this.sceneActiveEl.properties.translation[1]}px</span>
                </div>
                <div class="control-panel__range control-panel__range-translation-z">
                    <span class="control-panel__range-name">position <b>z</b></span>
                    <input class="control-panel__range-input" type="range" min="-2000" max="2000" value="${this.sceneActiveEl.properties.translation[2]}"/>
                    <span class="control-panel__range-value">${this.sceneActiveEl.properties.translation[2]}px</span>
                </div>
                <div class="control-panel__range control-panel__range-rotation-x disabled">
                    <span class="control-panel__range-name">rotation <b>x</b></span>
                    <input class="control-panel__range-input" type="range" min="0" max="360" value="${this.sceneActiveEl.properties.rotation[0]}"/>
                    <span class="control-panel__range-value">${this.sceneActiveEl.properties.rotation[0]}°</span>
                </div>
                <div class="control-panel__range control-panel__range-rotation-y disabled">
                    <span class="control-panel__range-name">rotation <b>y</b></span>
                    <input class="control-panel__range-input" type="range" min="0" max="360" value="${this.sceneActiveEl.properties.rotation[1]}"/>
                    <span class="control-panel__range-value">${this.sceneActiveEl.properties.rotation[1]}°</span>
                </div>
                <div class="control-panel__range control-panel__range-rotation-z disabled">
                    <span class="control-panel__range-name">rotation <b>z</b></span>
                    <input class="control-panel__range-input" type="range" min="0" max="360" value="${this.sceneActiveEl.properties.rotation[2]}"/>
                    <span class="control-panel__range-value">${this.sceneActiveEl.properties.rotation[2]}°</span>
                </div>
                <div class="control-panel__range control-panel__range-scale">
                    <span class="control-panel__range-name">scale <b>xyz</b></span>
                    <input class="control-panel__range-input" type="range" min="0.1" max="10" step="0.1" value="${this.sceneActiveEl.properties.scale[0]}"/>
                    <span class="control-panel__range-value">${this.sceneActiveEl.properties.scale[0]}</span>
                </div>
            </div>
        `;
        return template;
    }
    importTemplate(template) {
        return document.importNode(template.content, true);
    }
    setStyles() {
        const styles = document.createElement('style');
        styles.textContent = `
            x-control-panel {
                display: block;
                position: absolute;
                top: 10px;
                right: 10px;
                font-family: monospace;
                font-size: 16px;
            }
            
            x-control-panel .control-panel {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                padding: 20px;
            }
            
            x-control-panel .control-panel__range {
                display: flex;
                flex-direction: column;
                justify-content: flex-start;
                align-items: flex-end;
                width: 100%;
            }
            
            x-control-panel .control-panel__range:not(:first-child) {
                margin-top: 40px;
            }
            
            x-control-panel .control-panel__range > *:not(:first-child) {
                margin-top: 5px;
            }
        `;
        document.head.appendChild(styles);
    }
}
customElements.define('x-control-panel', ControlPanel);
export default ControlPanel;
//# sourceMappingURL=ControlPanel.js.map