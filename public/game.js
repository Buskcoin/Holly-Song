var vendors = ['webkit', 'moz'];
var renderer;
var stage;
var graphics;
var graphics2;
var p1;
var p2;
var right = false;
var left = false;
var xBuffer = [];
var yBuffer= [];
var elf;
for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
    window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
    window.cancelAnimationFrame =
      window[vendors[x]+'CancelAnimationFrame'] || window[vendors[x]+'CancelRequestAnimationFrame'];
}
// run by the browser each time your view template is loaded

  var fps = 60,
    interval     =    1000/fps,
    lastTime     =    (new Date()).getTime(),
    currentTime  =    0,
    delta = 0,
    delay=1000;
    
function gameLoop() {
    window.requestAnimationFrame(gameLoop);
    currentTime = (new Date()).getTime();
    delta = (currentTime-lastTime);
  if(p1!==undefined)
    drawObject();
    if(delta > interval) {
        lastTime = currentTime - (delta % interval);
    }
}
function drawObject(){

renderer.render(stage);
stage.addChild(graphics);
stage.addChild(graphics2);
//p2.x = xBuffer[xBuffer.length-1];
//p2.y = yBuffer[yBuffer.length-1];
//elf.position.x = xBuffer[xBuffer.length-1];
//elf.position.y = yBuffer[yBuffer.length-1];
if(player.serverX.length > 2 && currentTime-player.time[0] > delay){
  
  //player.serverX.shift();
  //player.serverY.shift();
  var x1 = player.serverX[0];
  //player.time.shift();
  var x2 = player.serverX[1];
  var time = currentTime - player.time[0]-delay-4000;
  console.log("\nx1 "+x1+" x2 "+x2 +" time " +time);
  delay = (player.time[1]-player.time[0])*1.5;
  p1.x =interpolate(x1, x2,time, p1.x, player.time[1]-player.time[0]);
  //console.log("shift");
}
else if(player.serverX.length == 1){
  p1.x= player.serverX[0];
  p1.y = player.serverY[0];
  console.log("reset");
} else {
  
  
  
}
p2.display(0xFF1639,graphics);
p1.display(0xFFFFF, graphics2);
// create a new Sprite using the texture
}


function interpolate(x1,x2,t, x, interval){
  if(t>interval)
    t=interval;
	var result = x1 + (x2-x1)*(t/interval);
	if(result == x || result ==x2){
	  player.serverX.shift();
	  var size = player.serverX.length;
	  player.time.shift();
	  console.log("shifting " + size);
	  
	}
  console.log("here are the results " + (result-x1));
  return result;
}

function serverBufferInterpolate(arrBuffer){
  if(arrBuffer.length > 4){
    return arrBuffer.shift();
  } else
    return arrBuffer[arrBuffer.length-1];
}

class Player{
  constructor(x,y){
    this.x = x;
    this.y = y;
    this.time = new Date().getTime();
  }
  display(hex, g){
g.clear();
    g.beginFill(hex);
g.drawCircle(this.x,this.y,60);
g.endFill();

  }
 
  
}


$(function(){
  
 renderer = new PIXI.CanvasRenderer(400, 300, document.getElementById("maincanvas"));renderer.view.style.width = '800px';renderer.view.style.height = '600px';
//Add the canvas to the HTML document
document.body.appendChild(renderer.view);
renderer.backgroundColor = 0x0;

 
//Create a container object called the `stage`
stage = new PIXI.Container();
console.log("hello this begins");
graphics = new PIXI.Graphics();
graphics2 = new PIXI.Graphics();
xBuffer.push(100);
yBuffer.push(100);
p1=new Player(100,100);
p2=new Player(100,100);
//Tell the `renderer` to `render` the `stage`
renderer.render(stage);
renderer.view.style.position = "absolute";
renderer.view.style.display = "block";
renderer.autoResize = true;
renderer.resize(window.innerWidth, window.innerHeight);
 stage.interactive = true;

  var texture = PIXI.Texture.fromImage("/assets/noArmElf.png");
elf = new PIXI.Sprite(texture);
elf.anchor.x = 0.5;
elf.anchor.y = 0.5;
elf.position.x = 200;
elf.position.y = 150;
stage.addChild(elf);
gameLoop();
});