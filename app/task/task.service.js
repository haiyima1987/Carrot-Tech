/**
 * Created by Haiyi on 11/24/2016.
 */
(function () {
    'use strict';

    angular.module('taskService', [])
    // .constant('taskUrl', 'http://i874156.iris.fhict.nl/WEB2/tasks')
        .constant('taskUrl', 'API/tasks.json')
        .service('taskService', taskService);
    taskService.$inject = ['$http', '$q', 'taskUrl', 'toaster'];
    function taskService($http, $q, taskUrl, toaster) {
        // $http.get(taskUrl)
        var promise = $http.get(taskUrl)
            .then(
                function success(res) {
                    // console.log(res.data);
                    self.allTasks = res.data;
                    return self.allTasks;
                },
                function error(err) {
                    return err;
                }
            );

        var self = {
            title: 'Task',
            page: 1,
            hasMore: true,
            isLoading: false,
            isSaving: false,
            selectedTask: null,
            tasks: [],
            allTasks: [],
            selectedTasks: [],
            taskOptions: ['Incomplete', 'Complete', 'In Progress'],
            search: null,
            order: 'name',
            getTasks: getTasks,
            retrieveTasks: retrieveTasks,
            createTask: createTask,
            removeTask: removeTask,
            updateTask: updateTask,
            // used for check boxes
            updateSelectedTasks: updateSelectedTasks,
            findTask: findTask,
            getNewId: getNewId
            // loadMore: loadMore,
            // watchFilters: watchFilters,
            // doSearch: doSearch,
            // doOrder: doOrder
        };

        self.getTasks();
        // self.watchFilters();

        return self;

        function getTasks() {
            var defer = $q.defer();
            if (!self.isLoading) {
                self.isLoading = true;
                $http.get(taskUrl).then(
                    function success(res) {
                        // console.log(res.data);
                        // self.tasks = res.data;
                        angular.forEach(res.data, function (elem) {
                            self.tasks.push(elem);
                        });
                        self.isLoading = false;
                        defer.resolve();
                        // return self.tasks;
                    },
                    function error(err) {
                        return err;
                    }
                );
            }
            return defer.promise;
        }

        function retrieveTasks() {
            return promise;
        }

        function createTask(task) {
            self.isSaving = true;
            var defer = $q.defer();
            if (angular.isString(task.title)
                && angular.isString(task.description) && angular.isString(task.status)
                && angular.isDate(task.startsAt) && angular.isDate(task.endsAt)) {
                console.log('valid');
                var newTask = {
                    id: getNewId(),
                    title: task.title,
                    description: task.description,
                    status: task.status,
                    startsAt: task.startsAt,
                    endsAt: task.endsAt,
                    department: task.department,
                    employees: task.employees
                };
                self.tasks.push(newTask);
                defer.resolve();
                toaster.pop('success', 'Created ' + newTask.title);
                self.isSaving = false;
                console.log("task added");
            }
            else {
                console.log("error occurred");
            }
            // self.getTasks();
            return defer.promise;
        }

        function removeTask(task) {
            var tasks = self.tasks;
            var defer = $q.defer();
            self.isSaving = true;
            for (var i = 0; i < tasks.length; i++) {
                if (tasks[i].id == task.id) {
                    tasks.splice(i, 1);
                    defer.resolve();
                    toaster.pop('success', 'Deleted ' + task.title);
                    self.isSaving = false;
                    break;
                }
            }
            return defer.promise;
        }

        function updateTask(task) {
            var tasks = self.tasks;
            var defer = $q.defer();
            self.isSaving = true;
            for (var i = 0; i < tasks.length; i++) {
                if (tasks[i].id == task.id) {
                    tasks[i].title = task.title;
                    tasks[i].description = task.description;
                    tasks[i].status = task.status;
                    tasks[i].startsAt = task.startsAt;
                    tasks[i].endsAt = task.endsAt;
                    tasks[i].department = task.department;
                    tasks[i].employees = task.employees;
                    defer.resolve();
                    toaster.pop('success', 'Updated ' + tasks[i].title);
                    self.isSaving = false;
                    break;
                }
            }
            return defer.promise;
        }

        function updateSelectedTasks() {
            var tasks = [];
            angular.forEach(self.tasks, function (elem) {
                if (elem.display) {
                    tasks.push(elem);
                }
            });
            self.selectedTasks = tasks;
        }

        function findTask(id) {
            var tasks = self.tasks;
            for (var i = 0; i < tasks.length; i++) {
                if (tasks[i].id == id) {
                    return tasks[i];
                }
            }
            return null;
        }

        function getNewId() {
            var max = Math.max.apply(Math, self.tasks.map(function (elem) {
                return elem.id;
            }));
            return max + 10;
        }
    }
})();