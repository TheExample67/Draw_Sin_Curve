canvas = document.getElementById('canvas');
ctx = canvas.getContext('2d');

var mouseX;
var mouseY;
var Points = [];
var ColorTheme = ['#287682', '#14ABBD', '#FFAA00', '#FF6000', '#FF3800'];
var SinColor = ColorTheme[Math.floor(Math.random() * ColorTheme.length)];
var CosColor =ColorTheme[Math.floor(Math.random() * ColorTheme.length)];
var TanColor = ColorTheme[Math.floor(Math.random() * ColorTheme.length)];
var DefaultCircle;



//Listeners
window.addEventListener('load', resize, false);
window.addEventListener('resize', resize, false);
window.addEventListener('mousemove', function (evt) {
    var mousePos = getMousePos(canvas, evt);
    mouseX = mousePos.x;
    mouseY = mousePos.y;
}, false);
function getMousePos(canvas, evt) {
    return {
        x: evt.clientX,
        y: evt.clientY
    };
}

function resize() {
    var canvas_height = window.innerHeight;
    var canvas_width = window.innerWidth;
    canvas.width = canvas_width;
    canvas.height = canvas_height;
    init();
}

//Classes
class Curve_Point {
    constructor(x, y,color) {
        //Position
        this.x = x;
        this.y = y;
        this.color = color;
    }
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, 1, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
    update() {
        this.x = this.x + 1;
    }
}

class Default_Circle {
    constructor(x, y, radius, color, tracer) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.tracer = tracer;
    }
    draw() {
        this.update();
        //Draw Circle
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.StrokeStyle = this.color;
        ctx.stroke();

        //Draw Tracer
        ctx.beginPath();
        var xpos = this.x + this.radius * Math.cos(this.tracer);
        var ypos = this.y + this.radius * Math.sin(this.tracer);

        ctx.arc(xpos, ypos, this.radius / 10, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();

    }
    update() {
        this.tracer = this.tracer - 0.01;
    }
}

function GenerateDefaultCircle() {
    DefaultCircle = new Default_Circle(canvas.width / 10, canvas.height / 2, canvas.width / 10, ColorTheme[Math.floor(Math.random() * ColorTheme.length)], 0);
}

function GenerateCurve_Point() {
    StartingXPos = canvas.width/4;
    var ypos = DefaultCircle.y + DefaultCircle.radius * Math.sin(DefaultCircle.tracer)
    Points.push(new Curve_Point(StartingXPos, ypos,SinColor));
    var ypos = DefaultCircle.y + DefaultCircle.radius * Math.cos(DefaultCircle.tracer)
    Points.push(new Curve_Point(StartingXPos, ypos,CosColor));
    var ypos = DefaultCircle.y + DefaultCircle.radius * Math.tan(DefaultCircle.tracer)
    if (ypos < canvas.height) {
        Points.push(new Curve_Point(StartingXPos, ypos,TanColor));
    }
}


//General Funcitons
function init() {
    GenerateDefaultCircle();

};

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    DefaultCircle.draw();
    GenerateCurve_Point();
    Points.forEach(e => {

        if (e.x < canvas.width) {
            e.update();
            e.draw();
        } else {
            Points.shift();
        }
    });
};

init();
setInterval(draw, 0);
