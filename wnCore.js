var mongoose = require('mongoose');
//var db = monk("localhost:27017/wntest1");
var models  = require('./models/schema');
var User = mongoose.model('userSchema');

var lucas = new User({idUser:1, username: 'Lucas'});

var kittySchema = mongoose.Schema({
    name: String
})
kittySchema.methods.speak = function(){
	var greeting = this.name 
	? "Meow name is " + this.name 
	: "I don't have a name";
	console.log(greeting); 
}
var Kitten = mongoose.model('Kitten', kittySchema);
var silence = new Kitten({name:'Silence' });
console.log(silence.name);
silence.speak();
mongoose.connect("mongodb://localhost/test");
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(callback){
	silence.save(function (err, silence){
		if (err) return console.error(err);
		silence.speak();
	});
	Kitten.find({name: /^Silence/}, callback);
	console.log('find');
	
});

wnCore = {
    port: 1881, //Porta escolhida 1881: ano da criação de pinoquio
    setPort: function(newPort){
        this.port = newPort;
    },
    http: null,
    setHttp: function (h){
        this.http = h;
    },
    startServer: function(){
        var portListen = this.port;
        this.http.listen(portListen, function(){
            console.log("Webnoquio started at http://localhost:" + portListen);    
        });
    },
    usersFull: [],
    users: [],
    wnCore: function(){
        this.port = 1881;
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
        
        User.findOne({username:n}, function(err, user){
			if(err) return console.error(err);
			if (user) console.log('found');
			else{ 
				var newUser = new User({idUser:sId, username:n});
				newUser.save(function(err, user){
					if(err) return console.error(err);
					user.print();
				});
			}
				
		});
        
        this.addUser(n, sId, socket);
   
        console.log(n + ' logou');
   
        socket.emit('usuarios', this.users);
        socket.broadcast.emit('usuarios', this.users);
        
        var msg = '<div class="alert alert-success" role="alert">' + n + ' conectou' +' </div>';
        socket.broadcast.emit('server_message', msg);
    },
    logout: function(socket){
        if ( typeof this.usersFull[socket.id] == "undefined" ) {
            console.log("Conexão já não existe mais");
            return false;
        }
        
        var usuario = this.usersFull[socket.id].nome;
        
        this.users.splice(this.usersFull[socket.id].Index, 1);
        this.usersFull.splice(socket.id, 1);
        
        
        console.log(usuario + 'deslogou');
        socket.broadcast.emit('usuarios', this.users);
        
        var msg = '<div class="alert alert-danger" role="alert">'
        + usuario + ' desconectou' +' </div>';
        socket.broadcast.emit('server_message', msg);
    },
    showSocket: null,
    loginShow: function(socket, data){
        this.showSocket = socket;
        console.log("Webnoquio show logged on!");

    }
}

module.exports = wnCore;
