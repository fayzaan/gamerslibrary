angular.module( 'app.factories' )
	.factory( '$session', [ 'config', '$http', function ( config, $http ) {
		console.log( '$session', config );
		var $scope = {
			user: {}
		};

		$scope.saveUserToStorage = function ( user, token ) {
			var obj = {
				gl: {
					user: user,
					token: token
				}
			};
			localStorage.setItem( 'gl', JSON.stringify( obj ) );
		};

		$scope.setUserFromStorage = function () {
			var obj = JSON.parse( localStorage.getItem( 'gl' ) );
			if ( obj && obj.gl && obj.gl.user ) {
				// $scope.user = obj.gl.user;
				$scope.setToken( obj.gl.user, obj.gl.token );
			}
		};
		
		$scope.setToken = function ( user, token ) {
			$http.defaults.headers.common[ 'x-access-token' ] = token;
			$scope.user = user;
			$scope.saveUserToStorage( user, token );
		};

		$scope.getUser = function () {
			if ( !$scope.user._id ) { $scope.setUserFromStorage(); }
			return $scope.user;
		};

		$scope.logout = function () {
			$scope.user = {};
			$scope.saveUserToStorage( {} );
		};

		return $scope;
} ] );