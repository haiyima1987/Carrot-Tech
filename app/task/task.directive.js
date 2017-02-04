/**
 * Created by Haiyi on 1/21/2017.
 */
angular.module('myApp.task').directive('taskInfo', taskInfo);

function taskInfo() {
    var self = {
        transclude: true,
        restrict: 'EA',
        templateUrl: 'template/task.info.html',
        scope: {
            task: '='
        },
        link: TaskInfoLink,
        controller: TaskInfoController,
        controllerAs: 'taskInfoVm',
        bindToController: true
    };

    return self;

    function TaskInfoLink(scope, elem, attr, taskInfoVm) {}
}

TaskInfoController.$inject = ['employeeService', 'departmentService'];
function TaskInfoController(employeeService, departmentService) {
    var taskInfoVm = this;
    taskInfoVm.empData = employeeService;
    taskInfoVm.deptData = departmentService;
    taskInfoVm.getSelectedEmps = getSelectedEmps;
    taskInfoVm.getSelectedDept = getSelectedDept;

    function getSelectedEmps(ids) {
        var idArray = [];
        angular.forEach(ids, function (elem) {
            idArray.push(parseInt(elem.id));
        });
        return taskInfoVm.empData.getSelectedEmps(idArray);
    }

    function getSelectedDept(id) {
        return taskInfoVm.deptData.findDept(id);
    }
}