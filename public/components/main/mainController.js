/**
 * Created by Admin on 29.09.2016.
 */



angular.module('app').controller('HomePageCtrl', function ($scope, $state) {


    $scope.goTo = function () {

        $("#budgetsidebar").css("display", "block");
        $state.go("budget");
    }


    $scope.getColorBody = function () {



        $("body").css("background", $scope.colorbody);
        $("md-content>.row").css("background", $scope.colorbody);
    }




    $scope.getColorCard = function (idEl) {

        $(idEl).css("background", $scope.colorbodyForCard);


    }




});

