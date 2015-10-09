//meerdere processen runnen -> settimeout, dit zal eerder uitgevoerd worden dan de HelloWorld
setTimeout(function(){
    //console.log(process.argv[0].toString());
}, 0);

// synchroon command
//console.log("Hello world2");

//console.log("Hello", process.argv[2]);

//MIX NIET: synchroon (for) en asynchroon tegelijk
for (var i = process.argv.length - 1; i >= 0; i--){
    //console.log(process.argv[i]);
    //setTimeout(function(){console.log(i);},0);
}

// for asynchroon ? => process.argv.forEach(el, function() {})

function showHelp() {
    var menu = "\n";
    menu += "\nMarijn's Menu";
    menu += "\n";
    menu += "\n--help \t show help";
    menu += "\n--name {NAME} \t Welkom {NAME}";
    console.log(menu);
}

if(process.argv[2] == "--help" || !process.argv[2]) {
    showHelp();
    process.exit();
}

if(process.argv[2] == "--name") {
    console.log("Welkom", process.argv[3]);
}