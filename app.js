//Declarations
var express = require("express");
var app = express();
var http = require('http').Server(app);
var io = require("socket.io")(http);
var wnCore = require("./my_modules/wnCore.js").wnCore();

//Setting the http
wnCore.setHttp(http);
//Setting the pages
wnCore.startHandlePage(app, express);

io.on('connection', function(socket) {
    socket.on('logou',function(nome){
        //Login Manager
        wnCore.login(nome, socket.id, socket);
    });
    
    socket.on('disconnect', function(data){
        //Logout Manager
        wnCore.logout(socket);
    });
});

//Starts the server
wnCore.startServer();


