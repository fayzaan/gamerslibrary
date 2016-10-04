var express = require( 'express' );
var config = require( '../config.js' );
var router = express.Router();
var passport = require( 'passport' );
var request = require( 'request' );
var query = require( 'query-string' );
var _ = require( 'underscore' );

var fieldEnums = [ 'fields', 'limit', 'offset', 'order', 'search', 'slug', 'themes', 'genres' ];
var fieldsMap = { 'slug': 'filter[slug][eq]', 'themes': 'filter[themes][eq]', 'genres': 'filter[genres][eq]' };

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

	params = query.stringify( params );

	var url = config.igdbUrl + '/games/' + '?' + params;

	request( {
		url: url,
		headers: headers
	}, function ( error, response, body ) {
		if ( error ) {
			console.log( 'error getting games', error );
			res.json( { error: error } )
		} else {
			res.json( { data: JSON.parse( body ) } );
		}
	} );

} );

module.exports = router;