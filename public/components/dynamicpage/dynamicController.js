/**
 * Created by Admin on 29.09.2016.
 */



angular.module('app').controller('dynamicPageCtrl', function ($scope, $ocLazyLoad, $stateParams) {




   var arr = [
        ["data1", 30, 50, 40, 80, 110],
        ["data2", 50, 40, 30, 20, 10]
    ];

   var chartId = "chartDonut";

     $ocLazyLoad.load("chartsComponents/donutChartComponent.js");
     $ocLazyLoad.load("chartsComponents/barChartComponent.js");
     $ocLazyLoad.load("chartsComponents/lineChartComponent.js");
     $ocLazyLoad.load("chartsComponents/pieChartComponent.js");





      $scope.$on('ocLazyLoad.fileLoaded', function(e, module) {


          for (var i = 0; i < 1; i++) {

              generateChart(arr, chartId, "Тестовый компонент очень большрй текст пипец", [2016, 2017, 2018]);

          }



      });







});

