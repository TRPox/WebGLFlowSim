var BaseMouseStrategy = (function () {
    function BaseMouseStrategy() {
    }
    BaseMouseStrategy.prototype.mouseDownAt = function (point, buttonNumber) {
    };
    BaseMouseStrategy.prototype.isFinished = function () {
        return false;
    };
    return BaseMouseStrategy;
}());
var BuildObjectMouseStrategy = (function () {
    function BuildObjectMouseStrategy(objectType, scene) {
        this.isStrategyFinished = false;
        this.scene = scene;
        this.builder = ObjectBuilderFactory.createBuilder(objectType);
    }
    BuildObjectMouseStrategy.prototype.mouseDownAt = function (point, buttonNumber) {
        if (buttonNumber == 0)
            this.builder.addPoint(point);
        else if (buttonNumber == 2) {
            this.builder.finishObject();
            this.isStrategyFinished = true;
        }
        this.addObjectToSceneWhenFinished();
    };
    BuildObjectMouseStrategy.prototype.isFinished = function () {
        return this.isStrategyFinished;
    };
    BuildObjectMouseStrategy.prototype.addObjectToSceneWhenFinished = function () {
        if (this.builder.isObjectFinished()) {
            this.scene.add(this.builder.getObject());
            this.isStrategyFinished = true;
        }
    };
    return BuildObjectMouseStrategy;
}());
//# sourceMappingURL=MouseStrategies.js.map