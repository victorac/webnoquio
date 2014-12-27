express = require("express");
var app = express();
var http = require('http').Server(app);
var io = require("socket.io")(http);

app.get('/', function(req, res){
    res.sendFile(__dirname + '/public_html/index.html'); // I would move this file to public
});

app.use(express.static(__dirname + '/public_html'));

var users = [];


io.on('connection', function(socket) {
    socket.on('logou',function(data){
       console.log(data + ' logou');
       
       dataUser = { nome: data, id: socket.id };
       
       users.push(dataUser);
       
       socket.emit('usuarios', users);
       socket.broadcast.emit('usuarios', users);
       var msg = '<div class="alert alert-success" role="alert">' + dataUser.nome + ' conectou' +' </div>';
       socket.broadcast.emit('server_message', msg);
       
    });
    
    socket.on('disconnect', function(data){
        
        for ( i in users){
            if ( socket.id == users[i].id ) {
                var nomeDesloga = users[i].nome;
                users.splice(i,1);
                var sendData = { deslogado: nomeDesloga,
                usersData: users
                };
                socket.broadcast.emit('deslogou', sendData );
                var msg = '<div class="alert alert-danger" role="alert">'
                + nomeDesloga + ' desconectou' +' </div>';
                socket.broadcast.emit('server_message', msg);
                break;
            }
        }
    });
});

http.listen(1881, function(){
    console.log("Webnoquio started at http://localhost:1881");    
});


