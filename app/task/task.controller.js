'use strict';

angular.module('myApp.task').controller('TaskController', TaskController);
// angular.module('myApp').controller('TaskController', TaskController);

function TaskController($scope, $modal, taskService) {
    // view model declaration and data retrieving from service
    // local variable declaration
    var taskVm = this;
    taskVm.data = taskService;
    taskVm.selectedTask = null;
    // search and select tasks
    taskVm.search = {};
    taskVm.order = "id";

    taskVm.selectTask = selectTask;
    taskVm.showViewModal = showViewModal;

    function selectTask(task) {
        taskVm.selectedTask = task;
    }

    function showViewModal(task) {
        taskVm.data.selectedTask = task;
        createModal();
    }

    function createModal() {
        taskVm.createModal = $modal({
            scope: $scope,
            templateUrl: 'template/modal.viewTask.tpl.html',
            show: true
        });
    }
}

angular.module('myApp.task').controller('TaskDetailController', TaskDetailController);
function TaskDetailController($scope, $stateParams, $state, taskService) {
    var taskDetailVm = this;
    taskDetailVm.data = taskService;
    taskDetailVm.mode = mode;
    taskDetailVm.save = save;
    taskDetailVm.remove = remove;
    taskDetailVm.addOneEmp = addOneEmp;
    taskDetailVm.removeOneEmp = removeOneEmp;

    mode();

    function mode() {
        if ($stateParams.isCreate == 'true') {
            taskDetailVm.isCreate = true;
            taskDetailVm.data.selectedTask = {
                "id": "", "title": "", "description": "", "status": "", "startsAt": "", "endsAt": "", "department": "", "employees": []
            };
        } else if ($stateParams.isCreate == 'false') {
            taskDetailVm.isCreate = false;
            taskDetailVm.data.selectedTask = taskDetailVm.data.findTask($stateParams.id);
        }
    }

    function save() {
        if (taskDetailVm.isCreate) {
            taskDetailVm.data.createTask(taskDetailVm.data.selectedTask).then(function () {
                $state.go('task');
            });
        } else {
            taskDetailVm.data.updateTask(taskDetailVm.data.selectedTask).then(function () {
                $state.go('task');
            });
        }
    }

    function remove() {
        taskDetailVm.data.removeTask(taskDetailVm.data.selectedTask).then(function () {
            $state.go('task');
        });
    }

    function addOneEmp() {
        taskDetailVm.data.selectedTask.employees.push({id: ''});
    }

    function removeOneEmp(id) {
        var ids = taskDetailVm.data.selectedTask.employees;
        for (var i = 0; i < ids.length; i++) {
            if (ids[i].id == id) {
                ids.splice(i, 1);
                break;
            }
        }
    }
}