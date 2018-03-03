/**
 * Created by Admin on 29.09.2016.
 */



angular.module('app').controller('dynamicPageCtrl', function ($sce, $scope, $stateParams, $http) {






    $http({
        method : "GET",
        url : "/getonepost?id=" + $stateParams.id
    }).then(function mySuccess(response) {


        $scope.data = response.data.resultFromDb;




        $scope.iframepowerbi = $sce.trustAsHtml($scope.data.iframepowerbi);



    }, function myError(response) {




    });










});

