var c = document.getElementById("canvas");
var ctx = c.getContext("2d");

reset();
window.addEventListener("resize", reset);
noise.seed(Math.random());


var size = [100, 100];
var height = 50
var zoom = 50;
var details = 5
var marginTop = 200;
var marginBottom = 500;


var time = 0;
var interval = 1000/30;
setInterval(function(){frame(time);time+=interval}, interval);


function frame(timestamp) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  hhh = c.height/size[1];

  var px = [c.width/size[0], (c.height-marginBottom)/size[1]]

  for (var i = 0; i < size[1]; i++) {


    var hue = 20-70*(i/size[1])
    var saturation = 50+30*(i/size[1])
    var light = 90-75*(i/size[1]);

    ctx.fillStyle = `hsl(${hue}, ${saturation}%, ${light}%)`;
    ctx.beginPath();
    ctx.moveTo(c.width, c.height);
    ctx.lineTo(0, c.height);

    for (var j = 0; j <= size[0]; j++) {

      //n = noise.simplex3(j/zoom, i/zoom, timestamp/1000/zoom)
      n = 0;

      for (var k = 0; k < details; k++) {
        n += Math.pow(2, -k)*noise.simplex2(j/zoom/Math.pow(2, -k), (timestamp/5000)+i/zoom/Math.pow(2, -k))
      }

      ctx.lineTo(px[0]*j, marginTop+px[1]*i+height*n);
    }

    ctx.closePath();
    ctx.fill();

  }

}

function reset() {
  c.width = window.innerWidth;
  c.height = window.innerHeight;
}
