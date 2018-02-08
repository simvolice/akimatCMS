/**
 * Created by Admin on 29.09.2016.
 */



angular.module('app').controller('dynamicPageCtrl', function ($scope, $ocLazyLoad, $stateParams, $http) {


    $scope.data = [];

    $http({
        method : "GET",
        url : "/dynamicpage?id=" + $stateParams.id
    }).then(function mySuccess(response) {
        $scope.data = response.data.resultFromDB;
    }, function myError(response) {
        $scope.data = response.statusText;
    });

     /*$ocLazyLoad.load();




      $scope.$on('ocLazyLoad.fileLoaded', function(e, module) {


          for (var i = 0; i < 1; i++) {

              generateChart(arr, chartId, "Тестовый компонент очень большрй текст пипец", [2016, 2017, 2018]);

          }



      });
*/






});

