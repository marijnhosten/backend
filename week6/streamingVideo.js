var http = require("http"), path = require("path"), fs = require("fs");

var server = http.createServer();

server.on("request", function(req, res){

    var file = path.normalize("./video.mp4"); //ipv fs.readFile omdat dit beter is

    res.writeHead(200,
        {
            'Content-type': 'text/html, video/mp4'
        });

    var readStream = fs.createReadStream(file,
        {
            flags: 'r',
            encoding: null,
            fd: null,
            mode: 0666,
            bufferSize: 256 * 1024
        });

    readStream.on("data", function(chunks){
       if(!res.write){
           console.log("wachten...");
           readStream.pause();
       }else {
           console.log("verderdoen");

           readStream.resume();

       }
    });

    res.on("drain", function(){
        return function(){readStream.resume()} ;
    });

});

server.listen(1338);

console.log("Server running at: http://127.0.0.1:1338");