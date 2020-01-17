var engine: GraphicsEngine.Engine;

window.onload = function () {
    engine = new GraphicsEngine.Engine();
    engine.start(); 
    //document.body.innerHTML += "foo";
}

window.onresize = function () {
    engine.resize();
}