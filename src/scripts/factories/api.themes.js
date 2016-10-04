angular.module( 'app.factories' )
	.factory( '$apiThemes', [ 'config', '$q', '$http', function ( config, $q, $http ) {
		var $scope = {};

		$scope.get = function ( params ) {
			params = params ? params : {};
			var themes = params.themes ? params.themes.toString() : '';
			delete params.themes;

			var req = {
				method: 'GET',
				url: 'https://igdbcom-internet-game-database-v1.p.mashape.com/themes/' + themes,
				headers: {
					'Accept': 'application/json',
					'X-Mashape-Key': 'CeNfVf5s3pmshwMD4R3WpqhBxAnAp15jEUjjsnYfi3T7sGOwKF'
				},
				params: params || { fields: '*' }
			};

			var ret = $http( req ).then( function ( res ) {
				console.log( '$apiThemes.get.success', res );
				return res.data;
			}, function ( res ) {
				console.log( '$apiThemes.get.failed', res );
			} );

			return $q.when( ret );
		};

		return $scope;
} ] );