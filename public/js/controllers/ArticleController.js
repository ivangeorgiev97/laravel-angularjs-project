app.controller('ArticleController', function ($scope, $http, $browser, $routeParams, $rootScope) {
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

    $scope.GetArticle = function (id)
    {
        $http.get($browser.baseHref() + api + 'article/' + $routeParams.id) // edit if /public
                .then(function (response) {
                    console.log(response.data);
                    $scope.article = response.data;
                });
    }

    $scope.GetArticle();


});