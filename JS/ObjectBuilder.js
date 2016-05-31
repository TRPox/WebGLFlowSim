var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * Created by Sven on 09.04.2016.
 */
var ObjectBuilderFactory = (function () {
    function ObjectBuilderFactory() {
    }
    ObjectBuilderFactory.createBuilder = function (objectType) {
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
    };
    return ObjectBuilderFactory;
}());
var ObjectBuilder = (function () {
    function ObjectBuilder() {
        this.geometry = new THREE.Geometry();
    }
    ObjectBuilder.prototype.addPoint = function (point) {
        if (!this.objectFinished)
            this.geometry.vertices.push(point);
    };
    ObjectBuilder.prototype.finishObject = function () {
        if (this.geometry.vertices.length >= 2)
            this.objectFinished = true;
    };
    ObjectBuilder.prototype.isObjectFinished = function () {
        return this.objectFinished;
    };
    return ObjectBuilder;
}());
var LineBuilder = (function (_super) {
    __extends(LineBuilder, _super);
    function LineBuilder() {
        _super.call(this);
    }
    LineBuilder.prototype.addPoint = function (point) {
        _super.prototype.addPoint.call(this, point);
        this.finishObject();
    };
    LineBuilder.prototype.getObject = function () {
        var lineMaterial = new THREE.LineBasicMaterial({ color: 0x00ff00 });
        return new THREE.Line(this.geometry, lineMaterial);
    };
    return LineBuilder;
}(ObjectBuilder));
var RectangleBuilder = (function (_super) {
    __extends(RectangleBuilder, _super);
    function RectangleBuilder() {
        _super.call(this);
    }
    RectangleBuilder.prototype.addPoint = function (point) {
        _super.prototype.addPoint.call(this, point);
        this.finishObject();
    };
    RectangleBuilder.prototype.getObject = function () {
        var planeMesh = this.makePlaneMesh();
        this.setMeshPosition(planeMesh);
        return planeMesh;
    };
    RectangleBuilder.prototype.makePlaneMesh = function () {
        var planeHeight = this.calculatePlaneHeight();
        var planeWidth = this.calculatePlaneWidth();
        var material = new THREE.MeshBasicMaterial({ color: 0x33ccff });
        var planeGeo = new THREE.PlaneGeometry(planeWidth, planeHeight);
        return new THREE.Mesh(planeGeo, material);
    };
    RectangleBuilder.prototype.calculatePlaneHeight = function () {
        return Math.abs(this.getUpperLeft().y - this.getBottomRight().y);
    };
    RectangleBuilder.prototype.calculatePlaneWidth = function () {
        return Math.abs(this.getUpperLeft().x - this.getBottomRight().x);
    };
    RectangleBuilder.prototype.setMeshPosition = function (planeMesh) {
        var planeCenterX = this.calculatePlaneCenterX();
        var planeCenterY = this.calculatePlaneCenterY();
        planeMesh.position.set(planeCenterX, planeCenterY, 0);
    };
    RectangleBuilder.prototype.calculatePlaneCenterX = function () {
        return ((this.getUpperLeft().x + this.getBottomRight().x) / 2);
    };
    RectangleBuilder.prototype.calculatePlaneCenterY = function () {
        return (this.getUpperLeft().y + this.getBottomRight().y) / 2;
    };
    RectangleBuilder.prototype.getUpperLeft = function () {
        return this.geometry.vertices[0];
    };
    RectangleBuilder.prototype.getBottomRight = function () {
        return this.geometry.vertices[1];
    };
    return RectangleBuilder;
}(ObjectBuilder));
var CircleBuilder = (function (_super) {
    __extends(CircleBuilder, _super);
    function CircleBuilder() {
        _super.call(this);
    }
    CircleBuilder.prototype.addPoint = function (point) {
        _super.prototype.addPoint.call(this, point);
        this.finishObject();
    };
    CircleBuilder.prototype.getObject = function () {
        var circleMesh = this.makeCircleMesh();
        this.setMeshPosition(circleMesh);
        return circleMesh;
    };
    CircleBuilder.prototype.makeCircleMesh = function () {
        var circleGeo = new THREE.CircleGeometry(this.getRadius(), 32);
        var material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
        return new THREE.Mesh(circleGeo, material);
    };
    CircleBuilder.prototype.getRadius = function () {
        return this.getCenter().distanceTo(this.getOuterPoint());
    };
    CircleBuilder.prototype.setMeshPosition = function (mesh) {
        mesh.position.set(this.getCenter().x, this.getCenter().y, 0);
    };
    CircleBuilder.prototype.getCenter = function () {
        return this.geometry.vertices[0];
    };
    CircleBuilder.prototype.getOuterPoint = function () {
        return this.geometry.vertices[1];
    };
    return CircleBuilder;
}(ObjectBuilder));
var SplineBuilder = (function (_super) {
    __extends(SplineBuilder, _super);
    function SplineBuilder() {
        _super.call(this);
    }
    SplineBuilder.prototype.getObject = function () {
        var material = new THREE.LineBasicMaterial({ color: 0xfff000 });
        var splineGeo = this.makeSplineGeometry();
        return new THREE.Line(splineGeo, material);
    };
    SplineBuilder.prototype.makeSplineGeometry = function () {
        var splineCurve = new THREE.SplineCurve3(this.geometry.vertices);
        var splineGeo = new THREE.Geometry();
        splineGeo.vertices = splineCurve.getPoints(50);
        return splineGeo;
    };
    return SplineBuilder;
}(ObjectBuilder));
//# sourceMappingURL=ObjectBuilder.js.map