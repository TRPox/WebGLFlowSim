/**
 * Created by Sven on 10.04.2016.
 */
interface MouseStrategy {

    mouseDownAt(point:THREE.Vector3, buttonNumber:number):void;
    isFinished():boolean;
}

class BaseMouseStrategy implements MouseStrategy {

    constructor() {
    }

    public mouseDownAt(point:THREE.Vector3, buttonNumber:number):void {
    }

    public isFinished():boolean {
        return false;
    }
}

class BuildObjectMouseStrategy implements MouseStrategy {

    private scene:THREE.Scene;
    private builder:ObjectBuilder;
    private isStrategyFinished:boolean = false;

    constructor(objectType:string, scene:THREE.Scene) {
        this.scene = scene;
        this.builder = ObjectBuilderFactory.createBuilder(objectType);
    }

    public mouseDownAt(point:THREE.Vector3, buttonNumber:number):void {
        if (buttonNumber == 0)
            this.builder.addPoint(point);
        else if (buttonNumber == 2) {
            this.builder.finishObject();
            this.isStrategyFinished = true;
        }

        this.addObjectToSceneWhenFinished();
    }

    public isFinished():boolean {
        return this.isStrategyFinished;
    }

    private addObjectToSceneWhenFinished():void {
        if (this.builder.isObjectFinished()) {
            this.scene.add(this.builder.getObject());
            this.isStrategyFinished = true;
        }
    }
}
