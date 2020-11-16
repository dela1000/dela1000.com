var App = angular.module('App', [
    'ngRoute',
    'ui.router',
    'ngAnimate',
    'rootCtrl',
    'sharedDirectives',
    'resume',
    'contact',
    'travel',
])

let sharedDirectives = angular.module('sharedDirectives', [])

let rootCtrl = angular.module('rootCtrl', []);

rootCtrl.controller("rootCtrl", ($scope, $rootScope, $state, $window, trafficCop) => {
    // Navbar selectors
    $scope.navbarOptions = [
        { value: 'home' },
        { value: 'projects' },
        { value: 'resume' },
        { value: 'tech' },
        { value: 'about' },
        { value: 'travel' },
        { value: 'contact' }
    ]
    // navbar routing
    $scope.route = (state) => {
        $state.go(state)
    }
    //Copyright year
    $scope.year = moment().format('YYYY');

    //Keeps watch on http traffic:
    // from https://www.bennadel.com/blog/2777-monitoring-http-activity-with-http-interceptors-in-angularjs.htm
    $scope.trafficCop = trafficCop;
    $scope.$watch(calculateModelValue = () => {
            return (trafficCop.pending.all);
        },
        handleModelChange = (count) => {
            // console.log(
            //     "Pending HTTP count:", count,
            //     "{",
            //     trafficCop.pending.get, " - GET ,",
            //     trafficCop.pending.post, " - POST",
            //     "}"
            // )
            //Set callBeingMade rootScope to display or hide the main http cover for the whole page in index.html
            if (trafficCop.pending.post > 0) {
                $rootScope.fadeAnimation = true;
            } else {
                $rootScope.fadeAnimation = false;
            };
        }
    ), true;

    $scope.goToTop = () => {
        $window.scrollTo(0, 0);
    }
})

App.run(['$transitions', function($transitions) {
    // scroll page to top on any route change
    $transitions.onSuccess({}, function() {
        document.body.scrollTop = document.documentElement.scrollTop = 0;
    })
}]);

App.config(setupConfig = ($locationProvider, $httpProvider) => {
    $locationProvider.hashPrefix('')

    interceptHttp = ($q, trafficCop) => {
        request = (config) => {
            trafficCop.startRequest(config.method);
            return (config);
        }
        requestError = (rejection) => {
            trafficCop.startRequest("get");
            return ($q.reject(rejection));
        }
        response = (response) => {
            trafficCop.endRequest(extractMethod(response));
            return (response);
        }
        responseError = (response) => {
            trafficCop.endRequest(extractMethod(response));
            return ($q.reject(response));
        }
        extractMethod = (response) => {
            try {
                return (response.config.method);
            } catch (error) {
                return ("get");
            }
        }

        return ({
            request: request,
            requestError: requestError,
            response: response,
            responseError: responseError
        });
    }

    $httpProvider.interceptors.push(interceptHttp);
})
let contact = angular.module('contact', []);
let resume = angular.module('resume', []);
App.config(function ($stateProvider, $urlRouterProvider) {
    
    $urlRouterProvider.when('', '/')

    $stateProvider
        .state('home', {
            url: '/',
            templateUrl: '../app/home/templates/home.html',
        })
        .state('resume', {
            url: '/resume',
            templateUrl: '../app/resume/templates/resume.html',
            controller: 'resumeCtrl'
        })
        .state('tech', {
            url: '/tech',
            templateUrl: '../app/tech/templates/tech.html',
        })
        .state('projects', {
            url: '/projects',
            templateUrl: '../app/projects/templates/projects.html'
        })
        .state('about', {
            url: '/about',
            templateUrl: '../app/about/templates/about.html',
        })
        .state('travel', {
            url: '/travel',
            templateUrl: '../app/travel/templates/travel.html',
            controller: 'travelCtrl',
        })
        .state('contact', {
            url: '/contact',
            templateUrl: '../app/contact/templates/contact.html',
            controller: 'contactCtrl'
        })

})
var App = angular.module('App');

App.factory('alert', () => {
    let service = {};
    service.visible = false;
    service.message;

    service.setMessage = (message) => {
        service.message = _.truncate(message, {'length': 410});
        service.visible = true;
    }

    return service;
})
var App = angular.module('App');

App.factory('appConstants', ($window) => {

    let urlBase;

    if(_.includes($window.document.URL, 'localhost')) {
        console.log("constants.js LOCALHOST ENV")
        urlBase = "http://localhost:8080";
    } else if(_.includes($window.document.URL, 'dela1000')){
        urlBase = "http://dela1000.com"
    }

    return {
        urlBase: urlBase
    }
})
var App = angular.module('App');
// www.bennadel.com/blog/2777-monitoring-http-activity-with-http-interceptors-in-angularjs.htm
App.factory("trafficCop", () => {

    let total = {
        all: 0,
        get: 0,
        post: 0,
        delete: 0,
        put: 0,
        head: 0
    };
    let pending = {
        all: 0,
        get: 0,
        post: 0,
        delete: 0,
        put: 0,
        head: 0
    };

    let endRequest = (httpMethod) => {
        httpMethod = normalizedHttpMethod(httpMethod);
        pending.all--;
        pending[httpMethod]--;
        if (pending[httpMethod] < 0) {
            redistributePendingCounts(httpMethod);
        }
    }

    let startRequest = (httpMethod) => {
        httpMethod = normalizedHttpMethod(httpMethod);
        total.all++;
        total[httpMethod]++;
        pending.all++;
        pending[httpMethod]++;
    }

    let normalizedHttpMethod = (httpMethod) => {
        httpMethod = (httpMethod || "").toLowerCase();
        switch (httpMethod) {
            case "get":
            case "post":
            case "delete":
            case "put":
            case "head":
                return (httpMethod);
                break;
        }
        return ("get");
    }

    let redistributePendingCounts = (negativeMethod) => {
        let overflow = Math.abs(pending[negativeMethod]);
        pending[negativeMethod] = 0;
        let methods = ["get", "post", "delete", "put", "head"];
        _.forEach(methods, (method) => {
            if (overflow && pending[method]) {
                pending[method] -= overflow;
                if (pending[method] < 0) {
                    overflow = Math.abs(pending[method]);
                    pending[method] = 0;
                } else {
                    overflow = 0;
                }
            }
        })
    }

    return ({
        pending: pending,
        total: total,
        endRequest: endRequest,
        startRequest: startRequest,
    });
});
let travel = angular.module('travel', []);
contact.controller("contactCtrl", function($scope, $http, appConstants, alert) {

    $scope.sendEmail = () => {

        if (!$scope.name && !$scope.email) {
            alert.setMessage('Please add your name and email')
            return;
        }

        if (!validateEmail($scope.email)) {
            alert.setMessage('Please add a valid email address')
            return;
        }

        if (!$scope.message) {
            alert.setMessage('Please add a message')
            return;
        }

        let payload = {
            name: $scope.name,
            email: $scope.email,
            message: $scope.message,
            source: 'dela1000Website'
        }
        $http.post(appConstants.urlBase + '/email', payload)
            .then((response) => {

                if (response.status === 200) {
                    delete $scope.name;
                    delete $scope.email;
                    delete $scope.message;
                }

                alert.setMessage(response.data.message)
            })
    }

    let validateEmail = (email) => {
        let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
})
resume.controller("resumeCtrl", function($scope, $window, $http, appConstants) {

    $scope.experience = [{
            company: "UberMedia",
            tag: "Leading independent developer of dynamic advertising and mobile data solutions, and feature-rich mobile applications",
            title: "Full Stack Engineer",
            time: "2016-Current",
            bulletPoints: ["Expert development in Angular.js, Node.js, and Ruby on Rails", "Support legacy products with any development updates, bugfixes, and 3rd party compliances", "Provide primary frontend development for all of UberMedia offerings"]
        },
        {
            company: "Xupe",
            tag: "Plan, design, and develop beautiful websites and applications tailored to your business",
            title: "Full Stack Engineer",
            time: "2020-Current",
            bulletPoints: ["Building full-stack websites and mobile applications using only the latest technologies", "Provide complete application development for all of our clients' needs", "Support legacy products with any development updates, bugfixes, and 3rd party compliances"]
        },
        {
            company: "UberMedia",
            tag: "Leading independent developer of dynamic advertising and mobile data solutions, and feature-rich mobile applications",
            title: "Quality Assurance Engineer",
            time: "2014-2016",
            bulletPoints: ["Identify, record, document, and track bugs using Sprint.ly and Jira Project Tracking software", "Design, develop, and execute automation scripts for test plans and test cases using Selenium IDE", "Perform thorough regression testing with Selenium IDE and manually when needed when bugs are resolved"]
        },
        {
            company: "UberMedia",
            tag: "Leading independent developer of dynamic advertising and mobile data solutions, and feature-rich mobile applications",
            title: "Associate Community Manager",
            time: "2011-2014",
            bulletPoints: ["Provided customer support for multiple mobile applications using Zendesk, Tender Support, and TwitSpark", "Planned and implemented engagement programs for applications using Twitter, Facebook, and YouTube", "Drafted, developed and executed a communication program to 9 million Twitter followers"]
        }
    ];

    $scope.education = [{
            school: "HackReactor",
            degree: "Advanced Software Engineering",
            time: "2015-2016"
        },
        {
            school: "University of California, Irvine",
            degree: "BA Art History, BA Sociology",
            time: "2005-2008"
        }
    ];

    $scope.resumeLink = appConstants.urlBase + "/public/DanielDeLaRosaResume.pdf";

})
sharedDirectives.directive('alertModal', (appConstants, alert) => {
    return {
        restrict: 'E',
        templateUrl: "/app/shared_directives/alert_modal/alert_modal.html",
        scope: {},
        link: (scope, elem, attr) => {
            scope.alert = alert;

            scope.hideModal = () => {
                alert.visible = false;
            }
        }
    }
})
travel.controller("travelCtrl", function($scope, $http, appConstants, alert) {

    $scope.sendEmail = () => {

        if (!$scope.name && !$scope.email) {
            alert.setMessage('Please add your name and email')
            return;
        }

        if (!validateEmail($scope.email)) {
            alert.setMessage('Please add a valid email address')
            return;
        }

        if (!$scope.message) {
            alert.setMessage('Please add a message')
            return;
        }

        let payload = {
            name: $scope.name,
            email: $scope.email,
            message: $scope.message,
            source: 'dela1000TravelContact'
        }
        $http.post(appConstants.urlBase + '/email', payload)
            .then((response) => {

                if (response.status === 200) {
                    delete $scope.name;
                    delete $scope.email;
                    delete $scope.message;
                }

                alert.setMessage(response.data.message)
            })
    }

    let validateEmail = (email) => {
        let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
})