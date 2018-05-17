app.controller('HomeController', function ($scope, $http, $rootScope) {
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


    $scope.GetResources = function ()
    {
        $http.get(api + 'getIndexResources')
                .then(function (response) {
                    console.log(response.data);
                    $scope.categories = response.data.categories;
                    $scope.articles = response.data.articles;
                });
    }

    $scope.GetResources();


});

