/**
 * Created by Admin on 29.09.2016.
 */



angular.module('app').controller('dynamicPageCtrl', function ($scope, $ocLazyLoad, $stateParams, $http, $timeout) {


    $scope.data = [];


    $scope.titlePage = $stateParams.titlePage;

    $http({
        method : "GET",
        url : "/dynamicpage?id=" + $stateParams.id
    }).then(function mySuccess(response) {
        $scope.data = response.data.resultFromDB;

        for (let itemData of $scope.data) {
            $ocLazyLoad.load(itemData.chartUrltoScript);

            $scope.$on('ocLazyLoad.fileLoaded', function(e, module) {




                    generateChart(itemData.data, itemData.idElem, itemData.titleCharts, itemData.categ)




            });



        }

    }, function myError(response) {
        $scope.data = response.statusText;
    });











});

