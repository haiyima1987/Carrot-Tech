/**
 * Created by Haiyi on 1/21/2017.
 */
'use strict';

angular.module('myApp.calendar', [
    // 'ngRoute',
    'ui.router',
    // 'ui.calendar',
    'taskService',
    'calendarService',
    'mwl.calendar',
    'ui.bootstrap',
    'ngAnimate',
    'colorpicker.module'
    // 'calendarDemoApp'
]);

angular.module('myApp.calendar').config(routeConfig);
function routeConfig($stateProvider, $urlRouterProvider) {
    $stateProvider.state('calendar', {
        url: '/calendar',
        views: {
            content: {
                templateUrl: 'components/calendar/calendar.html',
                controller: 'CalendarController',
                controllerAs: 'calendarVm'
            }
        }
    });
}

angular.module('myApp.calendar').config(calendarConfig);
function calendarConfig() {
    // console.log(calendarConfig); //view all available config

    // calendarConfig.templates.calendarMonthView = 'path/to/custom/template.html'; //change the month view template globally to a custom template
    //
    // calendarConfig.dateFormatter = 'moment'; //use either moment or angular to format dates on the calendar. Default angular. Setting this will override any date formats you have already set.
    //
    // calendarConfig.allDateFormats.moment.date.hour = 'HH:mm'; //this will configure times on the day view to display in 24 hour format rather than the default of 12 hour
    //
    // calendarConfig.allDateFormats.moment.title.day = 'ddd D MMM'; //this will configure the day view title to be shorter
    //
    // calendarConfig.i18nStrings.weekNumber = 'Week {week}'; //This will set the week number hover label on the month view
    //
    // calendarConfig.displayAllMonthEvents = true; //This will display all events on a month view even if they're not in the current month. Default false.
    //
    // calendarConfig.showTimesOnWeekView = true; //Make the week view more like the day view, with the caveat that event end times are ignored.
}