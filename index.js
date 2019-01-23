var yyy = document.getElementById('xxx');
var content = yyy.getContext('2d');

autoSetCanvasSize(yyy)
listenToUser(yyy)

function autoSetCanvasSize(canvas) {
  setCanvasSize()
  window.onresize = function () {
    setCanvasSize()
  }

  function setCanvasSize() {
    var pageWidth = document.documentElement.clientWidth;
    var pageHeight = document.documentElement.clientHeight;
    canvas.width = pageWidth;
    canvas.height = pageHeight;
  }
}

function drawCircle(x, y, radius) {
  content.beginPath()
  content.fillStyle = 'white'
  content.arc(x, y, radius, 0, Math.PI * 2);
  content.fill()
}

/*************/

function listenToUser(canvas) {
  var using = false
  var lastpoint = {
    x: undefined,
    y: undefined
  }

  if (document.body.ontouchstart !== undefined) {
    //触屏设备

    canvas.ontouchstart = function (aaa) {
      
      var x = aaa.touches['0'].clientX
      var y = aaa.touches['0'].clientY

      
      using = true
      if (eraserEnabled) {
        content.clearRect(x - 3, y - 3, 15, 15)
      } else {
        lastPoint = {
          "x": x,
          "y": y
        }
      }
    }

    canvas.ontouchmove = function (aaa) {
      
      var x = aaa.touches['0'].clientX
      var y = aaa.touches['0'].clientY
      if (using) {
        if (eraserEnabled) {
          content.clearRect(x - 3, y - 3, 15, 15)
        } else {
          var newPoint = {
            "x": x,
            "y": y
          }
          drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
          lastPoint = newPoint
        }
      }
    }

    canvas.ontouchend = function () {
      
      using = false
    }
  }else{
    //非触屏设备
    canvas.onmousedown = function (aaa) {
      var x = aaa.clientX
      var y = aaa.clientY
      using = true
      if (eraserEnabled) {
        content.clearRect(x - 3, y - 3, 15, 15)
      } else {
        lastPoint = {
          "x": x,
          "y": y
        }
      }
    }

    canvas.onmousemove = function (aaa) {
      var x = aaa.clientX
      var y = aaa.clientY
      if (using) {
        if (eraserEnabled) {
          content.clearRect(x - 3, y - 3, 15, 15)
        } else {
          var newPoint = {
            "x": x,
            "y": y
          }
          drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
          lastPoint = newPoint
        }
      }
    }

    canvas.onmouseup = function (aaa) {
      using = false
    }
  }
}

function drawLine(x1, y1, x2, y2) {
  content.beginPath();
  content.strokeStyle = "white"
  content.moveTo(x1, y1)
  content.lineWidth = 5
  content.lineTo(x2, y2)
  content.stroke()
  content.closePath()
}

var eraserEnabled = false
eraser.onclick = function () {
  eraserEnabled = true
  actions.className = 'x actions'
}

brush.onclick = function () {
  eraserEnabled = false
  actions.className = 'actions'
}