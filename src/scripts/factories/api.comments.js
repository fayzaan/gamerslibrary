angular.module( 'app.factories' )
	.factory( '$apiComments', [ 'config', '$q', '$http', function ( config, $q, $http ) {
		var $scope = {};

		$scope.get = function ( params ) {
			var req = {
				method: 'GET',
				url: 'api/comments/',
				params: params
			};

			var rest = $http( req ).then( function ( res ) {
				console.log( '$apiComments.get.success', res );
				return res.data;
			}, function ( res ) {
				console.log( '$apiComments.get.failed', res );
			} );

			return $q.when( rest );
		};

		$scope.create = function ( params ) {
			var req = {
				method: 'POST',
				url: 'api/comments',
				data: params
			};

			var rest = $http( req ).then( function ( res ) {
				console.log( '$apiComments.create.success', res );
				return res.data;
			}, function ( err ) {
				console.log( '$apiComments.create.failed', err );
			} );

			return $q.when( rest );
		};

		return $scope;
} ] );