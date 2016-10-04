var express = require( 'express' );
var router = express.Router();
var passport = require( 'passport' );
var User = require( '../models/user' );
var Verify = require( './verify' );

router.get( '/', function ( req, res, next ) {
	User.find( {}, function ( err, users ) {
		if ( err ) {
			return res.status( 500 ).json( { err: err } );
		}

		res.json( { users: users } );
	} );
} );

router.post( '/', function ( req, res ) {
	User.register( new User( { username: req.body.username } ), req.body.password, function ( err, user ) {
		if ( err ) {
			return res.status( 500 ).json( { err: err } );
		}

		if ( req.body.firstname ) { user.firstname = req.body.firstname; }
		if ( req.body.lastname ) { user.lastname = req.body.lastname; }

		user.save( function ( err, user ) {
			if ( err ) { return res.status( 500 ).json( { err: err } ); }

			passport.authenticate( 'local' )( req, res, function () {
				return res.status( 200 ).json( { status: 'Registration Successful' } );
			} );
		} );
	} );
} );

router.post( '/login', function ( req, res, next ) {
	passport.authenticate( 'local', function ( err, user, info ) {
		console.log( 'passport.auth.local', err, user, info );
		if ( err ) { return next( err ); }

		if ( !user ) { return res.status( 401 ).json( { err: info } ); }

		req.logIn( user, function ( err ) {
			console.log( 'req.login.err', err );
			if ( err ) { return res.status( 500 ).json( { err: 'Could not log in user', details: err } ); }

			var token = Verify.getToken( { 'username': user.username, '_id': user._id, 'admin': user.admin } );
			console.log( 'the token', token );
			console.log( 'the user', user );
			var _user = {
				_id: user._id,
				firstname: user.firstname,
				lastname: user.lastname,
				games: user.games,
				username: user.username
			};

			res.status( 200 ).json( {
				status: 'success',
				success: true,
				user: _user,
				token: token
			} );
		} );
	} )( req, res, next );
} );

router.get( '/logout', function ( req, res ) {
	req.logout();
	res.status( 200 ).json( { status: 'bye' } );
} );

module.exports = router;