// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();
//var pixi = require('pixi');
var server = require('http').createServer(app);
var assets = require('./assets');
var io = require('socket.io')(server);
var port = process.env.PORT || 3000;
// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

//update count
var updateCountDown = 2;



server.listen(port, function () {
  console.log('Server listening at port %d', port);

  
});
// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

//app.use("/assets", assets);
//var SOCKET_LIST{};
  var p1 = {};
  
io.on('connection', function (socket) {
  console.log("connected now");
  p1.x =100;
  p1.y =100;
  socket.on(1,function(data){
    //sleep(60);
    switch(data.key){
    case 'd':
    p1.x += (0.5 * data.delta);
    break;
    case 'w':
    p1.y -= (0.5 * data.delta);
    break;
    case 'a':
    p1.x -= (0.5 * data.delta);
    break;
    case 's':
    p1.y += (0.5 * data.delta);
    break;
    }
  });
  
 this.gameLoop = setInterval(function()
{   
    socket.emit(1,{
      x: p1.x,
      y: p1.y,
      time: new Date().getTime(),
    });
}, 1000/4);

  
   
  
});


function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}

