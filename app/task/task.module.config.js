/**
 * Created by Haiyi on 1/17/2017.
 */
'use strict';

angular.module('myApp.task', [
    // 'ngRoute',
    'ui.router',
    'myApp.dashboard',
    'taskService',
    'departmentService',
    'infinite-scroll',
    'angularSpinner',
    'jcs-autoValidate',
    'angular-ladda',
    'mgcrea.ngStrap',
    'toaster',
    'ngAnimate'
]);

angular.module('myApp.task').config(routeConfig);
function routeConfig($stateProvider, $urlRouterProvider) {
    $stateProvider.state('task', {
        url: '/task',
        views: {
            content: {
                templateUrl: 'task/task.html',
                controller: 'TaskController',
                controllerAs: 'taskVm'
                // resolve: {
                //     taskPrepService: function (taskService) {
                //         return taskService.getTasks();
                //     }
                // }
            }
        }
    });
    $stateProvider.state('taskEdit', {
        url: '/taskEdit?id&isCreate',
        views: {
            content: {
                templateUrl: 'task/task.edit.html',
                controller: 'TaskDetailController',
                controllerAs: 'taskDetailVm'
            }
        }
    });
}

angular.module('myApp.task').config(taskConfig);
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