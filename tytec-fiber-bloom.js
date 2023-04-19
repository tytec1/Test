var steps = 30;
var minscale = 0.5;
var md = new MobileDetect(window.navigator.userAgent);

var cable = new Raster({
    source: 'https://static1.squarespace.com/static/60d9b91fcc854f60487484da/t/643ff1775b588679e58b273f/1681912183756/fiber-bloom.png',
    position: view.center
});

symbol = new Symbol(cable);

var layer = new Layer();
layer.transformContent = false;

for (i = 0; i < steps; i++){
    placed = symbol.place(view.center);
    placed.scale((minscale + i * (1 - minscale) / steps));
}

var stroke = new Raster({
    source: 'https://static1.squarespace.com/static/60d9b91fcc854f60487484da/t/643ff195376665684ffe4b3e/1681912213994/fiber-bloom-stroke.png',
    position: view.center
});

if (view.size.width <= view.size.height) {
    layer.scaling = view.size.width / 1500;
} else {
    layer.scaling = view.size.height / 1500;
}

function onGlobalMouseMove(event) {
    var vector = new Point(event.clientX - window.innerWidth / 2, event.clientY - window.innerHeight / 2);

    for (j = 0; j < project.activeLayer.children.length; j++){
        var z = project.activeLayer.children.length - j;
        project.activeLayer.children[j].position = view.center + (vector / steps) * z / 5;
        project.activeLayer.children[j].rotation = (vector.x / 50);
    }
}

function onFrame(event) {
    layer.position = view.center;
    if (view.size.width <= view.size.height) {
        layer.scaling = view.size.width / 1500;
    } else {
        layer.scaling = view.size.height / 1500;
    }
}

if (!md.mobile()) {
    window.addEventListener('mousemove', onGlobalMouseMove);
}
