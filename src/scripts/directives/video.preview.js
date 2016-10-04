angular.module( 'app.directives' )
	.directive( 'videoPreview', [ function () {
		var controller = function ( config, $scope, $sce ) {
			console.log( 'videoPreview.controller', config );

			// $scope.videos = [];
			$scope.selected = {};

			$scope.init = function () {
				if ( angular.isDefined( $scope.videos ) && $scope.videos.length ) {
					$scope.selected = $scope.videos[ 0 ];
				}
			};

			$scope.selectVideo = function ( video ) {
				$scope.selected = video;
			};

			$scope.getURL = function ( type, id ) {
				return $sce.trustAsResourceUrl( 'https://www.youtube.com/embed/' + id );
			};
		};

		controller.$inject = [ 'config', '$scope', '$sce' ];

		return {
			restrict: 'EA',
			templateUrl: 'views/templates/videos.preview.html',
			scope: {
				'videos': '=videos'
			},
			controller: controller,
			link: function ( scope, element, attrs, transclude ) {
				scope.$watch( 'videos', function ( newValue, oldValue ) {
					scope.init();
				} );
			}
		};
} ] );