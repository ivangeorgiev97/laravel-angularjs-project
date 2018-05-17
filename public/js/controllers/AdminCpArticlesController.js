app.controller('AdminCpArticlesController', function ($scope, $http, $browser, $rootScope) {
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

    $scope.articles = {};
    $scope.categories = {};
    $scope.currentArticle - {};
    $scope.errors = [];
    $scope.editFormState = false;

    $scope.GetArticlesAndCategories = function ()
    {
        $http.get($browser.baseHref() + api + 'admincp/articles') // edit if /public
                .then(function (response) {
                    console.log(response.data);
                    $scope.articles = response.data.articles;
                    $scope.categories = response.data.categories;
                });
    }

    $scope.GetArticlesAndCategories();

    $scope.addFormToggle = function ()
    {
        $scope.addFormState = !$scope.addFormState;
    }

    $scope.insertArticle = function (articleInfo)
    {
        $http.post($browser.baseHref() + api + 'admincp/articles/store',
                {"title": articleInfo.title, "content": articleInfo.content, "category_id": articleInfo.category_id})
                .then(function success(e) {
                    $scope.addFormToggle();
                    $scope.articles.push(e.data);
                    $scope.GetArticlesAndCategories();
                    console.log(e.data);
                }, function error(error) {
                    $scope.errors.push(error.data.errors.title[0]);
                    $scope.errors.push(error.data.errors.content[0]);
                    $scope.errors.push(error.data.errors.category_id[0]);
                    console.log(error);
                    console.log($scope.errors);
                    // $scope.recordErrors(error);
                });
    }

    $scope.editFormToggle = function (info)
    {
        $scope.currentArticle = info;

        $scope.editFormState = !$scope.editFormState;
    }

    $scope.editFormChangeState = function ()
    {
        $scope.editFormState = !$scope.editFormState;
    }

    $scope.editArticle = function (currentArticle)
    {
        $http.put($browser.baseHref() + api + 'admincp/articles/update/' + currentArticle.id, {"id": currentArticle.id, "title": currentArticle.title, "content": currentArticle.content, "category_id": currentArticle.category_id})
                .then(function success(e) {
                    $scope.editFormChangeState();
                    $scope.articles.push(e.data);
                    $scope.GetArticlesAndCategories();
                    console.log(e.data);
                }, function error(error) {
                    $scope.errors.push(error.data.errors.title[0]);
                    $scope.errors.push(error.data.errors.content[0]);
                    $scope.errors.push(error.data.errors.category_id[0]);
                    console.log(error);
                    console.log($scope.errors);
                    //    console.log($scope.errors);
                });
    }

    $scope.deleteArticle = function (currentArticle)
    {
        var conf = confirm('Are you sure you want to delete this article?');

        if (conf === true) {
            $http.delete($browser.baseHref() + api + 'admincp/articles/delete/' + currentArticle.id)
                    .then(function success(e) {
                        //  $scope.categories.push(e.data);
                        $scope.articles.splice(currentArticle.id, 1);
                        $scope.GetArticlesAndCategories();
                        console.log(e.data);
                    }, function error(error) {
                        // $scope.errors.push(error.data.errors.category_name[0]);
                        console.log(error);
                        //    console.log($scope.errors);
                    });
        }
    }

});