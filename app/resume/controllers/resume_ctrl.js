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

    $scope.resumeLink = appConstants.urlBase + "/public/DanielDeLaRosaResume2018.pdf";

})