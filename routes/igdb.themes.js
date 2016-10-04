var express = require( 'express' );
var config = require( '../config.js' );
var router = express.Router();
var passport = require( 'passport' );
var request = require( 'request' );
var query = require( 'query-string' );
var _ = require( 'underscore' );

var fieldEnums = [ 'fields', 'limit', 'offset', 'themes' ];
var fieldsMap = {};

router.get( '/', function ( req, res, next ) {
	var headers = { 'Accept': 'application/json' };
	headers[ config.igdbHead ] = config.igdbKey;

	var params = _.forEach( req.query, function ( value, key ) {
		if ( fieldEnums.indexOf( key ) === -1 ) { delete req.query[ key ]; }
		if ( fieldsMap[ key ] ) {
			req.query[ fieldsMap[ key ] ] = value;
			delete req.query[ key ];
		}
	} );

	var themes = '';

	if ( params.themes ) {
		themes = params.themes.toString();
		delete params.themes;
	}

	params = query.stringify( params );

	var url = config.igdbUrl + '/themes/' + themes + '?' + params;

	console.log( 'companies.url: ', url );

	request( {
		url: url,
		headers: headers
	}, function ( error, response, body ) {
		if ( error ) {
			console.log( 'error getting themes', error );
			res.json( { error: error } )
		} else {
			res.json( { data: JSON.parse( body ) } );
		}
	} );

} );

module.exports = router;