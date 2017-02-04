/**
 * Created by Haiyi on 1/24/2017.
 */
(function () {
    'use strict';

    angular.module('dashboardService', [
        'ngResource'
    ]);

    angular.module('dashboardService').factory('weatherData', weatherData);
    function weatherData($resource) {
        return $resource('https://api.openweathermap.org/data/2.5/weather?APPID=:apiKey&q=:city',
            {
                city: '@city',
                apiKey: '@apiKey'
            },
            {
                retrieve: {method: 'GET'}
            })
    }

    angular.module('dashboardService')
        .constant('newsUrl', 'API/news.json')
        .service('dashboardService', dashboardService);
    function dashboardService($http, newsUrl, weatherData) {

        var self = {
            title: 'Carrot-Tech Daily News',
            isLoading: false,
            news: [],
            getWeather: getWeather,
            getNews: getNews
        };

        getNews();

        return self;

        function getNews() {
            if (!self.isLoading) {
                self.isLoading = true;
                $http.get(newsUrl).then(
                    function success(res) {
                        angular.forEach(res.data, function (elem) {
                            self.news.push(elem);
                        });
                        self.isLoading = false;
                    },
                    function error(err) {
                        console.log(err);
                    }
                )
            }
        }

        function getWeather(query) {
            // console.log('news');
            // var settings = {
            //     // Normally should be behind a server proxy to protect key using for just this demo
            //     appKey: 'd5860a2f179f4fa4a839df45874765e4',
            //     urlBase: 'https://api.datamarket.azure.com/Bing/Search/v1/Composite?Sources=%27web%2Bimage%2Bvideo%2Bnews%27'
            // };
            //
            // var url = settings.urlBase + '&Query=%27' + query + '%27';
            // var authHeader = 'Basic ' + btoa(settings.appKey + ':' + settings.appKey);
            //
            // var promise = $http.get(url, {
            //     headers: {'Authorization': authHeader}
            // }).then(
            //     function success(data) {    // data, status, headers, config
            //         console.log(data);
            //     },
            //     function error(err) {
            //         console.log(err);
            //     }
            // );
            // $http.get('https://ajax.googleapis.com/ajax/services/search/news?v=1.0&q=Holland').then(
            //     function success(data) {
            //         console.log(data);
            //     },
            //     function error(error) {
            //         console.log(error);
            //     }
            // );
            // $http.get('https://api.cognitive.microsoft.com/bing/v5.0/news/search?q=' + query + '&mkt=en-us HTTP/1.1', {
            //     'Host': 'api.cognitive.microsoft.com',
            //     'Ocp-Apim-Subscription-Key': 'd5860a2f179f4fa4a839df45874765e4',
            //     'X-Search-ClientIP': '999.999.999.999',
            //     'X-MSEdge-ClientID': '<blobFromPriorResponseGoesHere>'
            // }).then(
            //     function success(data) {
            //         console.log(data);
            //     },
            //     function error(error) {
            //         console.log(error);
            //     }
            // );
            // var key = '7a9590a117867fa1a7ee104fe2367624';
            // weatherData.retrieve({
            //     city: cityName,
            //     apiKey: key
            // }).$promise.then(
            //     function success(data) {
            //         console.log(data);
            //     },
            //     function error(error) {
            //         console.log(error);
            //     }
            // );
        }
    }
})();