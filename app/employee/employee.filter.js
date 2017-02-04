/**
 * Created by Haiyi on 12/15/2016.
 */
angular.module('myApp.employee').filter('defaultImg', setDefaultImg);
function setDefaultImg() {
    return function (data, defaultSrc) {
        if (!data) {
            return defaultSrc;
        }
        return data;
    };
}