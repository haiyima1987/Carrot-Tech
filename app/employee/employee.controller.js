'use strict';

angular.module('myApp.employee').controller('EmployeeController', EmployeeController);
function EmployeeController($scope, $modal, employeeService) {
    var empVm = this;
    empVm.order = "name";
    empVm.search = "";
    empVm.warning = true;
    empVm.data = employeeService;
    empVm.loadMore = loadMore;

    function loadMore() {
        empVm.data.loadMore();
    }
}

angular.module('myApp.employee').controller('EmpDetailController', EmpDetailController);
function EmpDetailController($scope, $stateParams, $state, employeeService) {
    var empDetailVm = this;
    empDetailVm.data = employeeService;
    empDetailVm.mode = mode;
    empDetailVm.save = save;
    empDetailVm.remove = remove;

    mode();

    function mode() {
        // attention!! the type of parameters is string!!
        if ($stateParams.isCreate == 'true') {
            empDetailVm.isCreate = true;
            empDetailVm.data.selectedEmp = {};
        } else if ($stateParams.isCreate == 'false') {
            empDetailVm.isCreate = false;
            empDetailVm.data.selectedEmp = empDetailVm.data.findEmployee($stateParams.email);
        }
    }

    function save() {
        if (empDetailVm.isCreate) {
            empDetailVm.data.createEmployee(empDetailVm.data.selectedEmp).then(function () {
                $state.go('employee');
            });
        } else {
            empDetailVm.data.updateEmployee(empDetailVm.data.selectedEmp).then(function () {
                $state.go('employee');
            });
        }
    }

    function remove() {
        empDetailVm.data.removeEmployee(empDetailVm.data.selectedEmp).then(function () {
            $state.go('employee');
        });
    }
}

angular.module('myApp.employee').controller('EmpViewController', EmpViewController);
function EmpViewController($stateParams, $state, employeeService) {
    var empViewVm = this;
    empViewVm.data = employeeService;
    empViewVm.data.selectedEmp = empViewVm.data.findEmployee($stateParams.email);
}