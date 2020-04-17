var yyy = document.getElementById('canvas');
var context = yyy.getContext('2d');
var lineWidth=5;

autoSetCanvasSize(yyy);
listenToMouse(yyy);

function listenToMouse(canvas) {
    var using = false;
    var lastPoint = {
        x: undefined,
        y: undefined
    }
   
    if (document.body.ontouchstart!==undefined){
        canvas.ontouchstart = function(aaa){
            var x = aaa.touches[0].clientX;
            var y = aaa.touches[0].clientY;
            using = true;
            if (eraserEnabled) {
                context.clearRect(x - 5, y - 5, 10, 10);
            } else {
                lastPoint = {
                    x: x, y: y
                }
            }
        }
        canvas.ontouchmove = function(aaa){
            var x = aaa.touches[0].clientX;
            var y = aaa.touches[0].clientY;
            if (!using) {
                return
            }
            if (eraserEnabled) {
                context.clearRect(x - 5, y - 5, 10, 10);
            } else {
                var newPoint = {
                    x: x, y: y
                }
                drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
                lastPoint = newPoint;
            }
        }
        canvas.ontouchend = function(aaa){
            using = false;
        }
    }else{
        canvas.onmousedown = function (aaa) {
            var x = aaa.clientX;
            var y = aaa.clientY;
            using = true;
            if (eraserEnabled) {
                context.clearRect(x - 5, y - 5, 10, 10);
            } else {
                lastPoint = {
                    x: x, y: y
                }
            }
        }
    canvas.onmousemove = function (aaa) {
        var x = aaa.clientX;
        var y = aaa.clientY;
        if (!using) {
            return
        }
        if (eraserEnabled) {
            context.clearRect(x - 5, y - 5, 10, 10);
        } else {
            var newPoint = {
                x: x, y: y
            }
            drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
            lastPoint = newPoint;
        }
    }
    canvas.onmouseup = function (aaa) {
        using = false;
    }
}
}


var eraserEnabled = false;
pen.onclick = function(){
    eraserEnabled=false;
    pen.classList.add('active');
    eraser.classList.remove('active');
}
eraser.onclick = function(){
    eraserEnabled=true;
    eraser.classList.add('active');
    pen.classList.remove('active');
}
clear.onclick = function(){
    context.clearRect(0, 0, canvas.width, canvas.height);
}
save.onclick = function(){
    var compositeOperation = context.globalCompositeOperation;
    context.globalCompositeOperation = "destination-over";
    context.fillStyle = "#fff";
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.putImageData(
      context.getImageData(0, 0, canvas.width, canvas.height),
      0,
      0
    );
    context.globalCompositeOperation = compositeOperation;
    var url =yyy.toDataURL("image/png");
    var a = document.createElement('a');
    document.body.appendChild(a);
    a.href = url;
    a.target = '_blank'
    a.download = 'picture';
    a.click();
}

black.onclick=function(){
    context.fillStyle = "black";
    context.strokeStyle='black';
    black.classList.add('active');
    red.classList.remove('active');
    blue.classList.remove('active');
}
red.onclick=function(){
    context.fillStyle = "red";
    context.strokeStyle='red';
    red.classList.add('active');
    black.classList.remove('active');
    blue.classList.remove('active');
}
blue.onclick=function(){
    context.fillStyle = "blue";
    context.strokeStyle='blue';
    blue.classList.add('active');
    black.classList.remove('active');
    red.classList.remove('active');
}

thin.onclick=function(){
    lineWidth=5;
}
thick.onclick=function(){
    lineWidth=10;
}

function autoSetCanvasSize(canvas) {
    setCanvasSize();
    window.onresize = function () {
        setCanvasSize();
    }
    function setCanvasSize() {
        var pageWidth = document.documentElement.clientWidth;
        var pageHeight = document.documentElement.clientHeight;
        canvas.width = pageWidth;
        canvas.height = pageHeight;
    }
}

function drawLine(x1, y1, x2, y2) {
    context.beginPath();
    // context.strokeStyle = 'black';
    context.moveTo(x1, y1);//起点
    context.lineWidth = lineWidth;
    context.lineTo(x2, y2);
    context.stroke();
    context.closePath();
}

