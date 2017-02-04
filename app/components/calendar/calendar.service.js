/**
 * Created by Haiyi on 1/22/2017.
 */
(function () {
    'use strict';

    angular.module('calendarService', []).service('calendarService', calendarService);
    function calendarService() {

        var self = {
            prevColor: null,
            colors: ['aqua', 'blue', 'fuchsia', 'gray', 'green', 'lime', 'maroon', 'navy', 'olive', 'orange', 'purple', 'red', 'teal', 'yellow'],
            generateColor: generateColor,
            createEventWithPrePopulatedInfo: createEventWithPrePopulatedInfo
        };

        return self;

        function generateColor() {
            var colors = self.colors;
            var color = colors[Math.floor(Math.random() * colors.length)];
            if (color == self.prevColor) {
                return generateColor();
            } else {
                self.prevColor = color;
                return color;
            }
        }

        function createEventWithPrePopulatedInfo(id, title, desc, status, startsAt, endsAt) {
            return {
                id: id,
                title: title,
                description: desc,
                status: status,
                startsAt: new Date(startsAt),
                endsAt: new Date(endsAt),
                color: { // can also be calendarConfig.colorTypes.warning for shortcuts to the deprecated event types
                    primary: generateColor(), // the primary event color (should be darker than secondary)
                    secondary: '#dfdfdf' // the secondary event color (should be lighter than primary)
                },
                // actions: [{ // an array of actions that will be displayed next to the event title
                //     label: '<i class="fa fa-pencil"></i>', // the label of the action
                //     cssClass: 'edit-action', // a CSS class that will be added to the action element so you can implement custom styling
                //     onClick: function (args) { // the action that occurs when it is clicked. The first argument will be an object containing the parent event
                //         calendarVm.editEvent(args);
                //     }
                // }],
                draggable: true, //Allow an event to be dragged and dropped
                resizable: true, //Allow an event to be resizable
                incrementsBadgeTotal: true, //If set to false then will not count towards the badge total amount on the month and year view
                recursOn: 'year', // If set the event will recur on the given period. Valid values are year or month
                cssClass: 'a-css-class-name', //A CSS class (or more, just separate with spaces) that will be added to the event when it is displayed on each view. Useful for marking an event as selected / active etc
                allDay: false // set to true to display the event as an all day event on the day view
            };
        }
    }
})();