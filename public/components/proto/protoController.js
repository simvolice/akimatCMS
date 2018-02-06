/**
 * Created by Admin on 29.09.2016.
 */

angular.module('app').controller('protoCtrl', function (Getallcharts, Getalloptions, Getallpages,Getalltable, CheckadminpageService, $scope, $state, $ocLazyLoad, $timeout) {

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


        let arrResult = [];


        for (let obj of result.resultFromDB) {
            arrResult.push(obj.title)


            for (let obj1 of obj.childItem) {
                arrResult.push(obj1)
            }


        }

        $scope.allpages = arrResult;


    });






    /* $ocLazyLoad.load($scope.nameModule);





     $scope.$on('ocLazyLoad.fileLoaded', function(e, module) {


         for (var i = 0; i < 3; i++) {

             testTest($scope.data, $scope.idElem, "Тестовый компонент очень большрй текст пипец", [2016, 2017, 2018]);

         }



     });*/






$scope.parameters = [];





});

