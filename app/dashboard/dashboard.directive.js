// /**
//  * Created by Haiyi on 1/18/2017.
//  */
angular.module('myApp.dashboard').directive('newsCard', newsCard);

function newsCard() {
    var self = {
        transclude: true,
        restrict: 'EA',
        templateUrl: 'template/news.card.html',
        scope: {
            news: '='
        },
        link: NewsCardLink,
        controller: NewsCardController,
        controllerAs: 'newsCardVm',
        bindToController: true
    };

    return self;

    function NewsCardLink(scope, elem, attr, newsCardVm) {}
}

function NewsCardController() {
    var newsCardVm = this;
    newsCardVm.now = new Date();
}