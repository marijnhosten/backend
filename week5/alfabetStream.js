var readable = require("stream").Readable;
var path = require("path");
var rs = readable({encoding: 'utf8'});
var fs = require("fs");
var writable = fs.createWriteStream(path.normalize('./alfabet.txt'));

rs.push("Het alfabet: \n");

for(var i = 97, len = 'z'.charCodeAt(0); i <= len; i++){
    rs.push(String.fromCharCode(i));
    if(i >= 'z'.charCodeAt(0))
        rs.push(null);
}

rs.on("data", function (data) {
    console.log(data)
});

rs.on("error", function() {
    rs.pipe(process.stdout);
});

//NIET: rs.pipe("iets.txt") werkt niet omdat een file geen stream is
rs.pipe(writable).on("finish", function(){
    console.log("tekstfile aangemaakt");
});