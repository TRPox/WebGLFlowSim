/**
 * Created by Sven on 10.04.2016.
 */
class MouseControls {
    private strategy:MouseStrategy;
    private domElement:HTMLElement;
    private camera:THREE.Camera;

    constructor(domElement:HTMLElement, camera:THREE.Camera) {
        this.domElement = domElement;
        this.camera = camera;
        this.strategy = new BaseMouseStrategy();
        var object = this;
        this.domElement.addEventListener("mousedown",function(event:MouseEvent) {
            object.onMouseDown(event);
        });
    }

    public setMouseStrategy(strategy:MouseStrategy):void {
        this.strategy = strategy;
    }

    public disableContextMenu():void {
        this.domElement.oncontextmenu = function() {return false;}
    }

    public enableContextMenu():void {
        this.domElement.oncontextmenu = function() {return true;}
    }

    public onMouseDown(event:MouseEvent):void {
        event.preventDefault();
        var mousePosition = this.getMousePosition(event);
        this.strategy.mouseDownAt(mousePosition, event.button);
        if (this.strategy.isFinished()) this.strategy = new BaseMouseStrategy();
    }

    private getMousePosition(event:MouseEvent):THREE.Vector3 {
        var vector,
            rayDirection,
            distance,
            mouseXNormalized,
            mouseYNormalized,
            mousePosition3D;
        var element = this.domElement.getBoundingClientRect();
        mouseXNormalized = ((event.clientX - element.left) / element.width ) * 2 - 1;
        mouseYNormalized = -((event.clientY - element.top) / element.height ) * 2 + 1;
        vector = new THREE.Vector3();
        vector.set(mouseXNormalized, mouseYNormalized, 0.5);
        vector = vector.unproject(this.camera);
        rayDirection = vector.sub(this.camera.position).normalize();
        distance = -this.camera.position.z / rayDirection.z;
        mousePosition3D = this.camera.position.clone().add(rayDirection.multiplyScalar(distance));
        return mousePosition3D;
    }


}