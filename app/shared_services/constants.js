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