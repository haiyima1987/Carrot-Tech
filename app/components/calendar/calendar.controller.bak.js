/**
 * Created by Haiyi on 1/22/2017.
 */
angular.module('myApp.calendar').controller('CalendarController', CalendarController);

function CalendarController($scope, $compile, $filter, uiCalendarConfig, taskService, $uibModal) {

    $scope.newEvent = {};
    $scope.eventSource = [];
    $scope.events = [];

    taskService.retrieveTasks().then(function (data) {
        angular.forEach(data, function (elem) {
            $scope.events.push({
                id: elem.id,
                title: elem.title,
                description: elem.description,
                status: elem.status,
                start: elem.start,
                end: elem.end,
                allDay: false
            });
        });
    });

    $scope.eventOnClick = function (event, jsEvent, view) {
        $scope.newEvent = {
            id: event.id,
            title: event.title,
            description: event.description,
            status: event.status,
            start: new Date(event.start),
            end: new Date(event.end),
            add: false
        };
        $scope.showModal();
    };

    $scope.dayOnClick = function (date, jsEvent, view) {
        $scope.newEvent = {
            id: '',
            title: '',
            description: '',
            status: '',
            start: new Date(date),
            end: null,
            add: true
        };
        $scope.showModal();
    };

    $scope.saveEvent = function (event) {
        if ($scope.newEvent.add) {
            $scope.events.push(event);
        }
        else {
            for (var i = 0; i < $scope.events.length; i++) {
                if ($scope.events[i].id === event.id) {
                    $scope.events[i].title = event.title;
                    $scope.events[i].description = event.description;
                    $scope.events[i].status = event.status;
                    $scope.events[i].start = event.start;
                    $scope.events[i].end = event.end;
                }
            }
        }
    };

    $scope.removeEvent = function (id) {
        for (var i = 0; i < $scope.events.length; i++) {
            if ($scope.events[i].id === id) {
                $scope.events.splice(i, 1);
            }
        }
    };

    $scope.uiConfig = {
        calendar: {
            height: 450,
            editable: true,
            header: {
                left: 'month',
                center: 'title',
                right: 'today prev,next'
            },
            eventClick: $scope.eventOnClick,
            dayClick: $scope.dayOnClick
        }
    };

    $scope.showModal = function () {
        $scope.option = {
            templateUrl: 'components/calendar/modal.html',
            controller: 'ModalController',
            backdrop: 'static',
            resolve: {
                newEvent: function () {
                    return $scope.newEvent;
                }
            }
        };

        var modal = $uibModal.open($scope.option);
        modal.result.then(function (data) {
            $scope.newEvent = data.event;
            switch (data.operation) {
                case 'Save':
                    if ($scope.newEvent.add) {
                        taskService.createTask($scope.newEvent);
                    }
                    else {
                        taskService.updateTask($scope.newEvent);
                    }
                    $scope.saveEvent($scope.newEvent);
                    break;
                case 'Delete':
                    taskService.removeTask($scope.newEvent.id);
                    $scope.removeEvent($scope.newEvent.id);
            }
        })
    };

    $scope.eventSources = [$scope.events];
}

angular.module('myApp.calendar').controller('ModalController', ModalController);

function ModalController($scope, $uibModalInstance, newEvent) {

    $scope.data = {};
    $scope.data.newEvent = newEvent;
    console.log(newEvent);

    $scope.message = "";

    $scope.save = function () {
        if ($scope.data.newEvent.title.trim() != "") {
            $uibModalInstance.close({
                event: $scope.data.newEvent,
                operation: 'Save'
            })
        } else {
            $scope.message = "newEvent Title Required!";
        }
    };

    $scope.delete = function () {
        $uibModalInstance.close({
            event: $scope.data.newEvent,
            operation: 'Delete'
        });
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
}