/**
 * Created by Admin on 29.09.2016.
 */


angular.module('app').factory("CheckadminpageService", function($resource) {
    return $resource("/checkadminpage");
});

angular.module('app').factory("Getalltable", function($resource) {
    return $resource("/getalltable");
});



angular.module('app').factory("Deleteonepost", function($resource) {
    return $resource("/deleteonepost");
});


angular.module('app').factory("GetAllpost", function($resource) {
    return $resource("/getallpost");
});


angular.module('app').factory("Addpost", function($resource) {
    return $resource("/addpost");
});









angular.module('app').factory("Getallroles", function($resource) {
    return $resource("/getallroles");
});


angular.module('app').factory("GetallUsers", function($resource) {
    return $resource("/getallusers");
});

angular.module('app').factory("UpdateUsers", function($resource) {
    return $resource("/updateusers");
});


angular.module('app').factory("AddUsers", function($resource) {
    return $resource("/adduser");
});


angular.module('app').factory("DeleteOneUsers", function($resource) {
    return $resource("/deleteoneusers");
});


angular.module('app').factory("Deleteonetable", function($resource) {
    return $resource("/deleteonetable");
});


angular.module('app').factory("GetDataForOneTable", function($resource) {
    return $resource("/getdatafrommssql");
});


angular.module('app').factory("Insertnewdata", function($resource) {
    return $resource("/insertnewdata");
});


angular.module('app').factory("SaveMenu", function($resource) {
    return $resource("/savemenu");
});


angular.module('app').factory("Allmenus", function($resource) {
    return $resource("/allmenus");
});