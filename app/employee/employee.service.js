/**
 * Created by Haiyi on 12/14/2016.
 */
(function () {
    angular.module('employeeService', [
        'ngResource'
    ]);

    angular.module('employeeService').config(empServiceConfig);
    function empServiceConfig($httpProvider, $resourceProvider) {
        $httpProvider.defaults.headers.common['Authorization'] = 'Token f2803e7bc49d7b40815302bceb2b6091551c2e50';
        $resourceProvider.defaults.stripTrailingSlashes = false;
    }

    angular.module('employeeService').factory('empServiceData', empServiceData);
    function empServiceData($resource) {
        return $resource('https://api.codecraft.tv/samples/v1/contact/:id/',
            {
                id: '@id'
            },
            {
                update: {method: 'PUT'}
            }
        );
    }

    angular.module('employeeService')
        .constant('employeeUrl', 'API/employees.json')
        .service('employeeService', employeeService);
    employeeService.$inject = ['$http', '$q', '$rootScope', 'empServiceData', 'toaster', 'employeeUrl'];
    function employeeService($http, $q, $rootScope, empServiceData, toaster, employeeUrl) {

        var self = {
            title: 'Employee',
            page: 1,
            hasMore: true,
            isLoading: false,
            isSaving: false,
            isDeleting: false,
            selectedEmp: null,
            employees: [],
            allEmployees: [],
            selectedEmps: [],
            search: null,
            order: 'name',
            getEmployees: getEmployees,
            getAllEmployees: getAllEmployees,
            getSelectedEmps: getSelectedEmps,
            createEmployee: createEmployee,
            updateEmployee: updateEmployee,
            removeEmployee: removeEmployee,
            findEmployee: findEmployee,
            updateSelectedEmps: updateSelectedEmps,
            loadMore: loadMore,
            watchFilters: watchFilters,
            doSearch: doSearch,
            doOrder: doOrder
        };

        self.getEmployees();
        self.getAllEmployees();
        self.watchFilters();

        return self;

        function getEmployees() {
            if (self.hasMore && !self.isLoading) {
                self.isLoading = true;

                var params = {
                    page: self.page,
                    search: self.search,
                    ordering: self.order
                };

                empServiceData.get(params, function (data) {
                    angular.forEach(data.results, function (elem) {
                        // this.employees.push(new empServiceData(elem));
                        // adding one instance of the service to provide convenient functionality
                        self.employees.push(new empServiceData(elem));
                    });
                    if (!data.next) {
                        self.hasMore = false;
                    }
                    self.isLoading = false;
                });
            }
        }

        function getAllEmployees() {
            $http.get(employeeUrl).then(
                function success(res) {
                    // console.log(res.data);
                    // tasks = res.data;
                    angular.forEach(res.data, function (elem) {
                        // this.employees.push(new empServiceData(elem));
                        self.allEmployees.push(elem);
                    });
                    // return tasks;
                },
                function error(err) {
                    return err;
                }
            );
        }

        function getSelectedEmps(ids) {
            var emps = [];
            angular.forEach(self.allEmployees, function (elem) {
                if (ids.indexOf(elem.id) != -1) {
                    emps.push(elem);
                }
            });
            return emps;
        }

        function createEmployee(employee) {
            var defer = $q.defer();
            self.isSaving = true;
            empServiceData.save(employee).$promise.then(function () {
                self.isSaving = false;
                self.selectedEmp = null;
                self.hasMore = true;
                self.page = 1;
                self.employees = [];
                self.getEmployees();
                toaster.pop('success', 'Created ' + employee.name);
                defer.resolve();
            });
            return defer.promise;
        }

        function updateEmployee(employee) {
            var defer = $q.defer();
            self.isSaving = true;
            employee.$update().then(function () {
                // employee.$update().$promise.then(function () {
                self.isSaving = false;
                toaster.pop('success', 'Updated ' + employee.name);
                defer.resolve();
            });
            return defer.promise;
        }

        function removeEmployee(employee) {
            var defer = $q.defer();
            self.isDeleting = true;
            employee.$remove().then(function () {
                var index = self.employees.indexOf(employee);
                self.employees.splice(index, 1);
                self.isDeleting = false;
                toaster.pop('success', 'Deleted ' + employee.name);
                defer.resolve();
            });
            return defer.promise;
        }

        function findEmployee(email) {
            for (var i = 0; i < self.employees.length; i++) {
                var employee = self.employees[i];
                if (employee.email == email) {
                    return employee;
                }
            }
        }

        function updateSelectedEmps() {
            var emps = [];
            angular.forEach(self.allEmployees, function (elem) {
                if (elem.display) {
                    emps.push(elem);
                }
            });
            self.selectedEmps = emps;
        }

        function loadMore() {
            if (self.hasMore && !self.isLoading) {
                self.page++;
                self.getEmployees();
            }
        }

        function watchFilters() {
            $rootScope.$watch(function () {
                return self.order;
            }, function (newVal, oldVal) {
                if (angular.isDefined(newVal)) {
                    doOrder();
                }
            });
            $rootScope.$watch(function () {
                return self.search;
            }, function (newVal, oldVal) {
                if (angular.isDefined(newVal)) {
                    doSearch();
                }
            });
        }

        function doSearch() {
            self.hasMore = true;
            self.page = 1;
            self.employees = [];
            self.getEmployees();
        }

        function doOrder() {
            self.hasMore = true;
            self.page = 1;
            self.employees = [];
            self.getEmployees();
        }
    }
})();