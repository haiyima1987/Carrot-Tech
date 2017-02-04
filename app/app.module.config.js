/**
 * Created by Haiyi on 11/25/2016.
 */
'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
    // 'ngRoute',
    'ui.router',
    // 'ngResource',
    'myApp.dashboard',
    'myApp.task',
    'myApp.department',
    'myApp.employee',
    'myApp.calendar'
    // 'myApp.weather'
    // 'taskService',
    // 'ui.calendar',
    // 'ui.bootstrap',
    // 'calendarDemoApp'
]);

// angular.module('myApp.dashboard', ['ngRoute', 'taskService']);

angular.module('myApp').config(myAppConfig);

function myAppConfig($stateProvider, $urlRouterProvider) {
    // $urlRouterProvider.when('/calendar', function () {
    //     $state.go('calendar');
    // });
    // $routeProvider.when('/calendar', {
    //     templateUrl: 'components/calendar/calendar.bak.html',
    //     controller: 'CalendarController'
    // });
    $urlRouterProvider.otherwise('/dashboard');
}

// function myAppConfig($locationProvider, $routeProvider) {
//
//     $locationProvider.hashPrefix('!');
//
//     // $routeProvider.when('/dashboard', {
//     //     templateUrl: 'dashboard/dashboard.html',
//     //     controller: 'DashboardController'
//     // });
//     // $routeProvider.when('/task', {
//     //     templateUrl: 'task/task.html',
//     //     controller: 'TaskController'
//     // });
//     // $routeProvider.when('/department', {
//     //     templateUrl: 'department/department.html',
//     //     controller: 'departmentCtrl'
//     // });
//     // $routeProvider.when('/employee', {
//     //     templateUrl: 'employee/employee.html',
//     //     controller: 'employeeCtrl'
//     // });
//     // $routeProvider.when('/calendar', {
//     //     templateUrl: 'calendar/calendar.bak.html',
//     //     controller: 'CalendarController'
//     // });
//     // $routeProvider.otherwise('/dashboard', {
//     //     templateUrl: 'dashboard/dashboard.html',
//     //     controller: 'DashboardController'
//     // });
//     $routeProvider.otherwise({
//         redirectTo: '/employee'
//     });
// }

// angular.module('myApp.dashboard').config(dashboardConfig);
//
// function dashboardConfig($routeProvider) {
//     $routeProvider.when('/dashboard', {
//         templateUrl: 'dashboard/dashboard.html',
//         controller: 'DashboardController'
//     })
// }