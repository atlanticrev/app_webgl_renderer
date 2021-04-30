export function degToRad(angDeg) {
    return angDeg / 180 * Math.PI;
}
export function radToDeg(angRad) {
    return angRad / Math.PI * 180;
}
export class Vec2 {
    constructor(x, y) {
        this._x = x;
        this._y = y;
    }
    static fromArray(arr) {
        return new Vec2(arr[0], arr[1]);
    }
    get x() {
        return this._x;
    }
    get y() {
        return this._y;
    }
    add(vec) {
        return new Vec2(this.x + vec.x, this.y + vec.y);
    }
    sub(vec) {
        return new Vec2(this.x - vec.x, this.y - vec.y);
    }
    dot(vec) {
        return this.x * vec.x + this.y * vec.y;
    }
    scale(scalar) {
        return new Vec2(this.x * scalar, this.y * scalar);
    }
    neg() {
        return this.scale(-1);
    }
    len() {
        return Math.hypot(this.x, this.y);
    }
    dist(vec) {
        return Math.hypot(vec.x - this.x, vec.y - this.y);
    }
    normalize() {
        return new Vec2(this.x, this.y).scale(1 / this.len());
    }
    angle(vec) {
        // @todo Math.cos(0.9999999999999999) error
        // return this.dot(vec) / (this.len() * vec.len());
        // return radToDeg(Math.acos(this.dot(vec) / (this.len() * vec.len())));
        return radToDeg(Math.acos(this.normalize().dot(vec.normalize())));
    }
    multiplyMatrix(mat) {
        return new Vec2(this.x * mat.e11 + this.y * mat.e21, this.x * mat.e12 + this.y * mat.e22);
    }
    copy() {
        return new Vec2(this.x, this.y);
    }
}
export class Mat2 {
    constructor(e1, e2, e3, e4) {
        this.e11 = e1;
        this.e12 = e2;
        this.e21 = e3;
        this.e22 = e4;
    }
    static fromArray(arr) {
        return new Mat2(arr[0], arr[1], arr[2], arr[3]);
    }
    static getRotMat(angDeg) {
        const angRad = degToRad(angDeg);
        return new Mat2(Math.cos(angRad), Math.sin(angRad), -Math.sin(angRad), Math.cos(angRad));
    }
    static getIdentMat() {
        return new Mat2(1, 0, 0, 1);
    }
    multiplyMatrix(mat) {
        return new Mat2(this.e11 * mat.e11 + this.e12 * mat.e21, this.e11 * mat.e12 + this.e12 * mat.e22, this.e21 * mat.e11 + this.e22 * mat.e21, this.e21 * mat.e12 + this.e22 * mat.e22);
    }
    det() {
        return this.e11 * this.e22 - this.e12 * this.e21;
    }
    // @todo implement
    inverse() {
        return Mat2.getIdentMat();
    }
}
export class Vec4 {
    constructor(x, y, z, w = 1) {
        this._x = x;
        this._y = y;
        this._z = z;
        this._w = w;
    }
    static fromArray(arr) {
        return new Vec4(arr[0], arr[1], arr[2]);
    }
    get x() {
        return this._x;
    }
    get y() {
        return this._y;
    }
    get z() {
        return this._z;
    }
    get w() {
        return this._w;
    }
    add(vec) {
        return new Vec4(this.x + vec.x, this.y + vec.y, this.z + vec.z);
    }
    sub(vec) {
        return new Vec4(this.x - vec.x, this.y - vec.y, this.z - vec.z);
    }
    dot(vec) {
        return this.x * vec.x + this.y * vec.y + this.z * vec.z;
    }
    scale(scalar) {
        return new Vec4(this.x * scalar, this.y * scalar, this.z * scalar);
    }
    neg() {
        return this.scale(-1);
    }
    len() {
        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
    }
    dist(vec) {
        return Math.sqrt((vec.x - this.x) * (vec.x - this.x) + (vec.y - this.y) * (vec.y - this.y) + (vec.z - this.z) * (vec.z - this.z));
    }
    normalize() {
        return new Vec4(this.x, this.y, this.z).scale(1 / this.len());
    }
    angle(vec) {
        // @todo Precision errors (cos/sin)
        // return this.dot(vec) / (this.len() * vec.len());
        // return radToDeg(Math.acos(this.dot(vec) / (this.len() * vec.len())));
        return radToDeg(Math.acos(this.normalize().dot(vec.normalize())));
    }
    // @todo Precision errors (cos/sin)
    multiplyMatrix(m) {
        return new Vec4(this.x * m.e11 + this.y * m.e21 + this.z * m.e31 + this.w * m.e41, this.x * m.e12 + this.y * m.e22 + this.z * m.e32 + this.w * m.e42, this.x * m.e13 + this.y * m.e23 + this.z * m.e33 + this.w * m.e43, this.x * m.e14 + this.y * m.e24 + this.z * m.e34 + this.w * m.e44);
    }
    copy() {
        return new Vec4(this.x, this.y, this.z);
    }
}
export class Mat4 {
    constructor(e11, e12, e13, e14, e21, e22, e23, e24, e31, e32, e33, e34, e41, e42, e43, e44) {
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
    static fromArray(arr) {
        return new Mat4(arr[0], arr[1], arr[2], arr[3], arr[4], arr[5], arr[6], arr[7], arr[8], arr[9], arr[10], arr[11], arr[12], arr[13], arr[14], arr[15]);
    }
    static getScaleMat(sx, sy, sz) {
        return new Mat4(sx, 0, 0, 0, 0, sy, 0, 0, 0, 0, sz, 0, 0, 0, 0, 1);
    }
    static getRotMatX(angDeg) {
        const angRad = degToRad(angDeg);
        return new Mat4(1, 0, 0, 0, 0, Math.cos(angRad), Math.sin(angRad), 0, 0, -Math.sin(angRad), Math.cos(angRad), 0, 0, 0, 0, 1);
    }
    static getRotMatY(angDeg) {
        const angRad = degToRad(angDeg);
        return new Mat4(Math.cos(angRad), 0, -Math.sin(angRad), 0, 0, 1, 0, 0, Math.sin(angRad), 0, Math.cos(angRad), 0, 0, 0, 0, 1);
    }
    static getRotMatZ(angDeg) {
        const angRad = degToRad(angDeg);
        return new Mat4(Math.cos(angRad), Math.sin(angRad), 0, 0, -Math.sin(angRad), Math.cos(angRad), 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
    }
    static getTransMat(dx, dy, dz) {
        return new Mat4(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, dx, dy, dz, 1);
    }
    // Scale + Translation
    static getOrthoMat(left, top, right, bottom, near, far) {
        return new Mat4(2 / (right - left), 0, 0, 0, 0, 2 / (top - bottom), 0, 0, 0, 0, -2 / (far - near), 0, -(right + left) / (right - left), -(top + bottom) / (top - bottom), -(far + near) / (far - near), 1);
    }
    static getWFactorMat(perspectiveFactor) {
        return new Mat4(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, perspectiveFactor, 0, 0, 0, 1);
    }
    static getPerspMat(FOVRad, aspect, near, far) {
        const f = Math.tan(Math.PI / 2 - FOVRad / 2);
        return new Mat4(f / aspect, 0, 0, 0, 0, f, 0, 0, 0, 0, (far + near) / (near - far), 2 * far * near / (near - far), 0, 0, -1, 0);
    }
    static getIdentMat() {
        return new Mat4(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
    }
    // Multiply on mat from right
    multiplyMatrix(mat) {
        return new Mat4(this.e11 * mat.e11 + this.e12 * mat.e21 + this.e13 * mat.e31 + this.e14 * mat.e41, this.e11 * mat.e12 + this.e12 * mat.e22 + this.e13 * mat.e32 + this.e14 * mat.e42, this.e11 * mat.e13 + this.e12 * mat.e23 + this.e13 * mat.e33 + this.e14 * mat.e43, this.e11 * mat.e14 + this.e12 * mat.e24 + this.e13 * mat.e34 + this.e14 * mat.e44, this.e21 * mat.e11 + this.e22 * mat.e21 + this.e23 * mat.e31 + this.e24 * mat.e41, this.e21 * mat.e12 + this.e22 * mat.e22 + this.e23 * mat.e32 + this.e24 * mat.e42, this.e21 * mat.e13 + this.e22 * mat.e23 + this.e23 * mat.e33 + this.e24 * mat.e43, this.e21 * mat.e14 + this.e22 * mat.e24 + this.e23 * mat.e34 + this.e24 * mat.e44, this.e31 * mat.e11 + this.e32 * mat.e21 + this.e33 * mat.e31 + this.e34 * mat.e41, this.e31 * mat.e12 + this.e32 * mat.e22 + this.e33 * mat.e32 + this.e34 * mat.e42, this.e31 * mat.e13 + this.e32 * mat.e23 + this.e33 * mat.e33 + this.e34 * mat.e43, this.e31 * mat.e14 + this.e32 * mat.e24 + this.e33 * mat.e34 + this.e34 * mat.e44, this.e41 * mat.e11 + this.e42 * mat.e21 + this.e43 * mat.e31 + this.e44 * mat.e41, this.e41 * mat.e12 + this.e42 * mat.e22 + this.e43 * mat.e32 + this.e44 * mat.e42, this.e41 * mat.e13 + this.e42 * mat.e23 + this.e43 * mat.e33 + this.e44 * mat.e43, this.e41 * mat.e14 + this.e42 * mat.e24 + this.e43 * mat.e34 + this.e44 * mat.e44);
    }
    // Multiply on mat from left
    premultiplyMatrix(mat) {
        return new Mat4(mat.e11 * this.e11 + mat.e12 * this.e21 + mat.e13 * this.e31 + mat.e14 * this.e41, mat.e11 * this.e12 + mat.e12 * this.e22 + mat.e13 * this.e32 + mat.e14 * this.e42, mat.e11 * this.e13 + mat.e12 * this.e23 + mat.e13 * this.e33 + mat.e14 * this.e43, mat.e11 * this.e14 + mat.e12 * this.e24 + mat.e13 * this.e34 + mat.e14 * this.e44, mat.e21 * this.e11 + mat.e22 * this.e21 + mat.e23 * this.e31 + mat.e24 * this.e41, mat.e21 * this.e12 + mat.e22 * this.e22 + mat.e23 * this.e32 + mat.e24 * this.e42, mat.e21 * this.e13 + mat.e22 * this.e23 + mat.e23 * this.e33 + mat.e24 * this.e43, mat.e21 * this.e14 + mat.e22 * this.e24 + mat.e23 * this.e34 + mat.e24 * this.e44, mat.e31 * this.e11 + mat.e32 * this.e21 + mat.e33 * this.e31 + mat.e34 * this.e41, mat.e31 * this.e12 + mat.e32 * this.e22 + mat.e33 * this.e32 + mat.e34 * this.e42, mat.e31 * this.e13 + mat.e32 * this.e23 + mat.e33 * this.e33 + mat.e34 * this.e43, mat.e31 * this.e14 + mat.e32 * this.e24 + mat.e33 * this.e34 + mat.e34 * this.e44, mat.e41 * this.e11 + mat.e42 * this.e21 + mat.e43 * this.e31 + mat.e44 * this.e41, mat.e41 * this.e12 + mat.e42 * this.e22 + mat.e43 * this.e32 + mat.e44 * this.e42, mat.e41 * this.e13 + mat.e42 * this.e23 + mat.e43 * this.e33 + mat.e44 * this.e43, mat.e41 * this.e14 + mat.e42 * this.e24 + mat.e43 * this.e34 + mat.e44 * this.e44);
    }
    toTypedArray() {
        return new Float32Array([
            this.e11, this.e12, this.e13, this.e14,
            this.e21, this.e22, this.e23, this.e24,
            this.e31, this.e32, this.e33, this.e34,
            this.e41, this.e42, this.e43, this.e44
        ]);
    }
    det() { }
    inverse() { }
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
//# sourceMappingURL=Math.js.map