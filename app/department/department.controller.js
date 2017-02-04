'use strict';

angular.module('myApp.department').controller('DepartmentController', DepartmentController);

function DepartmentController($scope, $modal, $state, departmentService) {
    // // local variables and fetch data
    var deptVm = this;
    deptVm.data = departmentService;
    deptVm.selectedDept = null;
    deptVm.search = {};
    deptVm.order = "id";
    deptVm.isCreate = false;

    deptVm.selectDept = selectDept;
    deptVm.showViewModal = showViewModal;

    function selectDept(dept) {
        deptVm.selectedDept = dept;
    }

    function showViewModal(dept) {
        deptVm.data.selectedDept = dept;
        createModal();
    }

    function createModal() {
        deptVm.createModal = $modal({
            scope: $scope,
            templateUrl: 'template/modal.viewDept.tpl.html',
            show: true
        });
    }
}

angular.module('myApp.department').controller('DeptDetailController', DeptDetailController);
function DeptDetailController($scope, $stateParams, $state, departmentService) {
    var deptDetailVm = this;
    deptDetailVm.data = departmentService;
    // deptDetailVm.employeeIds = [];
    deptDetailVm.mode = mode;
    deptDetailVm.save = save;
    deptDetailVm.remove = remove;
    deptDetailVm.addOneEmp = addOneEmp;
    deptDetailVm.removeOneEmp = removeOneEmp;

    mode();

    function mode() {
        if ($stateParams.isCreate == 'true') {
            deptDetailVm.isCreate = true;
            deptDetailVm.data.selectedDept = {
                "name": "", "phone": "", "address": "", "description": "", "employees": []
            };
        } else {
            deptDetailVm.isCreate = false;
            deptDetailVm.data.selectedDept = deptDetailVm.data.findDept($stateParams.id);
            // deptDetailVm.employeeIds = deptDetailVm.data.selectedDept.employees;
        }
    }

    function save() {
        if (deptDetailVm.isCreate) {
            deptDetailVm.data.createDept(deptDetailVm.data.selectedDept).then(function () {
                $state.go('department');
            });
        } else {
            deptDetailVm.data.updateDept(deptDetailVm.data.selectedDept).then(function () {
                $state.go('department');
            });
        }
    }

    function remove() {
        deptDetailVm.data.removeDept(deptDetailVm.data.selectedDept).then(function () {
            $state.go('department');
        });
    }

    function addOneEmp() {
        deptDetailVm.data.selectedDept.employees.push({ id: ''});
    }

    function removeOneEmp(id) {
        var ids = deptDetailVm.data.selectedDept.employees;
        for (var i = 0; i < ids.length; i++) {
            if (ids[i].id == id) {
                ids.splice(i, 1);
                break;
            }
        }
    }
}