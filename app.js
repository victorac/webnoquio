//Porta escolhida 1881: ano da criação de pinoquio

express = require("express");
var app = express();
var http = require('http').Server(app);
var io = require("socket.io")(http);

var wnCore = require("./my_modules/wnCore.js").wnCore();

wnCore.startHandlePage(app, express);

io.on('connection', function(socket) {
    socket.on('logou',function(nome){
        wnCore.login(nome, socket.id, socket);
    });
    
    socket.on('disconnect', function(data){
        wnCore.logout(socket);
    });
});

http.listen(1881, function(){
    console.log("Webnoquio started at http://localhost:1881");    
});


