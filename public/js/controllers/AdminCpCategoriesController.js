app.controller('AdminCpCategoriesController', function ($scope, $http, $browser, $rootScope) {
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


    $scope.categories = {};
    $scope.currentCategory - {};
    $scope.errors = [];
    $scope.editFormState = false;

    $scope.GetLinks = function ()
    {
        $http.get($browser.baseHref() + api + 'admincp/categories') // edit if /public
                .then(function (response) {
                    console.log(response.data);
                    $scope.categories = response.data.categories;
                });
    }

    $scope.GetLinks();

    $scope.addFormToggle = function ()
    {
        $scope.addFormState = !$scope.addFormState;
    }

    $scope.insertCategory = function (categoryInfo)
    {
        $http.post($browser.baseHref() + api + 'admincp/categories/store', {"category_name": categoryInfo.category_name})
                .then(function success(e) {
                    $scope.addFormToggle();
                    $scope.categories.push(e.data);
                    $scope.GetLinks();
                    console.log(e.data);
                }, function error(error) {
                    $scope.errors.push(error.data.errors.category_name[0]);
                    console.log(error);
                    console.log($scope.errors);
                });
    }

    $scope.editFormToggle = function (info)
    {
        $scope.currentCategory = info;

        $scope.editFormState = !$scope.editFormState;
    }

    $scope.editFormChangeState = function ()
    {
        $scope.editFormState = !$scope.editFormState;
    }

    $scope.editCategory = function (currentCategory)
    {
        $http.put($browser.baseHref() + api + 'admincp/categories/update', {"id": currentCategory.id, "category_name": currentCategory.category_name})
                .then(function success(e) {
                    $scope.editFormChangeState();
                    $scope.categories.push(e.data);
                    $scope.GetLinks();
                    console.log(e.data);
                }, function error(error) {
                    $scope.errors.push(error.data.errors.category_name[0]);
                    console.log(error);
                });
    }

    $scope.deleteCategory = function (currentCategory)
    {
        var conf = confirm('Are you sure you want to delete this category?');

        if (conf === true) {
            $http.delete($browser.baseHref() + api + 'admincp/categories/delete/' + currentCategory.id)
                    .then(function success(e) {
                        $scope.categories.splice(currentCategory.id, 1);
                        $scope.GetLinks();
                        console.log(e.data);
                    }, function error(error) {
                        console.log(error);
                    });
        }
    }

});