/**
 * Created by Admin on 29.09.2016.
 */

angular.module('app').controller('protoCtrl', function (GetGosProgramm, Getallcharts, Getalloptions, Getallpages,Getalltable, CheckadminpageService, $scope, $state, $http, $mdToast, $element) {




$scope.saveGosProgramm = function () {
    GetGosProgramm.save({

        title: $scope.titleGosProgramm,
        description: $scope.descriptionGosProgramm,
        fullDescription: $scope.fullDescriptionGosProgramm

    }, function (result) {




    });
}




    $scope.parameters = [];

    $scope.searchTerm;


    $scope.clearSearchTerm = function() {
        $scope.searchTerm = '';
    };

    $element.find('input').on('keydown', function(ev) {
        ev.stopPropagation();
    });

    CheckadminpageService.save({sessionToken: localStorage.getItem("sessionToken")}, function (result) {


        if (result.code === 1){

            $state.go("login");

        }


    });


    Getallcharts.get(function (result) {


        $scope.allCharts = result.resultFromDB;


    });




    $scope.changeTable = function () {
        Getalltable.get(function (result) {




            $scope.alltabels = result.resultFromDB;


        });
    };



    Getalltable.get(function (result) {




        $scope.alltabels = result.resultFromDB;


    });

    Getallpages.get(function (result) {




        $scope.allpages = result.resultFromDB[0];


    });





    var formdata = new FormData();
    $scope.getTheFiles = function ($files) {

        if($files.length <= 1)
        {
            $("#labelForFile").text($files[0].name);
        }
        else {
            $("#labelForFile").text("Выбрано файлов: " + $files.length);
        }

        angular.forEach($files, function (value, key) {
            formdata.append(key, value);
        });
    };


    $scope.uploadFiles = function () {




        formdata.append('title', $scope.title);
        formdata.append('tabels', $scope.tabels);
        formdata.append('pages', $scope.pages);
        formdata.append('parameters', $scope.parameters);
        formdata.append('description', $scope.description);
        formdata.append('chartModel', $scope.chartModel);


        var request = {
            method: 'POST',
            url: '/addpost',
            data: formdata,
            headers: {
                'Content-Type': undefined
            }
        };

        // SEND THE FILES.
        $http(request)
            .then(function successCallback(response) {


                if (response.data.code === 0){




                    formdata = new FormData();
                    document.getElementById("file").value = null;

                    $mdToast.show(
                        $mdToast.simple()
                            .textContent('Вы успешно загрузили объект.')
                            .position('left bottom')
                            .hideDelay(3000)
                    );



                } else {

                    formdata = new FormData();
                    document.getElementById("file").value = null;
                    $mdToast.show(
                        $mdToast.simple()
                            .textContent('Операция закончилась не удачно, попробуйте изменить данные.')
                            .position('left bottom')
                            .hideDelay(3000)
                    );

                }






            }, function errorCallback(response) {
                formdata = new FormData();
                document.getElementById("file").value = null;
                $mdToast.show(
                    $mdToast.simple()
                        .textContent('Операция закончилась не удачно, попробуйте изменить данные.')
                        .position('left bottom')
                        .hideDelay(3000)
                );
            });
    }





    $scope.getTheFilesCVS = function ($files) {

        if($files.length <= 1)
        {
            $("#filenamecvs").text($files[0].name);
        }
        else {
            $("#filenamecvs").text("Выбрано файлов: " + $files.length);
        }

        angular.forEach($files, function (value, key) {
            formdata.append(key, value);
        });
    };



    $scope.uploadFilesCVS = function () {





        var request = {
            method: 'POST',
            url: '/addcvs',
            data: formdata,
            headers: {
                'Content-Type': undefined
            }
        };

        // SEND THE FILES.
        $http(request)
            .then(function successCallback(response) {


                if (response.data.code === 0){




                    formdata = new FormData();
                    document.getElementById("cvsfile").value = null;

                    $mdToast.show(
                        $mdToast.simple()
                            .textContent('Вы успешно загрузили объект.')
                            .position('left bottom')
                            .hideDelay(3000)
                    );



                } else {

                    formdata = new FormData();
                    document.getElementById("cvsfile").value = null;
                    $mdToast.show(
                        $mdToast.simple()
                            .textContent('Операция закончилась не удачно, попробуйте изменить данные.')
                            .position('left bottom')
                            .hideDelay(3000)
                    );

                }






            }, function errorCallback(response) {
                formdata = new FormData();
                document.getElementById("file").value = null;
                $mdToast.show(
                    $mdToast.simple()
                        .textContent('Операция закончилась не удачно, попробуйте изменить данные.')
                        .position('left bottom')
                        .hideDelay(3000)
                );
            });
    }





});

