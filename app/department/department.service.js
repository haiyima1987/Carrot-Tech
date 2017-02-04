/**
 * Created by Haiyi on 1/20/2017.
 */
(function () {
    'use strict';

    angular.module('departmentService', [])
        .constant('departmentUrl', 'API/departments.json')
        .factory('departmentService', retrieveDepartmentData);

    function retrieveDepartmentData($http, $q, departmentUrl, toaster) {
        var self = {
            title: 'Department',
            isLoading: false,
            isSaving: false,
            isDeleting: false,
            selectedDept: null,
            selectedDepts: [],
            departments: [],
            search: null,
            order: 'id',
            findDept: findDept,
            getDepts: getDepts,
            createDept: createDept,
            removeDept: removeDept,
            updateDept: updateDept,
            updateSelectedDepts: updateSelectedDepts,
            getNewId: getNewId
        };

        getDepts();

        return self;

        function findDept(id) {
            var dept = null;
            angular.forEach(self.departments, function (elem) {
                if (elem.id == id) {
                    dept = elem;
                }
            });
            return dept;
        }

        function getDepts() {
            if (!self.isLoading) {
                self.isLoading = true;
                $http.get(departmentUrl).then(
                    function success(res) {
                        // console.log(res.data);
                        // tasks = res.data;
                        angular.forEach(res.data, function (elem) {
                            // this.employees.push(new employeeData(elem));
                            self.departments.push(elem);
                        });
                        self.isLoading = false;
                        // return tasks;
                    },
                    function error(err) {
                        return err;
                    }
                );
            }
            // return promise;
        }

        function createDept() {
            var department = self.selectedDept;
            var defer = $q.defer();
            self.isSaving = true;
            if (angular.isString(department.name) && angular.isString(department.description)) {
                var newDept = {
                    id: getNewId(),
                    name: department.name,
                    phone: department.phone,
                    address: department.address,
                    description: department.description,
                    employees: department.employees
                };
                console.log(newDept);
                self.departments.push(newDept);
                self.isSaving = false;
                defer.resolve();
                toaster.pop('success', 'Created ' + newDept.name);
            }
            else {
                console.log("Check if both fields are valid strings / not blank")
            }
            return defer.promise;
        }

        function removeDept(dept) {
            var departments = self.departments;
            var defer = $q.defer();
            self.isDeleting = true;
            for (var i = 0; i < departments.length; i++) {
                if (departments[i].id == dept.id) {
                    self.departments.splice(i, 1);
                    self.isDeleting = false;
                    toaster.pop('success', 'Deleted ' + dept.name);
                    defer.resolve();
                    break;
                }
            }
            return defer.promise;
        }

        function updateDept() {
            console.log('inside update');
            var departments = self.departments;
            var selectedDept = self.selectedDept;
            var defer = $q.defer();
            self.isSaving = true;
            for (var i = 0; i < departments.length; i++) {
                console.log('inside loop');
                if (departments[i].id == selectedDept.id) {
                    departments[i].name = selectedDept.name;
                    departments[i].phone = selectedDept.phone;
                    departments[i].address = selectedDept.address;
                    departments[i].description = selectedDept.description;
                    departments[i].employees = selectedDept.employees;
                    console.log(departments[i]);
                    self.isSaving = false;
                    toaster.pop('success', 'Updated ' + departments[i].name);
                    defer.resolve();
                    break;
                }
            }
            console.log('promise');
            return defer.promise;
        }

        function updateSelectedDepts() {
            var depts = [];
            angular.forEach(self.departments, function (elem) {
                if (elem.display) {
                    depts.push(elem);
                }
            });
            self.selectedDepts = depts;
        }

        function getNewId() {
            // return self.departments[self.departments.length - 1].id + 100;
            var max = Math.max.apply(Math, self.departments.map(function (elem) {
                    return elem.id;
                }));
            return max + 50;
        }
    }
})();