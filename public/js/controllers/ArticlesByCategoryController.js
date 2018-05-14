app.controller('ArticlesByCategoryController', function ($scope, $http, $browser, $routeParams, $rootScope) {
    var api = 'api/';
    
    $rootScope.isNotLogged = true;

    var user = JSON.parse(localStorage.getItem('user'));

    // If there is any user data in local storage then the user is quite
    // likely authenticated. If their token is expired, or if they are
    // otherwise not actually authenticated, they will be redirected to
    // the auth state because of the rejected request anyway
    if (user) {

        // The user's authenticated state gets flipped to
        // true so we can now show parts of the UI that rely
        // on the user being logged in
        $rootScope.authenticated = true;
        $rootScope.isNotLogged = false;

        // Putting the user's data on $rootScope allows
        // us to access it anywhere across the app. Here
        // we are grabbing what is in local storage
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