/**
 * Created by Haiyi on 12/7/2016.
 */
angular.module('myApp.calendar').controller('CalendarController', CalendarController);

function CalendarController($scope, moment, calendarService, taskService, $uibModal) {
    var calendarVm = this;
    // required data for calendar initialization
    calendarVm.calendarView = 'month';
    calendarVm.viewDate = new Date();
    calendarVm.calendarTitle = 'Task Calendar';
    calendarVm.cellIsOpen = true;
    // data for events
    calendarVm.taskData = taskService;
    calendarVm.taskHelper = calendarService;
    calendarVm.selectedEvent = {};
    calendarVm.events = [];
    calendarVm.eventClicked = viewEvent;
    calendarVm.editEvent = editEvent;
    calendarVm.createEvent = createEvent;
    calendarVm.saveEvent = saveEvent;
    calendarVm.removeEvent = removeEvent;
    calendarVm.showModal = showModal;
    calendarVm.toggle = toggle;
    calendarVm.timespanClicked = timespanClicked;

    populate();

    function populate() {
        calendarVm.taskData.retrieveTasks().then(function (data) {
            angular.forEach(data, function (elem) {
                var event = calendarVm.taskHelper.createEventWithPrePopulatedInfo(
                    elem.id, elem.title, elem.description, elem.status, elem.startsAt, elem.endsAt);
                event.actions = [{ // an array of actions that will be displayed next to the event title
                    label: '<i class="fa fa-pencil"></i>', // the label of the action
                    cssClass: 'edit-action', // a CSS class that will be added to the action element so you can implement custom styling
                    onClick: function (args) { // the action that occurs when it is clicked. The first argument will be an object containing the parent event
                        calendarVm.editEvent(args);
                    }
                }];
                calendarVm.events.push(event);
            });
        });
    }

    function viewEvent(event, jsEvent, view) {
        calendarVm.selectedEvent = event;
        calendarVm.selectedEvent.isView = true;
        calendarVm.showModal();
    }

    function editEvent(args) {
        calendarVm.selectedEvent = args.calendarEvent;
        calendarVm.selectedEvent.isCreate = false;
        calendarVm.showModal();
    }

    function createEvent() {
        calendarVm.selectedEvent = {};
        calendarVm.selectedEvent.isCreate = true;
        calendarVm.showModal();
    }

    function saveEvent(event) {
        if (event.isCreate) {
            var newEvent = calendarVm.taskHelper.createEventWithPrePopulatedInfo(
                event.id, event.title, event.description, event.startsAt, event.endsAt);
            newEvent.actions = [{ // an array of actions that will be displayed next to the event title
                label: '<i class="fa fa-pencil"></i>', // the label of the action
                cssClass: 'edit-action', // a CSS class that will be added to the action eventent so you can implement custom styling
                onClick: function (args) { // the action that occurs when it is clicked. The first argument will be an object containing the parent event
                    calendarVm.editEvent(args);
                }
            }];
            calendarVm.events.push(newEvent);
        } else {
            for (var i = 0; i < calendarVm.events.length; i++) {
                if (calendarVm.events[i].id === event.id) {
                    calendarVm.events[i].title = event.title;
                    calendarVm.events[i].description = event.description;
                    calendarVm.events[i].status = event.status;
                    calendarVm.events[i].startsAt = event.startsAt;
                    calendarVm.events[i].endsAt = event.endsAt;
                }
            }
        }
    }

    function removeEvent(id) {
        for (var i = 0; i < calendarVm.events.length; i++) {
            if (calendarVm.events[i].id === id) {
                calendarVm.events.splice(i, 1);
            }
        }
    }

    function showModal() {
        calendarVm.option = {
            templateUrl: 'components/calendar/modal.html',
            controller: 'ModalController',
            controllerAs: 'modalVm',
            backdrop: 'static',
            scope: $scope,
            resolve: {
                parentScope: function () {
                    return calendarVm;
                }
            }
        };

        var modal = $uibModal.open(calendarVm.option);
        modal.result.then(function (data) {
            calendarVm.selectedEvent = data.event;
            switch (data.operation) {
                case 'Save':
                    if (calendarVm.selectedEvent.isCreate) {
                        calendarVm.taskData.createTask(calendarVm.selectedEvent);
                    }
                    else {
                        calendarVm.taskData.updateTask(calendarVm.selectedEvent);
                    }
                    calendarVm.saveEvent(calendarVm.selectedEvent);
                    break;
                case 'Delete':
                    calendarVm.taskData.removeTask(calendarVm.selectedEvent);
                    calendarVm.removeEvent(calendarVm.selectedEvent.id);
            }
        })
    }

    function toggle($event, field, event) {
        $event.preventDefault();
        $event.stopPropagation();
        event[field] = !event[field];
    }

    function timespanClicked(date, cell) {
        if (calendarVm.calendarView === 'month') {
            if ((calendarVm.cellIsOpen && moment(date).startOf('day').isSame(moment(calendarVm.viewDate).startOf('day'))) || cell.events.length === 0 || !cell.inMonth) {
                calendarVm.cellIsOpen = false;
            } else {
                calendarVm.cellIsOpen = true;
                calendarVm.viewDate = date;
            }
        } else if (calendarVm.calendarView === 'year') {
            if ((calendarVm.cellIsOpen && moment(date).startOf('month').isSame(moment(calendarVm.viewDate).startOf('month'))) || cell.events.length === 0) {
                calendarVm.cellIsOpen = false;
            } else {
                calendarVm.cellIsOpen = true;
                calendarVm.viewDate = date;
            }
        }
    }
}

angular.module('myApp.calendar').controller('ModalController', ModalController);
function ModalController($scope, $uibModalInstance, parentScope, taskService) {
    var modalVm = this;
    modalVm.parentScope = parentScope;
    modalVm.message = "Inside Modal";
    modalVm.taskData = taskService;
    modalVm.saveEvent = saveEvent;
    modalVm.deleteEvent = deleteEvent;
    modalVm.closeModal = closeModal;
    // modalVm.toggle = toggle;

    function saveEvent() {
        if (modalVm.parentScope.selectedEvent.title.trim() != "") {
            $uibModalInstance.close({
                event: modalVm.parentScope.selectedEvent,
                operation: 'Save'
            })
        } else {
            modalVm.message = "selectedEvent Title Required!";
        }
    }

    function deleteEvent() {
        $uibModalInstance.close({
            event: modalVm.parentScope.selectedEvent,
            operation: 'Delete'
        });
    }

    function closeModal() {
        $uibModalInstance.dismiss('cancel');
    }
}