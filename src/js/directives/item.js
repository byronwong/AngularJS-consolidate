app.directive('item', function () {
    return {
        restrict: 'E',
        replace: true,
        templateUrl: './templates/item.html',
        scope: {
            mess:'=mess',
            a:'&up',
            b:'&down',
            c:'=count'
        },
        controller: function($scope, vote){
            console.log($scope.mess);
            console.log(vote.message);
        },
    }
});