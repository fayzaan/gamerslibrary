var express = require( 'express' );
var path = require( 'path' );
var passport = require( 'passport' );
var config = require( './config' );
var mongoose = require( 'mongoose' );
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var logger = require( 'morgan' );
var authenticate = require( './authenticate' );

mongoose.connect( config.mongoUrl );
var db = mongoose.connection;

db.on( 'error', console.error.bind( console, 'connection error: ' ) );
db.once( 'open', function () {
	console.log( 'connected' );
} );

var routes = require( './routes/index' );
var userRouter = require( './routes/users' );
var commentRouter = require( './routes/comments' );
var igdbGamesRouter = require( './routes/igdb.games' );
var igdbCompaniesRouter = require( './routes/igdb.companies' );
var igdbGenresRouter = require( './routes/igdb.genres' );
var igdbPlatformsRouter = require( './routes/igdb.platforms' );
var igdbThemesRouter = require( './routes/igdb.themes' );

var app = express();

app.all( '*', function ( req, res, next ) {
	// if ( req.secure ) { return next(); }
	next();
} );

app.use( logger( 'dev' ) );
app.use( bodyParser.json() );
app.use( bodyParser.urlencoded( { extended: false } ) );
app.use( cookieParser() );

app.use( passport.initialize() );

app.use( express.static( path.join( __dirname, 'public' ) ) );

app.use( '/api', routes );
app.use( '/api/users', userRouter );
app.use( '/api/comments', commentRouter );
app.use( '/api/igdb/games', igdbGamesRouter );
app.use( '/api/igdb/companies', igdbCompaniesRouter );
app.use( '/api/igdb/genres', igdbGenresRouter );
app.use( '/api/igdb/platforms', igdbPlatformsRouter );
app.use( '/api/igdb/themes', igdbPlatformsRouter );

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if ( app.get( 'env' ) === 'development' ) {
  app.use( function ( err, req, res, next ) {
    res.status( err.status || 500 );
    res.json( {
      message: err.message,
      error: err
    } );
  } );
}

// production error handler
// no stacktraces leaked to user
app.use( function ( err, req, res, next ) {
  res.status( err.status || 500 );
  res.json( {
    message: err.message,
    error: {}
  } );
} );

module.exports = app;