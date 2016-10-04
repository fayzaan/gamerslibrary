angular.module( 'app.factories' )
	.factory( '$apiUsers', [ 'config', '$q', '$http', function ( config, $q, $http ) {
		var $scope = {};

		$scope.get = function ( params ) {
			if ( params.search == '' ) { delete params.search; }
			var req = {
				method: 'GET',
				url: 'api/user',
				params: params
			};

			var rest = $http( req ).then( function ( res ) {
				return res.data;
			}, function ( res ) {
				console.log( 'get.user.failed', res );
			} );

			return $q.when( rest );
		};

		$scope.create = function ( params ) {
			if ( !params ) { return; }
			var req = {
				method: 'POST',
				'url': '/api/users',
				data: params
			};

			var rest = $http( req ).then( function ( res ) {
				console.log( '$apiUsers.create.success', res );
				return res.data;
			}, function ( err ) {
				console.log( '$apiUsers.create.failed', err );
			} );

			return $q.when( rest );
		};

		$scope.login = function ( params ) {
			if ( !params ) { return; }
			var req = {
				method: 'POST',
				url: '/api/users/login',
				data: params
			};

			var rest = $http( req ).then( function ( res ) {
				console.log( '$apiUsers.login.success', res );
				return res.data;
			}, function ( err ) {
				console.log( '$apiUsers.login.failed', err );
			} );

			return $q.when( rest );
		};

		$scope.logout = function () {
			var req = {
				method: 'GET',
				url: '/api/users/logout',
				params: {}
			};

			var rest = $http( req ).then( function ( res ) {
				console.log( '$apiUsers.logout.success', res );
				return res.data;
			}, function ( err ) {
				console.log( '$apiUsers.logout.failed', err );
			} );

			return $q.when( rest );
		}

		return $scope;
} ] );