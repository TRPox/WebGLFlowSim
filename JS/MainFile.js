/**
 * Created by Sven on 10.04.2016.
 */
var webGLWindow, mouseControls;
window.onload = function () {
    webGLWindow = new WebGLWindow();
    mouseControls = new MouseControls(webGLWindow.getRenderer().domElement, webGLWindow.getCamera());
    mouseControls.disableContextMenu();
    document.body.appendChild(webGLWindow.getRenderer().domElement);
    webGLWindow.beginRender();
};
function onLineClick() {
    mouseControls.setMouseStrategy(new BuildObjectMouseStrategy("Line", webGLWindow.getScene()));
}
function onSplineClick() {
    mouseControls.setMouseStrategy(new BuildObjectMouseStrategy("Spline", webGLWindow.getScene()));
}
function onRectangleClick() {
    mouseControls.setMouseStrategy(new BuildObjectMouseStrategy("Rectangle", webGLWindow.getScene()));
}
function onCircleClick() {
    mouseControls.setMouseStrategy(new BuildObjectMouseStrategy("Circle", webGLWindow.getScene()));
}
//# sourceMappingURL=MainFile.js.map