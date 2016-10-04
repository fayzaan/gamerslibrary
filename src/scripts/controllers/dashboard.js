angular.module( 'app.controllers' )
	.controller( 'dashboard', [ '$scope', function ( $scope ) {
		$scope.search = '';

		$scope.find = function ( search ) {
			console.log( 'search for ' + search );
			$scope.search = search;
		};

} ] );