/**
 * Created by Admin on 29.09.2016.
 */

angular.module('app').controller('protoCtrl', function (GetallTabs, SendNewTabName, GetAllpost, Deleteonepost, GetGosProgramm, Getallcharts, Getalloptions, Getallpages,Getalltable, CheckadminpageService, $scope, $state, $http, $mdToast, $element) {






$scope.saveGosProgramm = function () {



    GetGosProgramm.save({

        Pasport: $scope.programPasport,
        Description: $scope.programmDescription,
        NameDev: $scope.programmNameDev,
        Target: $scope.programmTarget,
        TargetIndicator: $scope.programmTargetIndicator,
        ActionPlan: $scope.programmActionPlan,
        DescriptionAction: $scope.programmDescriptionAction,
        FinansAction: $scope.programmFinansAction,
        TargetDescrIndicator: $scope.programmTargetDescrIndicator,
        DimicIndicator: $scope.programmDimicIndicator

    }, function (result) {


        $mdToast.show(
            $mdToast.simple()
                .textContent('Вы успешно загрузили объект.')
                .position('left bottom')
                .hideDelay(3000)
        );




    });
}




    $scope.parameters = [];
    $scope.allTabs = [];

    $scope.searchTerm;
    $scope.searchTermPost;
    $scope.selectdemoSelectHeader;


    $scope.clearSearchTerm = function() {
        $scope.searchTerm = '';
    };


    $scope.clearSearchTermPost = function () {
        $scope.searchTermPost = '';
    };


    $scope.clearSearchTermTab = function() {
        $scope.selectdemoSelectHeader = '';
    };

    $element.find('input').on('keydown', function(ev) {
        ev.stopPropagation();
    });



    $scope.createNewTab = function (event) {
        if (event.keyCode === 13) {


            SendNewTabName.save({tabName: $scope.newTabName}, function (result) {



                if (result.code === 0) {



                    $scope.allTabs.push(result.resultFromDB);



                } else {

                    $mdToast.show(
                        $mdToast.simple()
                            .textContent('Операция закончилась НЕУДАЧНО. Измените данные для ввода.')
                            .position('bottom left')
                            .hideDelay(6000)
                    );


                }




            });


        }

    };


    CheckadminpageService.save({sessionToken: localStorage.getItem("sessionToken")}, function (result) {


        if (result.code === 1){

            $state.go("login");

        }


    });


    Getallcharts.get(function (result) {


        $scope.allCharts = result.resultFromDB;


    });


    GetallTabs.get(function (result) {



        $scope.allTabs = result.resultFromDB;


    });


    GetAllpost.get(function (result) {


        $scope.getAllpost = result.resultFromDB;


    });



    $scope.deletePost = function () {
       Deleteonepost.save({id: $scope.postsSelect}, function (result) {


           GetAllpost.get(function (result) {


               $scope.getAllpost = result.resultFromDB;


           });


           $mdToast.show(
               $mdToast.simple()
                   .textContent('Вы успешно удалили пост.')
                   .position('left bottom')
                   .hideDelay(3000)
           );



       })
    };





    $scope.changeTable = function () {
        Getalltable.get(function (result) {




            $scope.alltabels = result.resultFromDB;


        });
    };





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
        formdata.append('typediagramm', $scope.typediagramm);
        formdata.append('tabName', $scope.tabSelect);


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
                    $("#filenamecvs").text(null);
                    $mdToast.show(
                        $mdToast.simple()
                            .textContent('Вы успешно загрузили объект.')
                            .position('left bottom')
                            .hideDelay(3000)
                    );



                } else {

                    formdata = new FormData();
                    document.getElementById("cvsfile").value = null;
                    $("#filenamecvs").text(null);
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

