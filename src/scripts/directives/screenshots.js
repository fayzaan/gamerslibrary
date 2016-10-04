angular.module( 'app.directives' )
	.directive( 'screenshotPreview', [ function () {
		var controller = function ( config, $scope ) {
			console.log( 'screenshotPreview.controller', config );

			// $scope.screenshots = [];
			$scope.selected = {};

			$scope.init = function () {
				if ( angular.isDefined( $scope.screenshots ) && $scope.screenshots.length ) {
					$scope.selected = $scope.screenshots[ 0 ];
				}
			};

			$scope.selectImage = function ( image ) {
				$scope.selected = image;
			};
		};

		controller.$inject = [ 'config', '$scope' ];

		return {
			restrict: 'EA',
			templateUrl: 'views/templates/screenshot.preview.html',
			scope: {
				'screenshots': '=screenshots'
			},
			controller: controller,
			link: function ( scope, element, attrs, transclude ) {
				scope.$watch( 'screenshots', function ( newValue, oldValue ) {
					console.log( 'screenshots.$watch', newValue, oldValue );
					scope.init();
				} );
			}
		};
} ] );