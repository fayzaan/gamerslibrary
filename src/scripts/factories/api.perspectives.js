angular.module( 'app.factories' )
	.factory( '$apiPerspectives', [ 'config', '$q', '$http', function ( config, $q, $http ) {
		var $scope = {};

		$scope.get = function ( params ) {
			params = params ? params : {};
			var gameid = params.genres ? params.genres.toString() : '';
			// delete params.genres;

			var req = {
				method: 'GET',
				url: 'https://igdbcom-internet-game-database-v1.p.mashape.com/player_perspectives/?filter[games][eq]=2114',
				headers: {
					'Accept': 'application/json',
					'X-Mashape-Key': 'CeNfVf5s3pmshwMD4R3WpqhBxAnAp15jEUjjsnYfi3T7sGOwKF'
				},
				params: { fields: '*' }
			};

			var ret = $http( req ).then( function ( res ) {
				console.log( '$apiPerspectives.get.success', res );
				return res.data;
			}, function ( res ) {
				console.log( '$apiPerspectives.get.failed', res );
			} );

			return $q.when( ret );
		};

		return $scope;
} ] );