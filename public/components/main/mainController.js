/**
 * Created by Admin on 29.09.2016.
 */



angular.module('app').controller('HomePageCtrl', function ($scope, $state) {


    $scope.goTo = function () {

        $("#budgetsidebar").css("display", "block");
        $state.go("budget");
    }







});

