'use strict';

var apl = angular.module('apiapp', [
        'ngResource',
        'LocalStorageModule'
    ]
);

apl.controller('MainCtrl', function($scope, localStorageService, GetMovie){

    var actors;
    var sameAct;
    var director;
    var sameDir;

    $scope.getData = function(thatMovie){

        if ( thatMovie.Actors ) {
            var actorsArr = thatMovie.Actors.split(',');

            angular.forEach(actorsArr, function(value) {
              this.push(value.trim());
            }, actors);
            actors.sort();

        }

        if ( thatMovie.Director ) {
            var directorArr = thatMovie.Director.split(',');

            angular.forEach(directorArr, function(value) {
              this.push(value.trim());
            }, director);
            director.sort();
        }
    }


    $scope.searchMovie = function(first, second){

        actors = [];
        sameAct = [];

        director = [];
        sameDir = [];

        $scope.cast = GetMovie.get({movie: first}).$promise.then(function(movieDetail){

            $scope.getData(movieDetail);

        
            GetMovie.get({movie: second}).$promise.then(function(movieDetail){

                $scope.getData(movieDetail);


                for(var i = 0; i <= actors.length - 1; i++){
                    if ( actors[i] === actors[ i + 1 ]) {
                        sameAct.push(actors[i]);
                    }
                }

                if ( sameAct.length ) {
                    $scope.sameActors = sameAct;
                } else {
                    $scope.sameActors = false;
                }


                for(var i = 0; i <= director.length - 1; i++){
                    if ( director[i] === director[ i + 1 ] ) {
                        sameDir.push(director[i]);
                    }
                }

                if ( sameDir.length ) {
                    $scope.sameDir = sameDir;
                } else {
                    $scope.sameDir = false;
                }


                if ( $scope.sameDir === false && $scope.sameActors === false ) {
                    setTimeout(function(){
                        alert('no common cast');
                    }, 200);
                }


                $scope.goStorage(first, second);

            });
        });



    } // end: searchMovie()


    $scope.required = true;

    $scope.noHits = function(){

        if ( $scope.sameDir === false && $scope.sameActors === false ) {
            return true;
        }
        
    }


    $scope.goStorage = function(movie1, movie2){

        var newmovies = {
                'firstMovie': movie1,
                'secondMovie': movie2
        };

        var oldmovies = localStorageService.get('lastmovies') || [];
        if ( oldmovies.length > 5 ) {
            oldmovies.pop();
            oldmovies.pop();
        }

        var kelp = [];

        angular.forEach( newmovies, function(key, value){
            this.push( key );
        }, kelp );

        var lastmovies = kelp.concat(oldmovies);

        localStorageService.set('lastmovies', lastmovies);
        $scope.getStorage();

    }


    $scope.getStorage = function() {

        $scope.showStorage = localStorageService.get('lastmovies'); 

    }

});

apl.factory('GetMovie', function($resource){
    return $resource('http://www.omdbapi.com/?t=:movie', {movie: '@movie'});
});


// helpers

if ( typeof String.prototype.trim !== 'function' ) {
    String.prototype.trim = function() {
        return this.replace(/^\s+|\s+$/g, ''); 
    }
}

// end: helpers