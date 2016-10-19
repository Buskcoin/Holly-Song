// client-side js



   var socket = io();
$(function() {
 
    window.onkeypress = function(e){
    if(e.key === 'd'){
       socket.emit('happy',{
    reason:'its my birthday',
    x:p1.x,
    y:p1.y,
  })
    }
    }
 
  socket.on('serverMsg',function(data){
    console.log(data.msg);
    p1.x=data.x;
    console.log("x "+data.x);
    p1.y =data.y;
    console.log("y "+data.y)
  })
});
var happy= function(){
      socket.emit('happy',{
        reason: 'its my birthday'
      })
    }