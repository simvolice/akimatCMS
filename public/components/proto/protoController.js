/**
 * Created by Admin on 29.09.2016.
 */

angular.module('app').controller('protoCtrl', function (Getallcharts, Getalloptions, Getallpages,Getalltable, CheckadminpageService, $scope, $state, $http, $mdToast, $timeout) {


    $scope.parameters = [];




    CheckadminpageService.save({sessionToken: localStorage.getItem("sessionToken")}, function (result) {


        if (result.code === 1){

            $state.go("login");

        }


    });


    Getallcharts.get(function (result) {


        $scope.allCharts = result.resultFromDB;


    });






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













});

