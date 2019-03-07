canvas = document.getElementById('canvas');
ctx = canvas.getContext('2d');

var mouseX;
var mouseY;
var Sin_Points = [];
var Cos_Points = [];
var Tan_Points = [];
var No_of_Curve_Points = 10;
var ColorTheme = ['#287682', '#14ABBD', '#FFAA00', '#FF6000', '#FF3800'];
var DefaultCircle = [];



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
    constructor(x,y) {
        //Position
        this.x = x;
        this.y = y;
    }
    draw(){
        ctx.beginPath();
        ctx.arc(this.x, this.y, 1, 0, Math.PI * 2);
        ctx.fill();
    }
    update(){
        this.x = this.x + 1;
    }
}

class Default_Circle {
    constructor (x,y,radius,weight,color,tracer) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.weight = weight;
        this.color = color;
        this.tracer = tracer;
    }
    draw() {
        //Draw Circle
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.StrokeStyle = this.color;
        //ctx.context.lineWidth= this.weight;
        ctx.stroke();

        //Draw Tracer
        ctx.beginPath();
        var xpos = this.x + this.radius * Math.cos(this.tracer);
        var ypos = this.y + this.radius * Math.sin(this.tracer);

        ctx.arc(xpos, ypos, this.radius/10,0,Math.PI*2);
        ctx.fillStyle = this.color;
        ctx.fill();

    }
    update() {
        this.tracer = this.tracer - 0.01;
    }
}

function GenerateDefaultCircle() {
    DefaultCircle = [];
    DefaultCircle.push(new Default_Circle(canvas.width/10,canvas.height/2,canvas.width/10,'2pt',ColorTheme[Math.floor(Math.random() * ColorTheme.length)],0));
}

//
function GenerateCurve_Point() {
    DefaultCircle.forEach(trace => {
        var ypos =  trace.y +trace.radius * Math.sin(trace.tracer)
        Sin_Points.push(new Curve_Point(canvas.width/2,ypos));
        var ypos =  trace.y +trace.radius * Math.cos(trace.tracer)
        Cos_Points.push(new Curve_Point(canvas.width/2,ypos));
        var ypos =  trace.y +trace.radius * Math.tan(trace.tracer)
        if (ypos < canvas.height) {
            Tan_Points.push(new Curve_Point(canvas.width/2,ypos));
        }
    });   
}


//General Funcitons
function init() {
    GenerateDefaultCircle();
};

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    DefaultCircle.forEach(e => {
        e.update();
        e.draw();
    });
    GenerateCurve_Point();
    Sin_Points.forEach(e => {
        
        if (e.x < canvas.width) {
            e.update();
            e.draw();
        } else {
            Sin_Points.shift();
        }
    });
    Cos_Points.forEach(e => {
        
        if (e.x < canvas.width) {
            e.update();
            e.draw();
        } else {
            Cos_Points.shift();
        }
    });
    Tan_Points.forEach(e => {
        
        if (e.x < canvas.width) {
            e.update();
            e.draw();
        } else {
            Tan_Points.shift();
        }
    });
};

init();
setInterval(draw,0);
