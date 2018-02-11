/**
 * Created by Admin on 29.09.2016.
 */



angular.module('app').controller('dynamicPageCtrl', function ($scope, $ocLazyLoad, $stateParams, $http) {


    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }


    $scope.data = [];


    $scope.titlePage = localStorage.getItem("title");

    $http({
        method : "GET",
        url : "/dynamicpage?id=" + localStorage.getItem("idPage")
    }).then(function mySuccess(response) {



        $scope.data = response.data.resultFromDB;




            $ocLazyLoad.load("chartsComponents/ChartComponent.js?v=" + getRandomInt(1, 1000000));

            $scope.$on('ocLazyLoad.fileLoaded', function(e, module) {


                genParentChart($scope.data);


            });





    }, function myError(response) {



        $scope.data = response.statusText;




    });











});

