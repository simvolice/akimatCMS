/**
 * Created by Admin on 29.09.2016.
 */

angular.module('app').controller('protoCtrl', function (Getallcharts, Getalloptions, Getallpages,Getalltable, CheckadminpageService, $scope, $state, $ocLazyLoad, $timeout) {


    $scope.parameters = [];



    CheckadminpageService.save({sessionToken: localStorage.getItem("sessionToken")}, function (result) {


        if (result.code === 1){

            $state.go("login");

        }


    });


    Getallcharts.get(function (result) {


        $scope.allCharts = result.resultFromDB;


    });


    $scope.$watch('chartModel', function(newval) {
        console.log(newval);
    });




    Getalltable.get(function (result) {


        $scope.alltabels = result.resultFromDB;


    });

    Getallpages.get(function (result) {




        $scope.allpages = result.resultFromDB;


    });


















});

