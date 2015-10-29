var nmbrRetries = 0;
var maxNmbrRetries = 3;

process.stdin.on("data", function(data){
   if (data.toString().toLowerCase().trim()=== "quit"){
       client.end();
   } else {
       client.write(data);
   }
});

function connect() {
    client = net.connect(port, "localhost", function(){

    });
}

client.on("close", function(){
    console.log("client connectie afgesloten");
    reconnect();
});

function reconnect() {
    if (nmbrRetries === maxNmbrRetries){
        console.log("max aantal retries is bereikt");
    }else {
        nmbrRetries += 1;
        setTimeout(connect, retryTimeout);
    }
}