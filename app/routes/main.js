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