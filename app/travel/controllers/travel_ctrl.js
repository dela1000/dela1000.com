travel.controller("travelCtrl", function($scope, $http, $location, $anchorScroll, appConstants, alert) {

    $scope.scrollTo = function (location) {
        $location.hash(location);
        $anchorScroll();
    }

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