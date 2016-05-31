/**
 * Created by Sven on 10.04.2016.
 */
var WebGLWindow = (function () {
    function WebGLWindow() {
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize(500, 300);
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.camera.position.z = 300;
        this.animationFrameId = -1;
    }
    WebGLWindow.prototype.getRenderer = function () {
        return this.renderer;
    };
    WebGLWindow.prototype.getCamera = function () {
        return this.camera;
    };
    WebGLWindow.prototype.getScene = function () {
        return this.scene;
    };
    WebGLWindow.prototype.beginRender = function () {
        var renderer = this.renderer;
        var scene = this.scene;
        var camera = this.camera;
        var id = -1;
        var render = function () {
            id = requestAnimationFrame(render);
            renderer.render(scene, camera);
        };
        render();
        this.animationFrameId = id;
    };
    WebGLWindow.prototype.stopRender = function () {
        cancelAnimationFrame(this.animationFrameId);
    };
    return WebGLWindow;
}());
//# sourceMappingURL=WebGLWindow.js.map