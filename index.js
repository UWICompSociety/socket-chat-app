// express web framework
var app = require('express')();

// creates server
var server = require('http').Server(app);

// socket.io
var io = require('socket.io')(server);

// listen port
server.listen(3000, function() {
	console.log('Server running on port 3000');
});


app.get('/', function(req, res) {
	// hello world
	// res.send("Hello World");
	res.sendFile(__dirname + '/index.html');
});

// when there is a connection, do this
io.on('connection', function(socket){
	// console.log('A new connection was made');
	socket.on('chat.message', function(message) {
		// console.log("New message " + message);
		io.emit('chat.message', message);
	});

	socket.on('disconnect', function() {
		io.emit('chat.message', 'User has disconnected.');
	});
});