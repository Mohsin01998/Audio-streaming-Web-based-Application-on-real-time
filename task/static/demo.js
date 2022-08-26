var socket = io("http://127.0.0.1:5000");
    socket.on('connect', function() {
        socket.emit('message', {data: 'I\'m connected!'});
        console.log("Connected")
    });
