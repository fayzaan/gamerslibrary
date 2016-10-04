angular.module( 'app.factories' )
	.factory( '$makeUser', [ '$rootScope', '$apiUsers', '$q', '$modal', '$session', function ( $rootScope, $apiUsers, $q, $modal, $session ) {
		var $scope = $rootScope.$new();

		$scope.modal = null;
		$scope.user = {};
		var deferred;

		$scope.open = function ( data ) {
			$scope.modal = $modal( { scope: $scope, templateUrl: 'views/modals/make.user.html', show: true, backdrop: 'static' } );
			deferred = $q.defer();
			return deferred.promise;
		};

		$scope.save = function ( form ) {
			console.log( 'save form', $scope.user );
			$apiUsers.create( $scope.user ).then( function ( res ) {
				console.log( '$makeUser.save.success', res );
				deferred.resolve( { success: true, data: form } );
			}, function ( err ) {
				console.log( '$makeUser.save.failed', err );
			} );
		};

		$scope.login = function ( form ) {
			$apiUsers.login( $scope.user ).then( function ( res ) {
				console.log( '$makeUser.login.success', res );
				$session.setToken( res.user, res.token );
				$scope.modal.$promise.then( $scope.modal.hide );
				deferred.resolve( { success: true } );
			}, function ( err ) {
				deferred.resolve( { success: false } );
				console.log( '$makeUser.login.failed', err );
			} );
		};

		return $scope;
} ] );