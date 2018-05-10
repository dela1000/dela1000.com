resume.controller("resumeCtrl", function($scope, $window, $http, appConstants) {

    $scope.experience = [{
            company: "UberMedia",
            tag: "Leading independent developer of dynamic advertising and mobile data solutions, and feature-rich mobile applications",
            title: "Full Stack Engineer",
            time: "2016-Current",
            bulletOne: "Expert development in Angular.js, Node.js, and Ruby on Rails",
            bulletTwo: "Support legacy products with any development updates, bugfixes, and 3rd party compliances",
            bulletThree: "Provide primary frontend development for all of UberMedia offerings"
        },
        {
            company: "UberMedia",
            tag: "Leading independent developer of dynamic advertising and mobile data solutions, and feature-rich mobile applications",
            title: "Quality Assurance Engineer",
            time: "2014-2016",
            bulletOne: "Identify, record, document,and track bugs using Sprint.ly and Jira Project Tracking software",
            bulletTwo: "Design, develop and execute automation scripts for test plans and test cases using Selenium IDE",
            bulletThree: "Perform thorough regression testing with Selenium IDE and manually when needed when bugs are resolved"
        },
        {
            company: "UberMedia",
            tag: "Leading independent developer of dynamic advertising and mobile data solutions, and feature-rich mobile applications",
            title: "Associate Community Manager",
            time: "2011-2014",
            bulletOne: "Provided customer support for multiple mobile applications using Zendesk, Tender Support, and TwitSpark",
            bulletTwo: "Planned and implemented engagement programs for applications using Twitter, Facebook, and YouTube",
            bulletThree: "Drafted, developed and executed a communication program to 9 million Twitter followers"
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

    $scope.resumeLink = appConstants.urlBase + "/public/DanielDeLaRosaResume2018.pdf";

})