/**
 * Created by Haiyi on 12/15/2016.
 */
'use strict';

angular.module('myApp.employee', [
    // 'ngRoute',
    'ui.router',
    'employeeService',
    'infinite-scroll',
    'angularSpinner',
    'jcs-autoValidate',
    'angular-ladda',
    'mgcrea.ngStrap',
    // 'ui.bootstrap',
    'toaster',
    'ngAnimate'
]);

angular.module('myApp.employee').config(routeConfig);
function routeConfig($stateProvider, $urlRouterProvider) {
    $stateProvider.state('employee', {
        url: '/employee',
        views: {
            content: {
                templateUrl: 'employee/employee.html',
                controller: 'EmployeeController',
                controllerAs: 'empVm'
            }
            // search: {
            //     templateUrl: 'template/search.form.html',
            //     controller: 'EmployeeController',
            //     controllerAs: 'empVm'
            // }
        }
    });
    $stateProvider.state('empEdit', {
        url: '/empEdit?email&isCreate',
        views: {
            content: {
                templateUrl: 'employee/emp.edit.html',
                controller: 'EmpDetailController',
                controllerAs: 'empDetailVm'
            }
        }
    });
}

angular.module('myApp.employee').config(employeeConfig);
function employeeConfig(laddaProvider, $datepickerProvider) {
    laddaProvider.setOption({
        style: 'expand-right'
    });
    angular.extend($datepickerProvider.defaults, {
        animation: 'am-flip-x',
        dateFormat: 'dd/MM/yyyy'
        // autoClose: true
    })
}