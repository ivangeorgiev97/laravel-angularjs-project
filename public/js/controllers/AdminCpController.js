app.controller('AdminCpController', function ($scope, $http, $browser, $rootScope) {
    var api = 'api/';

    $rootScope.isNotLogged = true;

    var user = JSON.parse(localStorage.getItem('user'));

    if (user) {
        $rootScope.authenticated = true;
        $rootScope.isNotLogged = false;
        $rootScope.currentUser = user;

        if (user.isAdmin === 1) {
            $rootScope.isAdmin = true;
        }
    } else {
        $rootScope.authenticated = false;
        $rootScope.isAdmin = false;
        $rootScope.isNotLogged = true;
    }

    $scope.GetLinks = function ()
    {
        $http.get($browser.baseHref() + api + 'admincp') // edit if /public
                .then(function (response) {
                    console.log(response.data);
                    $scope.links = response.data;
                });
    }

    $scope.GetLinks();

});