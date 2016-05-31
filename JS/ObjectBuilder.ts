/**
 * Created by Sven on 09.04.2016.
 */
abstract class ObjectBuilderFactory {
    public static createBuilder(objectType:string):ObjectBuilder {
        switch (objectType) {
            case "Line":
                return new LineBuilder();
            case "Rectangle":
                return new RectangleBuilder();
            case "Circle":
                return new CircleBuilder();
            case "Spline":
                return new SplineBuilder();
            default:
                throw new Error("Invalid Object Type");
        }
    }
}

abstract class ObjectBuilder {
    protected geometry:THREE.Geometry;
    protected objectFinished:boolean;

    constructor() {
        this.geometry = new THREE.Geometry();
    }

    public addPoint(point:THREE.Vector3):void {
        if (!this.objectFinished)
            this.geometry.vertices.push(point);
    }

    public abstract getObject():THREE.Object3D;

    public finishObject():void {
        if (this.geometry.vertices.length >= 2)
            this.objectFinished = true;
    }

    public isObjectFinished():boolean {
        return this.objectFinished;
    }
}

class LineBuilder extends ObjectBuilder {

    constructor() {
        super();
    }

    public addPoint(point:THREE.Vector3):void {
        super.addPoint(point);
        this.finishObject();
    }

    public getObject():THREE.Object3D {
        var lineMaterial = new THREE.LineBasicMaterial({color: 0x00ff00});
        return new THREE.Line(this.geometry, lineMaterial);
    }

}

class RectangleBuilder extends ObjectBuilder {

    constructor() {
        super();
    }

    public addPoint(point:THREE.Vector3):void {
        super.addPoint(point);
        this.finishObject();
    }

    public getObject():THREE.Object3D {
        var planeMesh = this.makePlaneMesh();
        this.setMeshPosition(planeMesh);

        return planeMesh;
    }

    private makePlaneMesh():THREE.Object3D {
        var planeHeight = this.calculatePlaneHeight();
        var planeWidth = this.calculatePlaneWidth();
        var material = new THREE.MeshBasicMaterial({color: 0x33ccff});
        var planeGeo = new THREE.PlaneGeometry(planeWidth, planeHeight);

        return new THREE.Mesh(planeGeo, material);
    }

    private calculatePlaneHeight():number {
        return Math.abs(this.getUpperLeft().y - this.getBottomRight().y);
    }

    private calculatePlaneWidth():number {
        return Math.abs(this.getUpperLeft().x - this.getBottomRight().x);
    }

    private setMeshPosition(planeMesh:THREE.Object3D):void {
        var planeCenterX = this.calculatePlaneCenterX();
        var planeCenterY = this.calculatePlaneCenterY();
        planeMesh.position.set(planeCenterX, planeCenterY, 0);
    }

    private calculatePlaneCenterX():number {
        return ((this.getUpperLeft().x + this.getBottomRight().x) / 2);
    }

    private calculatePlaneCenterY():number {
        return (this.getUpperLeft().y + this.getBottomRight().y) / 2;
    }

    private getUpperLeft():THREE.Vector3 {
        return this.geometry.vertices[0];
    }

    private getBottomRight():THREE.Vector3 {
        return this.geometry.vertices[1];
    }

}

class CircleBuilder extends ObjectBuilder {

    constructor() {
        super();
    }

    public addPoint(point:THREE.Vector3):void {
        super.addPoint(point);
        this.finishObject();
    }

    public getObject():THREE.Object3D {
        var circleMesh = this.makeCircleMesh();
        this.setMeshPosition(circleMesh);

        return circleMesh;
    }

    private makeCircleMesh():THREE.Object3D {
        var circleGeo = new THREE.CircleGeometry(this.getRadius(), 32);
        var material = new THREE.MeshBasicMaterial({color: 0xff0000});

        return new THREE.Mesh(circleGeo, material);
    }

    private getRadius():number {
        return this.getCenter().distanceTo(this.getOuterPoint());
    }

    private setMeshPosition(mesh:THREE.Object3D):void {
        mesh.position.set(this.getCenter().x, this.getCenter().y, 0);
    }

    private getCenter():THREE.Vector3 {
        return this.geometry.vertices[0];
    }

    private getOuterPoint():THREE.Vector3 {
        return this.geometry.vertices[1];
    }

}

class SplineBuilder extends ObjectBuilder {

    constructor() {
        super();
    }

    public getObject():THREE.Object3D {
        var material = new THREE.LineBasicMaterial({color: 0xfff000});
        var splineGeo = this.makeSplineGeometry();

        return new THREE.Line(splineGeo, material);
    }

    private makeSplineGeometry():THREE.Geometry {
        var splineCurve = new THREE.SplineCurve3(this.geometry.vertices);
        var splineGeo = new THREE.Geometry();
        splineGeo.vertices = splineCurve.getPoints(50);

        return splineGeo;
    }

}

