angular.module( 'app.directives' )
	.directive( 'navbar', [ '$session', '$rootScope', '$http', '$location', '$timeout', '$q', '$apiGames', '$makeUser', '$apiUsers',
		function ( $session, $rootScope, $http, $location, $timeout, $q, $apiGames, $makeUser, $apiUsers ) {
			var controller = function ( config, $scope, $element, $attrs, $transclude ) {
				console.log( 'navbar.controller' );

				$scope.searchTimeout = false;
				var typeahead = $timeout( function () { return []; }, 200 );

				$scope.makeUser = function () {
					$makeUser.open().then( function ( res ) {
						console.log( '$makeUser.success', res );
						if ( res.success ) {
							console.log( 'set.user', $session.getUser() );
							$scope.user = $session.getUser();
						}
						console.log( '$makeUser.then', res );
					}, function ( err ) {
						console.log( '$makeUser.error', err );
					} );
				};

				$scope.logout = function () {
					$apiUsers.logout();
					$session.logout();
					$scope.user = {};
				};

				$scope.getGames = function ( search ) {
					console.log( 'search for ' + search );
					return $apiGames.getGames( { fields: 'name,slug', limit: 5, search: search } ).then( function ( res ) {
						return res.data;
					}, function ( err ) {
						console.log( 'navbar.getGames.error', err );
						return [];
					} );
				};

				$scope.typeahead = function ( query ) {
					$timeout.cancel( typeahead );
					typeahead = $timeout( function () {
						return $scope.getGames( query );
					}, 200 );
					return typeahead;
				}

				$scope.goTo = function ( game ) {
					$location.path( '/game/' + game );
				};

				$scope.init = function () {
					console.log( 'init.getUser', $session.getUser() );
					$scope.user = $session.getUser();
				};
			};

			controller.$inject = [ 'config', '$scope', '$element', '$attrs', '$transclude' ];

			return {
				restrict: 'EA',
				templateUrl: '/views/templates/navbar.html',
				transclude: true,
				scope: {
					pageid: '=pageid'
				},
				replace: true,
				controller: controller,
				link: function ( scope, element, attrs, controller ) {
					scope.init();
				}
			};
} ] );