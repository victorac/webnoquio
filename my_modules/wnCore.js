
wnCore = {
    test: function(){
        console.log(this.users);
    },
    usersFull: [],
    users: [],
    wnCore: function(){
        return this;
    },
    addUser: function(n, sId, sckt){
        var userData = { nome: n,
        SocketId: sId
        };
        this.users.push(userData);
        
        var userData = { nome: n,
        SocketId: sId,
        Socket: sckt,
        Index: this.users.length-1
        };
        this.usersFull[userData.SocketId] = userData;
        
    },
    getSocket: function(n){
        return this.users[n].Socket;
    },
    startHandlePage: function(app, express){
        
        app.get('/', function(req, res){
            res.sendFile(__dirname + '/public_html/index.html'); // I would move this file to public
        });
        
        app.use(express.static(__dirname + '/public_html'));
    },
    login: function(n, sId, socket){
        this.addUser(n, sId, socket);
        
        console.log(n + ' logou');
        
        
        socket.emit('usuarios', this.users);
        socket.broadcast.emit('usuarios', this.users);
        
        var msg = '<div class="alert alert-success" role="alert">' + n + ' conectou' +' </div>';
        socket.broadcast.emit('server_message', msg);
    },
    logout: function(socket){
        var usuario = this.usersFull[socket.id].nome;
        
        this.users.splice(this.usersFull[socket.id].Index, 1);
        this.usersFull.splice(socket.id, 1);
        
        
        console.log(usuario + 'deslogou');
        socket.broadcast.emit('usuarios', this.users);
        
        var msg = '<div class="alert alert-danger" role="alert">'
        + usuario + ' desconectou' +' </div>';
        socket.broadcast.emit('server_message', msg);
    }
}

module.exports = wnCore;