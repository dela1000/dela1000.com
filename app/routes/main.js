App.config(function ($stateProvider, $urlRouterProvider) {
    
    $urlRouterProvider.when('', '/')

    $stateProvider
        .state('home', {
            url: '/',
            templateUrl: '../app/home/templates/home.html'
        })
        .state('resume', {
            url: '/resume',
            templateUrl: '../app/resume/templates/resume.html',
            controller: 'resumeCtrl'
        })
        .state('tech', {
            url: '/tech',
            templateUrl: '../app/tech/templates/tech.html'
        })
        .state('about', {
            url: '/about',
            templateUrl: '../app/about/templates/about.html'
        })
        .state('contact', {
            url: '/contact',
            templateUrl: '../app/contact/templates/contact.html',
            controller: 'contactCtrl'
        })

})