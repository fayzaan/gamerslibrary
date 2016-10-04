angular.module( 'app.directives' )
	.directive( 'gamesSlideShow', [ '$http', '$location', '$apiGames', '$apiGenres', function ( $http, $location, $apiGames, $apiGenres ) {
		var controller = function ( config, $scope ) {
			console.log( 'gamesSlideShow.controller', config );

			$scope.games = [];
			$scope.genres = [];

			$scope.load = function ( search ) {

				$apiGames.getGames(	{ fields: 'name,genres,cover,slug,screenshots,hypes', limit: 50, order: 'hypes:desc' } ).then( function ( res ) {
					$scope.games = $scope.sortBy( res.data, 'hypes' );
				}, function ( err ) {
					console.log( 'gamesSlideShow.load.getGames.failed', err );
				} );

				$apiGenres.get( { fields: 'name', limit: 50 } ).then( function ( res ) {
					$scope.genres = $scope.cleanGenres( res );
				}, function ( err ) {
					console.log( 'gameSlideShow.getGenres.success', res );
				} );
			};

			$scope.sortBy = function ( arr, type, order ) {
				return arr.sort( function ( a, b ) {
					return ( a[ type ] < b[ type ] ) ? 1 : -1;
				} );
			};

			$scope.cleanGenres = function ( genres ) {
				var result = {};
				genres.forEach( function ( genre ) {
					result[ genre.id ] = genre;
				} );
				return result;
			};

			$scope.goTo = function ( slug ) {
				$location.path( '/game/' + slug );
			};

			$scope.load();
		};

		controller.$inject = [ 'config', '$scope' ];

		return {
			restrict: 'EA',
			templateUrl: 'views/templates/games.slide.show.html',
			scope: {
				games: '=games'
			},
			controller: controller,
			link: function ( scope, element, attrs, transclude ) {}
		};
} ] );