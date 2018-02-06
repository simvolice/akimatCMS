/**
 * Created by Admin on 29.09.2016.
 */


angular.module('app').factory("CheckadminpageService", function($resource) {
    return $resource("/checkadminpage");
});

angular.module('app').factory("Getalltable", function($resource) {
    return $resource("/getalltable");
});

angular.module('app').factory("Getallpages", function($resource) {
    return $resource("/getallpages");
});

angular.module('app').factory("Getalloptions", function($resource) {
    return $resource("/getalloptions");
});

angular.module('app').factory("Getallcharts", function($resource) {
    return $resource("/getallcharts");
});