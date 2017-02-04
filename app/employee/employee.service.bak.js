/**
 * Created by Haiyi on 1/16/2017.
 */
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

    angular.module('employeeService').factory('employeeData', employeeData);
    function employeeData($resource) {
        return $resource('https://api.codecraft.tv/samples/v1/contact/:id/', {id: '@id'}, {
            update: {
                method: 'PUT'
            }
        });
    }

    angular.module('employeeService')
        .constant('employeeUrl', 'API/employees.json')
        .service('employeeService', employeeService);
    employeeService.$inject = ['$q', '$rootScope', 'employeeData', 'toaster'];
    function employeeService($q, $rootScope, employeeData, toaster) {

        var self = {
            page: 1,
            hasMore: true,
            isLoading: false,
            isSaving: false,
            selectedEmp: null,
            employees: [],
            search: null,
            order: 'name',
            getEmployees: getEmployees,
            createEmployee: createEmployee,
            updateEmployee: updateEmployee,
            removeEmployee: removeEmployee,
            findEmployee: findEmployee,
            loadMore: loadMore,
            watchFilters: watchFilters,
            doSearch: doSearch,
            doOrder: doOrder
        };

        self.getEmployees();
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

                employeeData.get(params, function (data) {
                    angular.forEach(data.results, function (elem) {
                        // this.employees.push(new employeeData(elem));
                        self.employees.push(elem);
                    });
                    if (!data.next) {
                        self.hasMore = false;
                    }
                    self.isLoading = false;
                });
                console.log(self.employees);
            }
        }

        function createEmployee(employee) {
            console.log(employee);
            var defer = $q.defer();
            self.isSaving = true;
            employeeData.save(employee).$promise.then(function () {
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
            employeeData.update(employee).$promise.then(function () {
                // employee.$update().$promise.then(function () {
                self.isSaving = false;
                toaster.pop('success', 'Updated ' + employee.name);
                defer.resolve();
            });
            return defer.promise;
        }

        function removeEmployee(employee) {
            console.log(employee);
        }

        function findEmployee(email) {
            console.log(email);
            for (var i = 0; i < self.employees.length; i++) {
                var employee = self.employees[i];
                if (employee.email == email) {
                    // console.log(employee.photo);
                    return employee;
                }
            }
            // self.selectedEmp = null;
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