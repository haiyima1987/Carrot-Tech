/**
 * Created by Haiyi on 1/22/2017.
 */
angular.module('myApp.department').directive('deptInfo', deptInfo);

function deptInfo() {
    return {
        transclude: true,
        restrict: 'EA',
        templateUrl: 'template/dept.info.html',
        scope: {
            dept: '='
        },
        controller: DeptInfoController,
        controllerAs: 'deptInfoVm',
        bindToController: true
    };
}

DeptInfoController.$inject = ['employeeService'];
function DeptInfoController(employeeService) {
    var deptInfoVm = this;
    deptInfoVm.empData = employeeService;
    deptInfoVm.getSelectedEmps = getSelectedEmps;

    function getSelectedEmps(ids) {
        var idArray = [];
        angular.forEach(ids, function (elem) {
            idArray.push(parseInt(elem.id));
        });
        return deptInfoVm.empData.getSelectedEmps(idArray);
    }
}