var http = require("http"), fs = require("fs");
var port = process.env.port || 1337;

http.createServer(function (req, res){
    res.writeHead(200, {'Content-Type': 'application/json'});

    fs.readFile("./nodeInhoud.csv", "utf-8", function(error, data){
        var lines = data.split('\n');
        var obj = {};

        lines.forEach(function(line){
            var parts = line.split('.');
            obj["Hoofdstuk " + parts[0]] = parts[1];
        });

        res.end(JSON.stringify(obj));
    });

}).listen(port, "127.0.0.1");

console.log("Server running at: http://127.0.0.1:1337");