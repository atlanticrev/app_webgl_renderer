export function degToRad (angDeg: number) {
    return angDeg / 180 * Math.PI;
}

export function radToDeg (angRad: number) {
    return angRad / Math.PI * 180;
}

export class Vec2 {
    private readonly _x: number;
    private readonly _y: number;

    static fromArray (arr: Array<number>) {
        return new Vec2(arr[0], arr[1]);
    }

    constructor (x: number, y: number) {
        this._x = x;
        this._y = y;
    }

    get x () {
        return this._x;
    }

    get y () {
        return this._y;
    }

    add (vec: Vec2) {
        return new Vec2(this.x + vec.x, this.y + vec.y);
    }

    sub (vec: Vec2) {
        return new Vec2(this.x - vec.x, this.y - vec.y);
    }

    dot (vec: Vec2) {
        return this.x * vec.x + this.y * vec.y;
    }

    scale (scalar: number) {
        return new Vec2(this.x * scalar, this.y * scalar);
    }

    neg () {
        return this.scale(-1);
    }

    len () {
        return Math.hypot(this.x, this.y);
    }

    dist (vec: Vec2) {
        return Math.hypot(vec.x - this.x, vec.y - this.y);
    }

    normalize () {
        return new Vec2(this.x, this.y).scale(1 / this.len()) ;
    }

    angle (vec: Vec2) {
        // @todo Math.cos(0.9999999999999999) error
        // return this.dot(vec) / (this.len() * vec.len());
        // return radToDeg(Math.acos(this.dot(vec) / (this.len() * vec.len())));
        return radToDeg(Math.acos(this.normalize().dot(vec.normalize())));
    }

    multiplyMatrix (mat: Mat2) {
        return new Vec2(
            this.x * mat.e11 + this.y * mat.e21,
            this.x * mat.e12 + this.y * mat.e22,
        );
    }

    copy () {
        return new Vec2(this.x, this.y);
    }
}

export class Mat2 {
    public readonly e11: number;
    public readonly e12: number;
    public readonly e21: number;
    public readonly e22: number;

    static fromArray (arr: Array<number>) {
        return new Mat2(arr[0], arr[1], arr[2], arr[3]);
    }

    static getRotMat (angDeg: number) {
        const angRad = degToRad(angDeg);
        return new Mat2(
            Math.cos(angRad), Math.sin(angRad),
            -Math.sin(angRad), Math.cos(angRad)
        );
    }

    static getIdentMat () {
        return new Mat2(
            1, 0,
            0, 1
        );
    }

    constructor (e1: number, e2: number, e3: number, e4: number) {
        this.e11 = e1;
        this.e12 = e2;
        this.e21 = e3;
        this.e22 = e4;
    }

    multiplyMatrix (mat: Mat2) {
        return new Mat2(
            this.e11 * mat.e11 + this.e12 * mat.e21,
            this.e11 * mat.e12 + this.e12 * mat.e22,
            this.e21 * mat.e11 + this.e22 * mat.e21,
            this.e21 * mat.e12 + this.e22 * mat.e22,
        );
    }

    det () {
        return this.e11 * this.e22 - this.e12 * this.e21;
    }

    // @todo implement
    inverse () {
        return Mat2.getIdentMat();
    }
}

export class Vec4 {
    private readonly _x: number;
    private readonly _y: number;
    private readonly _z: number;
    private readonly _w: number;

    static fromArray (arr: Array<number>) {
        return new Vec4(arr[0], arr[1], arr[2]);
    }

    constructor (x: number, y: number, z: number, w: number = 1) {
        this._x = x;
        this._y = y;
        this._z = z;
        this._w = w;
    }

    get x () {
        return this._x;
    }

    get y () {
        return this._y;
    }

    get z () {
        return this._z;
    }

    get w () {
        return this._w;
    }

    add (vec: Vec4) {
        return new Vec4(this.x + vec.x, this.y + vec.y, this.z + vec.z);
    }

    sub (vec: Vec4) {
        return new Vec4(this.x - vec.x, this.y - vec.y, this.z - vec.z);
    }

    dot (vec: Vec4) {
        return this.x * vec.x + this.y * vec.y + this.z * vec.z;
    }

    scale (scalar: number) {
        return new Vec4(this.x * scalar, this.y * scalar, this.z * scalar);
    }

    neg () {
        return this.scale(-1);
    }

    len () {
        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
    }

    dist (vec: Vec4) {
        return Math.sqrt((vec.x - this.x) * (vec.x - this.x) + (vec.y - this.y) * (vec.y - this.y) + (vec.z - this.z) * (vec.z - this.z));
    }

    normalize () {
        return new Vec4(this.x, this.y, this.z).scale(1 / this.len()) ;
    }

    angle (vec: Vec4) {
        // @todo Precision errors (cos/sin)
        // return this.dot(vec) / (this.len() * vec.len());
        // return radToDeg(Math.acos(this.dot(vec) / (this.len() * vec.len())));
        return radToDeg(Math.acos(this.normalize().dot(vec.normalize())));
    }

    // @todo Precision errors (cos/sin)
    multiplyMatrix (m: Mat4) {
        return new Vec4(
            this.x * m.e11 + this.y * m.e21 + this.z * m.e31 + this.w * m.e41,
            this.x * m.e12 + this.y * m.e22 + this.z * m.e32 + this.w * m.e42,
            this.x * m.e13 + this.y * m.e23 + this.z * m.e33 + this.w * m.e43,
            this.x * m.e14 + this.y * m.e24 + this.z * m.e34 + this.w * m.e44,
        );
    }

    copy () {
        return new Vec4(this.x, this.y, this.z);
    }
}

export class Mat4 {
    public readonly e11: number;
    public readonly e12: number;
    public readonly e13: number;
    public readonly e14: number;
    public readonly e21: number;
    public readonly e22: number;
    public readonly e23: number;
    public readonly e24: number;
    public readonly e31: number;
    public readonly e32: number;
    public readonly e33: number;
    public readonly e34: number;
    public readonly e41: number;
    public readonly e42: number;
    public readonly e43: number;
    public readonly e44: number;

    static fromArray (arr: Array<number>) {
        return new Mat4(
            arr[0], arr[1], arr[2], arr[3],
            arr[4], arr[5], arr[6], arr[7],
            arr[8], arr[9], arr[10], arr[11],
            arr[12], arr[13], arr[14], arr[15]
        );
    }

    static getScaleMat (sx: number, sy: number, sz: number) {
        return new Mat4(
            sx, 0, 0, 0,
            0, sy, 0, 0,
            0, 0, sz, 0,
            0, 0, 0, 1
        );
    }

    static getRotMatX (angDeg: number) {
        const angRad = degToRad(angDeg);
        return new Mat4(
            1, 0, 0, 0,
            0, Math.cos(angRad), Math.sin(angRad), 0,
            0, -Math.sin(angRad), Math.cos(angRad), 0,
            0, 0, 0, 1
        );
    }

    static getRotMatY (angDeg: number) {
        const angRad = degToRad(angDeg);
        return new Mat4(
            Math.cos(angRad), 0, -Math.sin(angRad), 0,
            0, 1, 0, 0,
            Math.sin(angRad), 0, Math.cos(angRad), 0,
            0, 0, 0, 1
        );
    }

    static getRotMatZ (angDeg: number) {
        const angRad = degToRad(angDeg);
        return new Mat4(
            Math.cos(angRad), Math.sin(angRad), 0, 0,
            -Math.sin(angRad), Math.cos(angRad), 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1
        );
    }

    static getTransMat (dx: number, dy: number, dz: number) {
        return new Mat4(
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            dx, dy, dz, 1
        );
    }

    static getIdentMat () {
        return new Mat4(
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1
        );
    }

    constructor (
        e11: number, e12: number, e13: number, e14: number,
        e21: number, e22: number, e23: number, e24: number,
        e31: number, e32: number, e33: number, e34: number,
        e41: number, e42: number, e43: number, e44: number
    ) {
        this.e11 = e11;
        this.e12 = e12;
        this.e13 = e13;
        this.e14 = e14;
        this.e21 = e21;
        this.e22 = e22;
        this.e23 = e23;
        this.e24 = e24;
        this.e31 = e31;
        this.e32 = e32;
        this.e33 = e33;
        this.e34 = e34;
        this.e41 = e41;
        this.e42 = e42;
        this.e43 = e43;
        this.e44 = e44;
    }

    // Multiply on mat from right
    multiplyMatrix (mat: Mat4) {
        return new Mat4(
            this.e11 * mat.e11 + this.e12 * mat.e21 + this.e13 * mat.e31 + this.e14 * mat.e41,
            this.e11 * mat.e12 + this.e12 * mat.e22 + this.e13 * mat.e32 + this.e14 * mat.e42,
            this.e11 * mat.e13 + this.e12 * mat.e23 + this.e13 * mat.e33 + this.e14 * mat.e43,
            this.e11 * mat.e14 + this.e12 * mat.e24 + this.e13 * mat.e34 + this.e14 * mat.e44,

            this.e21 * mat.e11 + this.e22 * mat.e21 + this.e23 * mat.e31 + this.e24 * mat.e41,
            this.e21 * mat.e12 + this.e22 * mat.e22 + this.e23 * mat.e32 + this.e24 * mat.e42,
            this.e21 * mat.e13 + this.e22 * mat.e23 + this.e23 * mat.e33 + this.e24 * mat.e43,
            this.e21 * mat.e14 + this.e22 * mat.e24 + this.e23 * mat.e34 + this.e24 * mat.e44,

            this.e31 * mat.e11 + this.e32 * mat.e21 + this.e33 * mat.e31 + this.e34 * mat.e41,
            this.e31 * mat.e12 + this.e32 * mat.e22 + this.e33 * mat.e32 + this.e34 * mat.e42,
            this.e31 * mat.e13 + this.e32 * mat.e23 + this.e33 * mat.e33 + this.e34 * mat.e43,
            this.e31 * mat.e14 + this.e32 * mat.e24 + this.e33 * mat.e34 + this.e34 * mat.e44,

            this.e41 * mat.e11 + this.e42 * mat.e21 + this.e43 * mat.e31 + this.e44 * mat.e41,
            this.e41 * mat.e12 + this.e42 * mat.e22 + this.e43 * mat.e32 + this.e44 * mat.e42,
            this.e41 * mat.e13 + this.e42 * mat.e23 + this.e43 * mat.e33 + this.e44 * mat.e43,
            this.e41 * mat.e14 + this.e42 * mat.e24 + this.e43 * mat.e34 + this.e44 * mat.e44,
        );
    }

    // Multiply on mat from left
    premultiplyMatrix (mat: Mat4) {
        return new Mat4(
            mat.e11 * this.e11 + mat.e12 * this.e21 + mat.e13 * this.e31 + mat.e14 * this.e41,
            mat.e11 * this.e12 + mat.e12 * this.e22 + mat.e13 * this.e32 + mat.e14 * this.e42,
            mat.e11 * this.e13 + mat.e12 * this.e23 + mat.e13 * this.e33 + mat.e14 * this.e43,
            mat.e11 * this.e14 + mat.e12 * this.e24 + mat.e13 * this.e34 + mat.e14 * this.e44,

            mat.e21 * this.e11 + mat.e22 * this.e21 + mat.e23 * this.e31 + mat.e24 * this.e41,
            mat.e21 * this.e12 + mat.e22 * this.e22 + mat.e23 * this.e32 + mat.e24 * this.e42,
            mat.e21 * this.e13 + mat.e22 * this.e23 + mat.e23 * this.e33 + mat.e24 * this.e43,
            mat.e21 * this.e14 + mat.e22 * this.e24 + mat.e23 * this.e34 + mat.e24 * this.e44,

            mat.e31 * this.e11 + mat.e32 * this.e21 + mat.e33 * this.e31 + mat.e34 * this.e41,
            mat.e31 * this.e12 + mat.e32 * this.e22 + mat.e33 * this.e32 + mat.e34 * this.e42,
            mat.e31 * this.e13 + mat.e32 * this.e23 + mat.e33 * this.e33 + mat.e34 * this.e43,
            mat.e31 * this.e14 + mat.e32 * this.e24 + mat.e33 * this.e34 + mat.e34 * this.e44,

            mat.e41 * this.e11 + mat.e42 * this.e21 + mat.e43 * this.e31 + mat.e44 * this.e41,
            mat.e41 * this.e12 + mat.e42 * this.e22 + mat.e43 * this.e32 + mat.e44 * this.e42,
            mat.e41 * this.e13 + mat.e42 * this.e23 + mat.e43 * this.e33 + mat.e44 * this.e43,
            mat.e41 * this.e14 + mat.e42 * this.e24 + mat.e43 * this.e34 + mat.e44 * this.e44,
        );
    }

    toTypedArray () {
        return new Float32Array([
            this.e11, this.e12, this.e13, this.e14,
            this.e21, this.e22, this.e23, this.e24,
            this.e31, this.e32, this.e33, this.e34,
            this.e41, this.e42, this.e43, this.e44
        ]);
    }

    det () {}

    inverse () {}
}

// Vec2 Tests

// const v1 = new Vec2(10, 10);
// const v2 = new Vec2(5, 5);
// console.group();
// console.log('Vectors: ', '[v1]:', v1, '[v2]:', v2);
// console.group();
// console.log('Negated: ', '[v1]:', v1.neg(), '[v2]:', v2.neg());
// console.log('Sum:', v1.add(v2));
// console.log('Normalized [v2]:', v2.normalize());
// console.log('Rotated (90°) [v1]:', v1.multiplyMatrix(Mat2.getRotMat(90)));
// console.log('Angle between [v1] and [v2]:', v1.angle(v2));
// console.log('Matrix multiplication on identity matrix between:', new Mat2(1, 2, 3, 4).multiplyMatrix(Mat2.getIdentMat()));
// console.groupEnd();
// console.groupEnd();

// Vec4 Tests

// const v1 = new Vec4(1, 0, 0);
// const v2 = new Vec4(2, 5, 0);
// console.group();
// console.log('Vectors: ', '[v1]:', v1, '[v2]:', v2);
// console.group();
// console.log('Negated: ', '[v1]:', v1.neg(), '[v2]:', v2.neg());
// console.log('Sum:', v1.add(v2));
// console.log('Normalized [v2]:', v2.normalize());
// @todo Precision errors
// console.log('Rotated by Z axis (360°) [v1]:', v1.multiplyMatrix(Mat4.getRotMatZ(360)));
// console.log('Angle between [v1] and [v2]:', v1.angle(v2));
// console.log('Matrix multiplication on vector [v2]:', v2.multiplyMatrix(Mat4.getTransMat(10, 10, 0)));
// console.groupEnd();
// console.groupEnd();

// Mat4 Tests

// const transMat = Mat4.getTransMat(100, 100 ,0);
// const rotMat = Mat4.getRotMatZ(45);
// const TRMat = transMat.multiplyMatrix(rotMat);
// const RTMat = rotMat.multiplyMatrix(transMat);
// console.warn(transMat, rotMat, TRMat, RTMat);
// console.warn(Mat4.getTransMat(300, 300, 0).toTypedArray());
