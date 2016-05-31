/**
 * Created by Sven on 10.04.2016.
 */
class WebGLWindow {

    private renderer:THREE.WebGLRenderer;
    private scene:THREE.Scene;
    private camera:THREE.Camera;
    private animationFrameId:number;

    constructor() {
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize(500, 300);
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.camera.position.z = 300;
        this.animationFrameId = -1;
    }

    public getRenderer():THREE.Renderer {
        return this.renderer;
    }

    public getCamera():THREE.Camera {
        return this.camera;
    }

    public getScene():THREE.Scene {
        return this.scene;
    }

    public beginRender():void {
        var renderer = this.renderer;
        var scene = this.scene;
        var camera = this.camera;
        var id = -1;
        var render = function () {
            id = requestAnimationFrame(render);
            renderer.render(scene, camera);
        }
        render();
        this.animationFrameId = id;
    }

    public stopRender():void {
        cancelAnimationFrame(this.animationFrameId);
    }
}