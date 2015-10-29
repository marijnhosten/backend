var http = require("http"), fs = require("fs"), path = require("path"),
    extensions = {
        ".html": "text/html",
        ".css": "text/css",
        ".js": "application/js",
        ".png": "image/png"
    },
    localMaps = {
        ".html": "/public/",
        ".css": "/public/css/",
        ".js": "/public/js/",
        ".png": "/public/images/"
    };

var server = http.createServer(function(req, res){

    var file = path.basename(req.url) || "index.html";
    var ext = path.extname(file);
    var localPath = process.cwd() + localMaps[ext] + file;

    getFile(localPath, extensions[ext], res);
});

function getFile(localPath, mimeType, res){
    fs.readFile(localPath, function(error, contents){
        if(!error){
            res.writeHeader(200,
                {
                    "Content-Type": mimeType
                }
            );

            res.end(contents);
        }else{
            res.writeHeader(500);
            res.end();
            console.log(error);
        }
    });
}

server.listen(1339, "127.0.0.1");

console.log("listening on port 1339");

