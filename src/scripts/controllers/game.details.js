angular.module( 'app.controllers' )
	.controller( 'gameDetails', [ '$scope', '$routeParams', '$http', '$sce', '$apiGames', '$apiCompanies', '$apiPlatforms', '$apiGenres', '$apiThemes', '$q', '$apiPerspectives',
		function ( $scope, $routeParams, $http, $sce, $apiGames, $apiCompanies, $apiPlatforms, $apiGenres, $apiThemes, $q, $apiPerspectives ) {

		$scope.game = {};
		$scope.companies = {};
		$scope.platforms = {};
		$scope.genres = {};
		$scope.themes = {};
		$scope.suggestions = {};
		$scope.perspectives = {};
		$scope.gameBg = '';

		$scope.getGame = function ( slug ) {
			$apiGames.getGameBySlug( slug ).then( function ( res ) {
				$scope.game = res.data[ 0 ];
				console.log( 'getGame.success', $scope.game );
				$scope.setBg();
				$scope.getCompanies( angular.merge( $scope.game.developers, $scope.game.publishers ) );
				var plats = $scope.game.release_dates.map( function ( item ) { return item.platform; } );
				$scope.getPlatforms( plats );
				$scope.getGenres( $scope.game.genres );
				if ( $scope.game.themes && $scope.game.themes.length ) {
					$scope.getThemes( $scope.game.themes );
				}
				$scope.getSuggestions( $scope.game.genres, $scope.game.themes );
			} );
		};

		$scope.getCompanies = function ( arr ) {
			$apiCompanies.get( { companies: arr, fields: '*' } ).then( function ( res ) {
				$scope.companies = {};
				angular.forEach( res, function ( company ) { $scope.companies[ company.id ] = company; } );
			} );
		};

		$scope.getPlatforms = function ( arr ) {
			$apiPlatforms.get( { publishers: arr, fields: 'slug' } ).then( function ( res ) { $scope.platforms = res; } );
		};

		$scope.getGenres = function ( arr ) {
			$apiGenres.get( { genres: arr, fields: 'name,slug' } ).then( function ( res ) {
				$scope.genres = {};
				angular.forEach( res, function ( genre ) { $scope.genres[ genre.id ] = genre; } );
			} );
		};

		$scope.getThemes = function ( arr ) {
			$apiThemes.get( { themes: arr, fields: 'name,slug' } ).then( function ( res ) {
				$scope.themes = {};
				angular.forEach( res, function ( theme ) { $scope.themes[ theme.id ] = theme; } );
			} );
		};

		$scope.getSuggestions = function ( genres, themes ) {
			$q.all( [ $apiGames.getGames( { themes: themes, fields: 'name,slug,genres,themes,release_dates,screenshots', limit: 10 } ), $apiGames.getGames( { genres: genres, fields: 'name,slug,genres,themes', limit: 10 } ) ] ).then( function ( res ) {
				console.log( 'getSuggestions.then.res', res );
				var games = [].concat.apply( [], [ res[ 0 ].data, res[ 1 ].data ] );
				var slugs = [];
				slugs.push( $scope.game.slug );
				$scope.suggestions = games.filter( function ( game ) {
					var res = ( slugs.indexOf( game.slug ) === -1 );
					if ( res ) { slugs.push( game.slug ); }
					return res;
				} ).sort( function ( a, b ) {
					return ( matchCount( themes, a.themes ) + matchCount( genres, a.genres ) ) > ( matchCount( themes, b.themes ) + matchCount( genres, b.genres ) ) ? -1 : 1;
				} );
				console.log( 'getSuggestions.then', $scope.suggestions );
			}, function ( res ) {
				console.log( 'getSuggestions.err', res );
			} );
		};

		function matchCount ( arr, compArr ) {
			if ( !arr || !compArr ) { return 0; }
			var count = 0;
			for ( var i = 0; i < arr.length; i++ ) {
				var item = arr[ i ];
				if ( compArr.indexOf( item ) !== -1 ) { count++ }
			}
			return count;
		}

		$scope.setBg = function () {
			if ( !$scope.game || !$scope.game.screenshots || !$scope.game.screenshots.length ) { return '' };
			var index = Math.floor( Math.random() * $scope.game.screenshots.length );
			$scope.gameBg = 'https://res.cloudinary.com/igdb/image/upload/' + $scope.game.screenshots[ index ].cloudinary_id + '.jpg';
		};

		$scope.formatPlatform = function ( platform ) {
			var _map = { 'xboxone': 'XBOX ONE', 'ps4--1': 'PS4', 'wiiu': 'WII U', 'win': 'PC', 'ps': 'PS', 'psp': 'PSP', 'ios': 'IOS', 'android': 'ANDROID', 'psn': 'PSN', 'mac': 'MAC', 'linux': 'LINUX', 'n64': 'N64', 'xbox360': 'XBOX360', '3ds': '3DS', 'sms': 'SMS', 'gamegear': 'GAMEGEAR' };
			return _map[ platform.slug ] || platform.slug;
		};

		$scope.getRatingStyle = function ( rating ) {
			if ( !rating ) { return 'label-default'; }
			if ( rating > 80 ) { return 'label-success'; }
			if ( rating > 60 ) { return 'label-info'; }
			if ( rating > 40 ) { return 'label-warning'; }
			return 'label-danger';
		};

		$scope.isReleased = function ( releaseDate ) {
			var now = new Date();
			return releaseDate < now;
		};

		$scope.exists = function ( obj ) {
			if ( angular.isUndefined( obj ) ) { return false; }
			if ( Array.isArray( obj ) ) { return obj.length > 0; }
			return ( angular.isDefined( obj ) && Object.keys( obj ) && Object.keys( obj ).length > 0 );
			return false;
		};

		$scope.init = function () {
			$scope.getGame( $routeParams.id );
		};

		$scope.init();
} ] );