// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();
var pixi = require('pixi');
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var port = process.env.PORT || 3000;
// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

server.listen(port, function () {
  console.log('Server listening at port %d', port);
});
// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

//var SOCKET_LIST{};

io.on('connection', function (socket) {
  console.log("connected now");
  socket.x = 0;
  socket.y = 0;
  socket.on('happy',function(data){
    console.log("yay@!");
    socket.emit('serverMsg',{
      msg:'hello'+data.reason,
      x: ++data.x,
      y: ++data.y,
    });
  });
  
});
