var serverCount = 0;
var clientCount = 0;
var currentCount;
var timeOffset = 0;
var player = {};

var socket = io();
$(function() {
    player.serverX = [];
    player.serverY = [];
    player.time = [];
    window.onkeypress = function(e){
  
      clientCount++;
      socket.emit(1,{
        delta: delta,
        key: e.key
  });
  switch(e.key){
    case 'd':
      p2.x+=0.5 *delta;
    break;
    case 'w':
      p2.y-=0.5 * delta;
    break;
    case 'a':
      p2.x-=0.5 * delta;
    break;
    case 's':
      p2.y+=0.5 * delta;
    break;
}
      //yBuffer.push(p2.y);
     // xBuffer.push(p2.x);


//console.log("Clent "+ clientCount+ " x "+  xBuffer[xBuffer.length-1]+ " y " +yBuffer[yBuffer.length-1] + " delta" + delta);
    };

  socket.on(1,function(data){
    serverCount++;
    //console.log(data.x);
     player.serverX.push(data.x);
     player.serverY.push(data.y);
    player.time.push(new Date().getTime());
    
    //timeOffset = (new Date().getTime()-data.time);
    //if(timeOffset < 0)
     // timeOffset = 0;
    //console.log("server time "+timeOffset);
  //  console.log("Server count "+serverCount + " time "+  data.time+ " y " +data.y);
  })
});
