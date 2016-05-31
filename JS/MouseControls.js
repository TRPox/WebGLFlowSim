/**
 * Created by Sven on 10.04.2016.
 */
var MouseControls = (function () {
    function MouseControls(domElement, camera) {
        this.domElement = domElement;
        this.camera = camera;
        this.strategy = new BaseMouseStrategy();
        var object = this;
        this.domElement.addEventListener("mousedown", function (event) {
            object.onMouseDown(event);
        });
    }
    MouseControls.prototype.setMouseStrategy = function (strategy) {
        this.strategy = strategy;
    };
    MouseControls.prototype.disableContextMenu = function () {
        this.domElement.oncontextmenu = function () { return false; };
    };
    MouseControls.prototype.enableContextMenu = function () {
        this.domElement.oncontextmenu = function () { return true; };
    };
    MouseControls.prototype.onMouseDown = function (event) {
        event.preventDefault();
        var mousePosition = this.getMousePosition(event);
        this.strategy.mouseDownAt(mousePosition, event.button);
        if (this.strategy.isFinished())
            this.strategy = new BaseMouseStrategy();
    };
    MouseControls.prototype.getMousePosition = function (event) {
        var vector, rayDirection, distance, mouseXNormalized, mouseYNormalized, mousePosition3D;
        var element = this.domElement.getBoundingClientRect();
        mouseXNormalized = ((event.clientX - element.left) / element.width) * 2 - 1;
        mouseYNormalized = -((event.clientY - element.top) / element.height) * 2 + 1;
        vector = new THREE.Vector3();
        vector.set(mouseXNormalized, mouseYNormalized, 0.5);
        vector = vector.unproject(this.camera);
        rayDirection = vector.sub(this.camera.position).normalize();
        distance = -this.camera.position.z / rayDirection.z;
        mousePosition3D = this.camera.position.clone().add(rayDirection.multiplyScalar(distance));
        return mousePosition3D;
    };
    return MouseControls;
}());
//# sourceMappingURL=MouseControls.js.map