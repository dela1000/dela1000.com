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

    $scope.yearsAsDev = moment().diff('2015-01-01', 'years', false);
    $scope.yearsinTech = moment().diff('2011-01-01', 'years', false);

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