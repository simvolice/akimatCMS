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
          url: '/post/:id/:url',
          templateUrl: 'components/dynamicpage/dynamicView.html'



      })







});