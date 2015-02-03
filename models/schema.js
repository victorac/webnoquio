var mongoose = require('mongoose');

var schema = mongoose.Schema;

var userSchema = new schema({
	idUser : {type: String},
	username : {type: String}
});
userSchema.methods.print = function(){
	greeting = 'Welcome, ' + this.username;
	console.log(greeting);
}

mongoose.model('userSchema',userSchema);
