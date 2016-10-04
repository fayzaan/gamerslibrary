var mongoose = require( 'mongoose' );
var Schema = mongoose.Schema;
var passportLocalMongoose = require( 'passport-local-mongoose' );

var Comment = new Schema( {
	comment: {
		type: String,
		required: true
	},
	postedBy: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	}
}, { timestamps: true } );

var Game = new Schema( {
	name: {
		type: String,
		required: true
	},
	slug: {
		type: String,
		required: true
	},
	gameid: {
		type: String,
		required: true
	},
	comments: [ Comment ]
}, { timestamps: true } )

module.exports = mongoose.model( 'Game', Game );