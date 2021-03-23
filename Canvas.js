/**
 * @typedef {Object} CanvasOptions
 * @property {(string|HTMLCanvasElement)} el
 * @property {string} className
 * @property {number} width
 * @property {number} height
 */

export default class Canvas {
    /**
     * @returns {CanvasOptions}
     */
    static get defaultOptions () {
        return {
            el: document.createElement('canvas'),
            className: 'canvas',
            width: window.innerWidth,
            height: window.innerHeight
        };
    }

    /**
     * @constructor
     * @param {CanvasOptions} options
     */
    constructor (options= Canvas.defaultOptions) {
        this._canvas = null;
        if (options.el instanceof HTMLCanvasElement) {
            this._canvas = options.el;
        } else if (typeof options.el === 'string') {
            this._canvas = document.querySelector(/** @type {string} */options.el);
            if (!this._canvas) throw new Error('Canvas element not found');
        } else {
            throw new Error('First argument must be type of {HTMLCanvasElement} or {string}');
        }
        this._canvas.classList.add(options.className);
        this.width = options.width;
        this.height = options.height;
        document.body.appendChild(this._canvas);
    }

    /**
     * @returns void
     */
    resize () {
        this._canvas.width = this.width;
        this._canvas.height = this.height;
        this._canvas.style.setProperty('--width', `${this.width}px`);
        this._canvas.style.setProperty('--height', `${this.height}px`);
    }

    /**
     * @param {string} ctxName
     * @returns {CanvasRenderingContext2D | WebGLRenderingContext}
     */
    getCtx (ctxName = '2d') {
        return this._canvas.getContext(ctxName);
    }
}
