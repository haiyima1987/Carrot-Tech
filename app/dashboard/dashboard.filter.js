/**
 * Created by Haiyi on 1/19/2017.
 */
angular.module('myApp.dashboard').filter('selectedTasks', setSelectedTasks);
function setSelectedTasks() {
    return function (data) {
        if (!data.display) {
            console.log(data.display);
            return data;
        }
    };
}