app.controller('indexController', ['$scope','vote', function ($scope, vote) {

    $scope.message = vote.message;



    $scope.currentCount = 0

    $scope.upVote = function () {
        $scope.currentCount++;
    };

    $scope.downVote = function () {
        $scope.currentCount--;
    };

}]);