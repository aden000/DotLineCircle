/*
	Sauce
	http://jsfiddle.net/nwellcome/mJyps/5/
*/

var kanpas;
var konteks;
var variabel_x = 0;
var variabel_y = 0;

window.onload = function() {
    kanpas = document.getElementById("myCanvas");
    konteks = kanpas.getContext("2d");
    console.log("Function Onload Window accessed");
}
	/*konteks.fillStyle = "black";
	konteks.fill();
	//context.rect(_x,100,100,100);
    //context.strokeStyle = "blue";
    //context.stroke();
};*/

function Gambar(x,y) {
  konteks.fillStyle = "#2d2d2d";
	konteks.fillRect(x,y,3,3)
}
  /*var index = (x + y * canvasWidth) * 4;
  canvasData.data[index + 0] = r;
  canvasData.data[index + 1] = g;
  canvasData.data[index + 2] = b;
  canvasData.data[index + 3] = a;

  updateCanvas();
}

function updateCanvas() {
  ctx.putImageData(canvasData, 0, 0);
}
*/


function sendVal(form) {
  variabel_x = form.xx.value;
	variabel_y = form.yy.value;
	if(variabel_x == 0 || variabel_y == 0){
		alert("ra enek inputan oe");
	} else if(variabel_x > kanpas.width || variabel_y > kanpas.height) {
		alert("nilai " + (variabel_x > kanpas.width ? ( variabel_x + " kegeden karo nilai X, lebokno kurang tekan " + kanpas.width) : (variabel_y + " kegeden karo nilai Y, lebokno kurang tekan " + kanpas.height)));
	} else {
		Gambar(variabel_x,variabel_y);
		document.getElementById('tb1').value = '';
		document.getElementById('tb2').value = '';
	}
}

function clearCanvas(){
  konteks.clearRect(0,0, kanpas.width, kanpas.height);
  variabel_x = 0;
  variabel_y = 0;
  console.log("The Canvas has been cleared in event click on button with id btn10");
}

function lineCreateDDR(form){
  var step=0, incx=0, incy=0;
  var posx1 = parseInt(form.x1.value, 10);
  var posx2 = parseInt(form.x2.value, 10);
  var posy1 = parseInt(form.y1.value, 10);
  var posy2 = parseInt(form.y2.value, 10);
  var x = posx1;
  var y = posy1;
  var diffx = posx2 - posx1;
  var diffy = posy2 - posy1;

  if(Math.abs(diffx) > Math.abs(diffy)){
    step = Math.abs(diffx);
  } else {
    step = Math.abs(diffy);
  }

  incx = diffx / step;
  incy = diffy / step;

  for(var i=0; i < step; i++){
    x += incx;
    y += incy;
    console.log("x = " + x + " y = " + y)
    Gambar(Math.round(x), Math.round(y))
  }
}

function lineCreateBressenham(form){
  /* Sauce from Wikipedia: Pseudocode https://en.wikipedia.org/wiki/Bresenham%27s_line_algorithm */
    var x=0, y=0, end;
    var x1 = parseInt(form.x1.value, 10);
    var x2 = parseInt(form.x2.value, 10);
    var y1 = parseInt(form.y1.value, 10);
    var y2 = parseInt(form.y2.value, 10);
    var dx = Math.abs(x2 - x1);
    var dy = Math.abs(y2 - y1);

    if(dx >= dy){
      var d = 2*dy-dx;
      var dkd0 = 2*dy;
      var dld0 = 2*(dy-dx);
      if(x1 > x2){
        x = x2;
        y = y2;
        endx = x1;
      } else {
        x = x1;
        y = y1;
        endx = x2;
      }
      while(x < endx){
        x++;
        if(d < 0){
          d += dkd0
        } else {
          if(y1 > y2){
            y--;
          } else {
            y++;
          }
          d += dld0;
        }
        Gambar(x, y)
      }
    } else {
      d = 2*dx-dy;
      dkd0 = 2*dx;
      dld0 = 2*(dx-dy);

      if(y1 > y2){
        x = x2;
        y = y2;
        endy = y1;
      } else {
        x = x1;
        y = y1;
        endy = y2;
      }
      while(y<endy){
        y++;
        if(d<0){
          d += dkd0;
        } else {
          if(x1>x2){
            x--;
          } else {
            x++;
          }
          d += dld0;
        }
        Gambar(x, y)
      }
    }
}
function CircleCreate(form){
  var x0 = parseInt(form.x.value, 10);
  var y0 = parseInt(form.y.value, 10);
  var r = parseInt(form.r.value, 10);

  var p = 1-r;
  var x;
  var y = r;

  Gambar(x0, y0)
  for(var x = 0; x<=y; x++){
    if(p<0){
      p+=2*x+1;
    } else {
      y--;
      p+=2*(x-y)+1;
    }
    Gambar(x0+x, y0+y);
    Gambar(x0-x, y0+y);
    Gambar(x0+x, y0-y);
    Gambar(x0-x, y0-y);
    Gambar(x0+y, y0+x);
    Gambar(x0-y, y0+x);
    Gambar(x0+y, y0-x);
    Gambar(x0-y, y0-x);
  }
}
