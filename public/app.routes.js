/**
 * Created by Admin on 29.09.2016.
 */



app.config(function($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise('/main');

  $stateProvider


      .state('index', {
        url: '/',
        view: {

          templateUrl: 'index.html'

        }

      })

      .state('login', {
        url: '/login',
        templateUrl: 'components/login/loginView.html',


      })


      .state('main', {
          url: '/main',
          templateUrl: 'components/main/mainView.html',


      })


      .state('proto', {
          url: '/proto',
          templateUrl: 'components/proto/proto.html'

      })

      .state('dynamicpage', {
          url: '/dynamicpage',
          templateUrl: 'components/dynamicpage/dynamicView.html'

      })

      .state('gosProgrammType1Ctrl', {
          url: '/gosprogrammtype1',
          templateUrl: 'components/gosProgrammType1/gosProgrammType1.html'

      })
      .state('gosProgrammType2Ctrl', {
          url: '/gosprogrammtype2ctrl',
          templateUrl: 'components/gosProgrammType2/gosProgrammType2.html'

      })



});