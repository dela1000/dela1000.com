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