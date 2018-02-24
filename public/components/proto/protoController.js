/**
 * Created by Admin on 29.09.2016.
 */

angular.module('app').controller('protoCtrl', function (Deleteonetable, DeleteOneUsers, AddUsers, UpdateUsers, GetallUsers, Getallroles, GetallTabs, SendNewTabName, GetAllpost, Deleteonepost, GetGosProgramm, Getallcharts, Getalloptions, Getallpages,Getalltable, CheckadminpageService, $scope, $state, $http, $mdToast, $element, $mdDialog) {






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
        formdata.append('iframepowerbi', $scope.iframepowerbi);


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


        $scope.uploadFilesCVS();
    };



    $scope.uploadFilesCVS = function () {





        var request = {
            method: 'POST',
            url: '/addexcel',
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



                    Getalltable.get(function (result) {




                        $scope.dataTableName = result.resultFromDB;


                    });




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

    $scope.data = [];


    GetallUsers.get(function (resultAllUsers) {

        Getallroles.get(function (resultAllRoles) {

            $scope.data = resultAllUsers.resultFromDB;


            for (let objOneUser of $scope.data) {
               objOneUser["allRoles"] = resultAllRoles.resultFromDB;
               objOneUser["newPass"] = "";

            }





        });




    });


    
    
    
    $scope.deleteUser = function (id, index) {
        DeleteOneUsers.save({_id: id}, function (result) {


            $scope.data.splice(index, 1);


            $mdToast.show(
                $mdToast.simple()
                    .textContent('Операция закончилась успешно')
                    .position('left bottom')
                    .hideDelay(3000)
            );
        })
    };


    $scope.updateUser = function (data) {



        if (data._id === 0){

            AddUsers.save({


                name: data.name,
                roleId: data.roleId,
                newPass: data.newPass




            }, function (result) {




                $scope.data[$scope.data.length-1]._id = result.resultFromDB;




                $mdToast.show(
                    $mdToast.simple()
                        .textContent('Операция закончилась успешно')
                        .position('left bottom')
                        .hideDelay(3000)
                );

            });


        } else {


            UpdateUsers.save({


                _id: data._id,

                name: data.name,
                roleId: data.roleId,
                newPass: data.newPass

            }, function (result) {

                $mdToast.show(
                    $mdToast.simple()
                        .textContent('Операция закончилась успешно')
                        .position('left bottom')
                        .hideDelay(3000)
                );

            });


        }











    };



    $scope.addUsers = function () {


        let tempObj = {


            _id: 0,
            allRoles: [],
            roleId: "",
            name: "",
            newPass: ""


        };




        Getallroles.get(function (result) {



            tempObj.allRoles = result.resultFromDB;

        });






        $scope.data.push(tempObj);



    };


    Getalltable.get(function (result) {




        $scope.dataTableName = result.resultFromDB;


    });



    $scope.deleteTable = function (tableName, index) {



        Deleteonetable.save({tableName: tableName}, function (result) {
            if (result.code === 0){


                Getalltable.get(function (result) {




                    $scope.dataTableName = result.resultFromDB;


                });


                $mdToast.show(
                    $mdToast.simple()
                        .textContent('Вы успешно удалили объект.')
                        .position('left bottom')
                        .hideDelay(3000)
                );



            } else {

                $mdToast.show(
                    $mdToast.simple()
                        .textContent('Операция закончилась не удачно, попробуйте изменить данные.')
                        .position('left bottom')
                        .hideDelay(3000)
                );


            }
        })
    }
    
    
    $scope.editTable = function (tableName, ev) {

        $mdDialog.show({
            controller: DialogControllerUpd,
            locals:{tableName: tableName},
            templateUrl: 'components/proto/dialog_tpl.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose:true,
            fullscreen: true // Only for -xs, -sm breakpoints.
        });
        
    };

function DialogControllerUpd($scope, tableName, GetDataForOneTable, $ocLazyLoad, Insertnewdata) {


    $ocLazyLoad.load("assets/css/handsontable.full.min.css");



$scope.tableName = tableName;


GetDataForOneTable.save({tableName: tableName}, function (result) {

    $scope.dataObject = result.resultFromDB;



    let columnName = Object.keys($scope.dataObject[0]);







    var hotElement = document.querySelector('#hot');
    var hotElementContainer = hotElement.parentNode;
    var hotSettings = {
        data: $scope.dataObject,
        stretchH: 'all',
        width: "100%",
        autoWrapRow: true,
        height: 487,
        manualRowResize: true,
        manualColumnResize: true,
        rowHeaders: true,
        colHeaders: columnName,
        manualRowMove: true,
        manualColumnMove: true,
        className: "htRight"

    };
    var hot = new Handsontable(hotElement, hotSettings);




});


    Handsontable.hooks.add("afterChange", function(changes){

        console.log(changes);

        Insertnewdata.save({tableName: $scope.tableName, changes: changes}, function (result) {
            console.log(result);
        })

    });


















        $scope.closeDialog = function () {
            $mdDialog.hide();
            $scope.dataObject = [];
        }



    }




    $scope.showHelp = function (ev) {
        $mdDialog.show({
            controller: DialogControllerHelp,
            locals:{},
            templateUrl: 'components/proto/dialog_help.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose:true,
            fullscreen: true // Only for -xs, -sm breakpoints.
        });
    };


    function DialogControllerHelp($scope) {


        $scope.closeDialog = function () {
            $mdDialog.hide();
        }

    }



});

