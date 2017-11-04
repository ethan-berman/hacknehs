var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});
app.get('/script.js', function(req, res){
	res.sendFile(__dirname + '/script.js');
});
app.get('/style.css', function(req, res){
	res.sendFile(__dirname +  '/style.css');
});

io.on('connection', function(socket){
	console.log('a user connected');
	
	socket.on('connection', function(){

	});
});


http.listen(3000, function(){
  console.log('listening on *:3000');
});