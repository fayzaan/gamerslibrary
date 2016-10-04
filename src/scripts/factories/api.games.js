angular.module( 'app.factories' )
	.factory( '$apiGames', [ 'config', '$q', '$http', function ( config, $q, $http ) {
		var $scope = {};

		$scope.getGames = function ( params ) {
			if ( params.search == '' ) { delete params.search; }
			var req = {
				method: 'GET',
				url: 'api/igdb/games/',
				params: params
			};

			var rest = $http( req ).then( function ( res ) {
				return res.data;
			}, function ( res ) {
				console.log( 'getGames.failed', res );
			} );

			return $q.when( rest );
		};

		$scope.getGameBySlug = function ( slug ) { return $scope.getGames( { slug: slug, fields: '*', limit: 1 } ); };

		return $scope;
} ] )