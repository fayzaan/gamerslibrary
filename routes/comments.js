var express = require( 'express' );
var router = express.Router();
var passport = require( 'passport' );
var Game = require( '../models/comment' );
var Verify = require( './verify' );

router.route( '/' )
	.get( function ( req, res, next ) {
		Game.find( { gameid: req.query.gameid } )
			.populate( 'comments.postedBy' )
			.exec( function ( err, comments ) {
				if ( err ) { next( err ); }
				return res.json( comments );
			} );
	} )
	.post( Verify.verifyOrdinaryUser, function ( req, res, next ) {
		req.body.postedBy = req.decoded._id;

		console.log( 'post.id: ', req.body.postedBy );

		Game.find( { gameid: req.body.gameid }, function ( err, found ) {
			if ( err ) { res.json( { success: false, error: err } ); }

			if ( found && found.length ) {
				var game = found[ 0 ];
				if ( !game.comments ) { game.comments = []; }
				game.comments.push( { comment: req.body.comment, postedBy: req.body.postedBy } );
				game.save( function ( err, game ) {
					res.json( { success: true } );
				} )
			} else {
				Game.create( { gameid: req.body.gameid, slug: req.body.slug, name: req.body.name, comments: [ { comment: req.body.comment, postedBy: req.body.postedBy } ] }, function ( err, game ) {
					if ( err ) { res.json( { success: false, error: err } ); }
					
					res.json( { success: true } );
				} );
			}
		} );
	} );

module.exports = router;