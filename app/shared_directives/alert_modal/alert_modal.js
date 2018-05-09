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