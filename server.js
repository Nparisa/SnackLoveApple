var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

// Server
http.listen(process.env.PORT, function(){
  console.log('Server is running');
});


//rendering  view

// app.get('/', function(req, res){
//   res.sendFile(__dirname + '/view/chat.html');
// });

app.use('/public',express.static(__dirname + '/public'));

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

app.get('/play', function(req, res){
  res.sendFile(__dirname + '/public/playsnack.html');
});
 
io.on('connection', (socket) => {

    console.log('made socket connection', socket.id);

    // Handle chat event
    socket.on('chat', function(data){
        // console.log(data);
        io.sockets.emit('chat', data);
    });

    // Handle typing event
    socket.on('typing', function(data){
        socket.broadcast.emit('typing', data);
    });

});
