class Canvas {
    constructor (el) {
        this._canvas = null;
        if (el instanceof HTMLCanvasElement) {
            this._canvas = el;
        } else if (typeof el === 'string') {
            this._canvas = document.querySelector(el);
        } else {
            throw new Error('Canvas constructor needs HTMLCanvasElement or string');
        }
    }
}
