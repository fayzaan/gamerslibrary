angular.module( 'app.factories' )
	.factory( '$apiCompanies', [ 'config', '$q', '$http', function ( config, $q, $http ) {
		var $scope = {};

		$scope.get = function ( params ) {
			if ( !params ) { params = {}; }

			var req = {
				method: 'GET',
				url: 'api/companies/',
				params: params
			};

			var ret = $http( req ).then( function ( res ) {
				console.log( 'apiCompanies.get.success', res );
				return res.data;
			}, function ( res ) {
				console.log( 'apiCompanies.get.failed', res );
			} );

			return $q.when( ret );
		};

		return $scope;
} ] )