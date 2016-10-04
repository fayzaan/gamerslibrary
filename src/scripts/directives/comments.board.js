angular.module( 'app.directives' )
	.directive( 'commentsBoard', [ 'config', '$apiComments', function ( config, $apiComments ) {
		var controller = function ( config, $scope ) {

			$scope.form = {
				comment: ''
			};
			
			$scope.load = function () {
				$scope.getComments( $scope.gameid );
			};

			$scope.getComments = function ( gameid ) {
				$apiComments.get( { gameid: gameid } ).then( function ( res ) {
					console.log( 'CommentsBoard.getComments.success', res );
					$scope.comments = res[ 0 ].comments;
				}, function ( err ) {
					console.log( 'CommentsBoard.getComments.failed', err );
				} );
			};

			$scope.saveComment = function () {
				$apiComments.create( {
					comment: $scope.form.comment,
					gameid: $scope.gameid,
					slug: $scope.slug,
					name: $scope.name
				} ).then( function ( res ) {
					console.log( 'saveComment.res', res );
				}, function ( err ) {
					console.log( 'saveComment.err', err );
				} );
			};

		};

		controller.$inject = [ 'config', '$scope' ];

		return {
			restrict: 'A',
			templateUrl: 'views/templates/comments.board.html',
			scope: {
				comments: '=comments',
				gameid: '=gameid',
				slug: '=slug',
				name: '=name'
			},
			controller: controller,
			link: function ( scope, element, attrs, transclude ) {
				scope.load();

				scope.$watch( 'gameid', function ( newValue, oldValue ) {
					if ( newValue != oldValue ) {
						$scope.load();
					}
				} );
			}
		};
} ] );