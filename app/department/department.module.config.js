/**
 * Created by Haiyi on 1/20/2017.
 */
'use strict';

angular.module('myApp.department', [
    'ui.router',
    'departmentService',
    'infinite-scroll',
    'angularSpinner',
    'jcs-autoValidate',
    'angular-ladda',
    'mgcrea.ngStrap',
    'toaster',
    'ngAnimate'
]);

angular.module('myApp.department').config(routeConfig);

function routeConfig($stateProvider, $urlRouterProvider) {
    $stateProvider.state('department', {
        url: '/department',
        views: {
            content: {
                templateUrl: 'department/department.html',
                controller: 'DepartmentController',
                controllerAs: 'deptVm'
            }
        }
    });
    $stateProvider.state('deptEdit', {
        url: '/deptEdit?id&isCreate',
        views: {
            content: {
                templateUrl: 'department/dept.edit.html',
                controller: 'DeptDetailController',
                controllerAs: 'deptDetailVm'
            }
        }
    });
}

angular.module('myApp.department').config(taskConfig);
function taskConfig(laddaProvider, $datepickerProvider) {
    laddaProvider.setOption({
        style: 'expand-right'
    });
    angular.extend($datepickerProvider.defaults, {
        animation: 'am-flip-x',
        dateFormat: 'dd/MM/yyyy'
        // autoClose: true
    })
}