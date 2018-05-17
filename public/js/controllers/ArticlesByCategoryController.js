app.controller('ArticlesByCategoryController', function ($scope, $http, $browser, $routeParams, $rootScope) {
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

    $scope.GetArticlesByCategory = function ()
    {
        $http.get($browser.baseHref() + api + 'article/byCategory/' + $routeParams.categoryId) // edit if /public
                .then(function (response) {
                    console.log(response.data);
                    $scope.articles = response.data.articles;
                });
    }

    $scope.GetArticlesByCategory();


});