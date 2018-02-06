/**
 * Created by Admin on 29.09.2016.
 */



angular.module('app').controller('LoginCtrl', function ($scope, SendAuth, $mdToast, $state, $rootScope) {





  $scope.loginClk = function () {


      SendAuth.save({name: $scope.name, pass: $scope.pass}, function (result) {

          if (result.code === 1) {

              $mdToast.show(
                  $mdToast.simple()
                      .textContent('Не удается войти.\n' +
                          'Пожалуйста, проверьте правильность написания email и пароля.')
                      .position('bottom left')
                      .hideDelay(3000)
              );


          } else {



              localStorage.setItem("sessionToken", result.sessionToken);
              $state.go("proto");


          }


      });









  };

});

