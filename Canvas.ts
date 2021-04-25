type CanvasOptions = {
    el: HTMLCanvasElement | string;
    className: string;
    width : number;
    height: number;
}

export default class Canvas {
    private readonly _canvas: HTMLCanvasElement | null;
    private readonly _width: number;
    private readonly _height: number;
    get width () {
        return this._width;
    }
    get height () {
        return this._height;
    }

    static get defaultOptions () {
        return {
            el: document.createElement('canvas'),
            className: 'canvas',
            width: window.innerWidth,
            height: window.innerHeight
        };
    }

    constructor (options: CanvasOptions = Canvas.defaultOptions) {
        if (options.el instanceof HTMLCanvasElement) {
            this._canvas = options.el;
        } else {
            this._canvas = document.querySelector(options.el);
            if (!this._canvas)
                throw new Error('Canvas element not found!');
        }
        this._canvas.classList.add(options.className);
        this._width = options.width;
        this._height = options.height;
        document.body.appendChild(this._canvas);
    }

    resize () {
        if (this._canvas) {
            this._canvas.width = this.width;
            this._canvas.height = this.height;
            this._canvas.style.setProperty('--width', `${this.width}px`);
            this._canvas.style.setProperty('--height', `${this.height}px`);
        }
    }

    getCtx (ctxName = '2d') {
        return this._canvas
            ? this._canvas.getContext(ctxName)
            : null;
    }
}
