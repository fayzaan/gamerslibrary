var mongoose = require( 'mongoose' );
var Schema = mongoose.Schema;
var passportLocalMongoose = require( 'passport-local-mongoose' );

var User = new Schema( {
	username: String,
	password: String,
	email: String,
	register_date: Date,
	settings: {},
	features: {},
	games: {
		favorites: [],
		want: [],
		completed: []
	},
	firstname: {
		type: String,
		default: ''
	},
	lastname: {
		type: String,
		default: ''
	},
	admin: {
		type: Boolean,
		default: false
	}
} );

User.methods.getname = function () {
	return ( this.firstname + ' ' + this.lastname );
};

User.plugin( passportLocalMongoose );

module.exports = mongoose.model( 'User', User );