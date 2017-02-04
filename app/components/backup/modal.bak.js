/**
 * Created by Haiyi on 12/9/2016.
 */
/**
 * Created by Haiyi on 12/7/2016.
 */
angular.module('taskCalendar', [
    'ui.calendar',
    'ui.bootstrap',
    'taskService'
]);

angular.module('taskCalendar').controller('CalendarController', CalendarController);

function CalendarController($scope, $compile, $filter, uiCalendarConfig, taskService, $uibModal) {

    $scope.selected = {
        id: "001",
        title: 'lol',
        description: 'l'
    };
    console.log($scope.selected);
    $scope.events = [];
    $scope.eventSources = [$scope.events];
    $scope.NewEvent = {};

    $scope.samplefunction = function () {
        $scope.selected = {
            id: "0014444",
            title: 'lol',
            description: 'loooooo'
        };
    };

    function populate() {
        var tasks = taskService.getTasks();

        // load events from service
        angular.forEach(tasks, function (elem, index) {
            $scope.events.push({
                id: elem.code,
                title: elem.title,
                description: elem.description,
                status: elem.status,
                start: new Date(elem.start),
                end: new Date(elem.end),
                allDay: true,
                stick: true
            });
        });
        console.log(tasks);
        // console.log($scope.events);
    }

    populate();

    $scope.uiConfig = {
        calendar: {
            height: 450,
            editable: false,
            displayEventTime: false,
            header: {
                left: 'month',
                center: 'title',
                right: 'today prev,next'
            },
            selectable: true,
            selectHelper: true,
            select: $scope.select,
            eventClick: $scope.selectEvent
            // eventDrop: $scope.alertOnDrop,
            // eventResize: $scope.alertOnResize,
            // eventRender: $scope.eventRender
            // myCalendar: {
            //
            // }
        }
    };

    $scope.select = function (start, end) {
        var startDate = moment(start._i).format('YYYY/MM/DD LT');
        var endDate = moment(end._i).format('YYYY/MD/DD LT');
        // $scope.selected = {
        //     id: "001",
        //     title: 'lolooo',
        //     description: 'looooo'
        // };
        $scope.NewEvent = {
            id: 0,
            title: '',
            description: '',
            status: '',
            start: startDate,
            end: endDate,
            allDay: false,
            stick: true
        };
        // $scope.showModal();
    };

    $scope.selectEvent = function (event) {
        $scope.selectedEvent = event;
        // console.log($scope.selectedEvent);
        // $scope.selected = {
        //     id: "001",
        //     title: 'lolooo',
        //     description: 'looooo'
        // };
        // console.log($scope.selected);
        var startDate = new Date(event.start._i);
        var endDate = new Date(event.end._i);
        $scope.NewEvent = {
            id: event.id,
            title: event.title,
            description: event.description,
            status: event.status,
            start: startDate,
            end: endDate,
            allDay: true,
            stick: true
        };
        console.log($scope.NewEvent);
        // console.log(event);
        $scope.showModal();
    };

    $scope.showModal = function () {
        // $scope.selected = {
        //     id: "001",
        //     title: 'lolooo',
        //     description: 'looooo'
        // };
        // console.log($scope.selected);
        $scope.option = {
            templateUrl: 'components/calendar/modal.html',
            controller: 'ModalController',
            backdrop: 'static',
            resolve: {
                NewEvent: function () {
                    return $scope.NewEvent;
                }
            }
        };
        // console.log($scope.NewEvent);

        var modal = $uibModal.open($scope.option);
        modal.result.then(function (data) {
            $scope.NewEvent = data.event;
            switch (data.operation) {
                case 'Add':
                    taskService.addTask($scope.NewEvent);
                    populate();
                    break;
                case 'Remove':
                    taskService.removeTask($scope.NewEvent);
                    populate();
            }
        })
    }
}

angular.module('taskCalendar').controller('ModalController', ModalController);

function ModalController($scope, $uibModalInstance, NewEvent) {

    $scope.NewEvent = NewEvent;
    $scope.message = "";

    $scope.NewEvent.age = 12;
    console.log($scope.NewEvent);

    $scope.add = function () {
        if ($scope.NewEvent.title.trim() != "") {
            $uibModalInstance.close({
                event: $scope.NewEvent,
                operation: 'Add'
            })
        } else {
            $scope.message = "Event Title Required!";
        }
    };

    $scope.delete = function () {
        $uibModalInstance.close({
            event: $scope.NewEvent,
            operation: 'Remove'
        });
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
}