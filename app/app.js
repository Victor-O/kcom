
angular.module('kcom', ['ui.router'])
  .config(function ($stateProvider, $urlRouterProvider) {

    // For any unmatched url, redirect to /
    $urlRouterProvider.otherwise('/pence');

    // States
    $stateProvider
      .state('pence', {
        url: '/pence',
        templateUrl: 'components/pence/pence.html',
        controller: 'PenceController',
        controllerAs: 'vm'
      })
  });
