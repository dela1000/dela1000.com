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