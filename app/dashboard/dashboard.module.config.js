/**
 * Created by Haiyi on 1/18/2017.
 */
'use strict';

angular.module('myApp.dashboard', [
    'ui.router',
    'myApp.employee',
    'myApp.task',
    'myApp.department',
    'dashboardService',
    'taskService',
    'employeeService',
    'departmentService',
    'ui.bootstrap'

    // 'infinite-scroll',
    // 'angularSpinner',
    // 'jcs-autoValidate',
    // 'angular-ladda',
    // 'mgcrea.ngStrap',
    // 'toaster',
    // 'ngAnimate'
]);

angular.module('myApp.dashboard').config(routeConfig);
function routeConfig($stateProvider) {
    $stateProvider.state('dashboard', {
        url: '/dashboard',
        views: {
            content: {
                templateUrl: 'dashboard/dashboard.html',
                controller: 'DashboardController',
                controllerAs: 'dashboardVM'
            }
        }
    });
    // $stateProvider.state('dashboard.weather', {
    //     url: '/weather',
    //     views: {
    //         weather: {
    //             templateUrl: 'dashboard/dash.weather.html',
    //             controller: 'WeatherController',
    //             controllerAs: 'weatherVm'
    //         }
    //     }
    // })
}

// angular.module('myApp.dashboard').config(dashConfig);
// function dashConfig(laddaProvider, $datepickerProvider) {
//     laddaProvider.setOption({
//         style: 'expand-right'
//     });
//     angular.extend($datepickerProvider.defaults, {
//         animation: 'am-flip-x',
//         dateFormat: 'dd/MM/yyyy'
//         // autoClose: true
//     })
// }