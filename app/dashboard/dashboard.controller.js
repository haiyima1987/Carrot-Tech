/**
 * Created by Haiyi on 11/25/2016.
 */
angular.module('myApp.dashboard').controller('DashboardController', DashboardController);
function DashboardController(dashboardService, taskService, departmentService, employeeService) {
    var dashboardVm = this;
    dashboardVm.empSearch = {};
    dashboardVm.deptSearch = {};
    dashboardVm.taskSearch = {};
    dashboardVm.newsData = dashboardService;
    dashboardVm.taskData = taskService;
    dashboardVm.deptData = departmentService;
    dashboardVm.empData = employeeService;
    dashboardVm.updateSelectedTasks = updateSelectedTasks;
    dashboardVm.updateSelectedDepts = updateSelectedDepts;
    dashboardVm.updateSelectedEmps = updateSelectedEmps;
    dashboardVm.parentFindDept = parentFindDept;

    function updateSelectedTasks() {
        dashboardVm.taskData.updateSelectedTasks();
    }

    function updateSelectedDepts() {
        dashboardVm.deptData.updateSelectedDepts();
    }

    function updateSelectedEmps() {
        dashboardVm.empData.updateSelectedEmps();
    }

    function parentFindDept(id) {
        return dashboardVm.deptData.findDept(id);
    }
}

// angular.module('myApp.dashboard').controller('WeatherController', WeatherController);
// function WeatherController(dashboardService) {
//     var weatherVm = this;
//     weatherVm.dashData = dashboardService;
//
//     weatherVm.call = function () {
//         console.log('called');
//         weatherVm.dashData.getWeather();
//     };
//
//     console.log('inside weather');
// }