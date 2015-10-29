var net = require("net");
var sockets = [];
var server = net.createServer(
    {
        allowHalfOpen: false
    },
    function(socket){
        sockets.push(socket);
        socket.setEncoding("utf8");
        socket.on("data", function(data){
            if (data)
                console.log("received data: " + data);

            sockets.forEach(function (currentSocket) {
                if(socket !== currentSocket)
                    currentSocket.write(data);
            });

        });
        socket.on("end", function(){
            console.log("bye");
            var index = sockets.indexOf(socket);
            sockets.splice(index, 1); //1 is aantal te verwijderen

        });
    }
);

server.listen(1337, function(){
   console.log("listening to: " + server.address().port);
});

server.on("error", function(error){
    if(error.code === "EADDRINUSE")
        console.log("port already in use");
    else console.log("Error: " + error.message);
});

var client = net.connect(1337, "localhost", function(){
    console.log("connecting...");
    client.write("this is a message from the tcp client");
});