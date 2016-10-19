var vendors = ['webkit', 'moz'];
var renderer;
var stage;
var graphics;
var p1;
var right = false;
var left = false;
for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
    window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
    window.cancelAnimationFrame =
      window[vendors[x]+'CancelAnimationFrame'] || window[vendors[x]+'CancelRequestAnimationFrame'];
}
// run by the browser each time your view template is loaded

  var fps = 30,
 
    interval     =    1000/fps,
    lastTime     =    (new Date()).getTime(),
    currentTime  =    0,
    delta = 0;
    
    
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
  //stage.interactive = true;

  //var texture = PIXI.Texture.fromImage('https://s3.amazonaws.com/hyperweb-editor-assets/us-east-1%3Ad0d03a8e-22bf-451d-ba15-f08d8f4e99ba%2Fuse-url.svg');

renderer.render(stage);
stage.addChild(graphics);
p1.display();

// create a new Sprite using the texture
//var elf = new PIXI.Sprite(texture);
//elf.anchor.x = 0.5;
//elf.anchor.y = 0.5;
}
class Player{
  constructor(x,y){
    this.x = x;
    this.y = y;
  }
  display(){
    graphics.clear();
    graphics.beginFill(0xFFFFF);
graphics.drawCircle(this.x,this.y,60);
graphics.endFill();
  }
 
  
}


$(function(){
 renderer = new PIXI.CanvasRenderer(400, 300, document.getElementById("maincanvas"));renderer.view.style.width = '800px';renderer.view.style.height = '600px';
//Add the canvas to the HTML document
document.body.appendChild(renderer.view);
renderer.backgroundColor = 0x061639;
//Create a container object called the `stage`
stage = new PIXI.Container();
console.log("hello this begins");
graphics = new PIXI.Graphics();
p1=new Player(100,100);
//Tell the `renderer` to `render` the `stage`
renderer.render(stage);
renderer.view.style.position = "absolute";
renderer.view.style.display = "block";
renderer.autoResize = true;
renderer.resize(window.innerWidth, window.innerHeight);
gameLoop();
});