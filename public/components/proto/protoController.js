/**
 * Created by Admin on 29.09.2016.
 */

angular.module('app').controller('protoCtrl', function (Allmenus, SaveMenu, Deleteonetable, DeleteOneUsers, AddUsers, UpdateUsers, GetallUsers, Getallroles, GetAllpost, Deleteonepost, Getalltable, CheckadminpageService, $scope, $state, $http, $mdToast, $element, $mdDialog, Addpost) {

    CheckadminpageService.save({sessionToken: localStorage.getItem("sessionToken")}, function (result) {


        if (result.code === 1){

            $state.go("login");

        }


    });




    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }

    function removeFromTree(parent, childNameToRemove){
        parent.childs = parent.childs
            .filter(function(child){ return child.uniqKey !== childNameToRemove})
            .map(function(child){ return removeFromTree(child, childNameToRemove)});
        return parent;
    }






    function flattenTree(root, key) {
        let flatten = [Object.assign({}, root)];
        delete flatten[0][key];

        if (root[key] && root[key].length > 0) {
            return flatten.concat(root[key]
                .map((child)=>flattenTree(child, key))
                .reduce((a, b)=>a.concat(b), [])
            );
        }

        return flatten;
    };



    $scope.menusFlat = [];
    $scope.menus = [];

    Allmenus.get({sessionToken: localStorage.getItem("sessionToken")},function (result) {






        if (result.resultFromDb.length !== 0) {

            $scope.menus = result.resultFromDb[0].menuArr;

            for (let itemMenu of $scope.menus) {


                $scope.menusFlat.push(flattenTree(itemMenu, "childs"))


            }


            $scope.menusFlat = $scope.menusFlat.reduce(function (prev, curr) {
                return [...prev, ...curr];
            });

            $scope.selectedItem = $scope.menusFlat[0].uniqKey;

        }




    });




    $scope.addSecondItemMenu = function (childsArr) {

        childsArr.push({title: "Укажите название раздела", childs: [], uniqKey: getRandomInt(0, 1000000)});




    };


    $scope.addNewMenu = function () {
        $scope.menus.push({title: "Укажите название раздела", id: 1, childs: [], uniqKey: getRandomInt(0, 1000000)});

    };




    $scope.deleteItemMenu = function (uniqKey, id) {


       if (id === 1) {


           $scope.menus = $scope.menus
               .filter(function(child){ return child.uniqKey !== uniqKey})

       } else {



           let clearArr = [];


           for (let itemOneMenuObj of $scope.menus) {
               let tempArr = itemOneMenuObj;


               clearArr.push(removeFromTree(tempArr, uniqKey));

               tempArr = [];

           }


           $scope.menus = clearArr;


           clearArr = [];

       }




    };


    $scope.saveMenu = function () {


        SaveMenu.save({menus: $scope.menus, sessionToken: localStorage.getItem("sessionToken")}, function (result) {

            if (result.code === 0) {

                $mdToast.show(
                    $mdToast.simple()
                        .textContent('Операция закончилась успешно')
                        .position('left bottom')
                        .hideDelay(3000)
                );


            } else {


                $mdToast.show(
                    $mdToast.simple()
                        .textContent('У Вас нет прав на эту операцию')
                        .position('left bottom')
                        .hideDelay(3000)
                );


            }

        })



    };







    $scope.searchTerm;
    $scope.searchTermPost;
    $scope.selectedItem;


    $scope.clearSearchTerm = function() {
        $scope.searchTerm = '';
    };


    $scope.clearSearchTermPost = function() {
        $scope.searchTermPost = '';
    };



    $scope.savePost = function () {

        Addpost.save({sessionToken: localStorage.getItem("sessionToken"), iframepowerbi: $scope.iframepowerbi, menuUniqueKey: $scope.selectedItem, titlepost: $scope.titlepost}, function (result) {

            if (result.code === 0) {

                $mdToast.show(
                    $mdToast.simple()
                        .textContent('Операция закончилась успешно')
                        .position('left bottom')
                        .hideDelay(3000)
                );


            } else {


                $mdToast.show(
                    $mdToast.simple()
                        .textContent('Операция закончилась неудачно')
                        .position('left bottom')
                        .hideDelay(3000)
                );

            }

        })


    };











    GetAllpost.get({sessionToken: localStorage.getItem("sessionToken")},function (result) {

        $scope.allpost = result.resultFromDB;


    });



    $scope.openSelectPost = function () {
        GetAllpost.get({sessionToken: localStorage.getItem("sessionToken")}, function (result) {

            $scope.allpost = result.resultFromDB;


        });
    };

    $scope.deletePost = function () {

       Deleteonepost.save({sessionToken: localStorage.getItem("sessionToken"), id: $scope.selectedPost}, function (result) {


           if (result.code === 0) {

               GetAllpost.get(function (result) {

                   $scope.allpost = result.resultFromDB;


               });

               $mdToast.show(
                   $mdToast.simple()
                       .textContent('Операция закончилась успешно')
                       .position('left bottom')
                       .hideDelay(3000)
               );


           } else {

               GetAllpost.get(function (result) {

                   $scope.allpost = result.resultFromDB;


               });


               $mdToast.show(
                   $mdToast.simple()
                       .textContent('Операция закончилась неудачно')
                       .position('left bottom')
                       .hideDelay(3000)
               );

           }


       });

    };























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
                'Content-Type': undefined,
                'sessionToken': localStorage.getItem("sessionToken")
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


    GetallUsers.get({sessionToken: localStorage.getItem("sessionToken")}, function (resultAllUsers) {

        Getallroles.get({sessionToken: localStorage.getItem("sessionToken")}, function (resultAllRoles) {

            $scope.data = resultAllUsers.resultFromDB;


            for (let objOneUser of $scope.data) {
               objOneUser["allRoles"] = resultAllRoles.resultFromDB;
               objOneUser["newPass"] = "";

            }





        });




    });


    
    
    
    $scope.deleteUser = function (id, index) {
        DeleteOneUsers.save({sessionToken: localStorage.getItem("sessionToken"), _id: id}, function (result) {



            if(result.code === 0) {


                $scope.data.splice(index, 1);


                $mdToast.show(
                    $mdToast.simple()
                        .textContent('Операция закончилась успешно')
                        .position('left bottom')
                        .hideDelay(3000)
                );
            } else {


                $mdToast.show(
                    $mdToast.simple()
                        .textContent('У Вас нет прав на эту операцию')
                        .position('left bottom')
                        .hideDelay(3000)
                );



            }


        })
    };


    $scope.updateUser = function (data) {



        if (data._id === 0){

            AddUsers.save({

                sessionToken: localStorage.getItem("sessionToken"),
                name: data.name,
                roleId: data.roleId,
                newPass: data.newPass




            }, function (result) {



                if (result.code === 0) {


                    $scope.data[$scope.data.length-1]._id = result.resultFromDB;






                    $mdToast.show(
                        $mdToast.simple()
                            .textContent('Операция закончилась успешно')
                            .position('left bottom')
                            .hideDelay(3000)
                    );


                } else {


                    $mdToast.show(
                        $mdToast.simple()
                            .textContent('У Вас нет прав на эту операцию')
                            .position('left bottom')
                            .hideDelay(3000)
                    );


                }




            });


        } else {


            UpdateUsers.save({

                sessionToken: localStorage.getItem("sessionToken"),
                _id: data._id,

                name: data.name,
                roleId: data.roleId,
                newPass: data.newPass

            }, function (result) {



                if (result.code === 0) {

                    $mdToast.show(
                        $mdToast.simple()
                            .textContent('Операция закончилась успешно')
                            .position('left bottom')
                            .hideDelay(3000)
                    );


                } else {

                    $mdToast.show(
                        $mdToast.simple()
                            .textContent('У Вас нет прав на эту операцию')
                            .position('left bottom')
                            .hideDelay(3000)
                    );



                }


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




        Getallroles.get({sessionToken: localStorage.getItem("sessionToken")}, function (result) {



            tempObj.allRoles = result.resultFromDB;

        });






        $scope.data.push(tempObj);



    };


    Getalltable.get({sessionToken: localStorage.getItem("sessionToken")}, function (result) {




        $scope.dataTableName = result.resultFromDB;


    });



    $scope.deleteTable = function (tableName, index) {



        Deleteonetable.save({sessionToken: localStorage.getItem("sessionToken"), tableName: tableName}, function (result) {
            if (result.code === 0){


                Getalltable.get({sessionToken: localStorage.getItem("sessionToken")}, function (result) {




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



function DialogControllerUpd($scope, tableName, GetDataForOneTable, $ocLazyLoad, Insertnewdata) {


    $ocLazyLoad.load("assets/css/handsontable.full.min.css");



    $scope.tableName = tableName;





    GetDataForOneTable.save({sessionToken: localStorage.getItem("sessionToken"), tableName: tableName}, function (result) {

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



        Handsontable.hooks.add("afterChange", function(changes){



            Insertnewdata.save({sessionToken: localStorage.getItem("sessionToken"), tableName: $scope.tableName, changes: changes}, function (result) {
                if(result.code === 0) {




                    $mdToast.show(
                        $mdToast.simple()
                            .textContent('Операция закончилась успешно')
                            .position('left bottom')
                            .hideDelay(3000)
                    );
                } else {


                    $mdToast.show(
                        $mdToast.simple()
                            .textContent('У Вас нет прав на эту операцию')
                            .position('left bottom')
                            .hideDelay(3000)
                    );



                }

            })

        }, hot);





    });




















        $scope.closeDialog = function () {
            $mdDialog.hide();
            $scope.dataObject = [];
        }



    }






function DialogControllerHelp($scope) {


        $scope.closeDialog = function () {
            $mdDialog.hide();
        }

    }



});

