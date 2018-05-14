app.controller('AdminCpCategoriesController', function ($scope, $http, $browser, $rootScope) {
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
                    // $scope.recordErrors(error);
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
                    //    console.log($scope.errors);
                    // $scope.recordErrors(error);
                });
    }

    $scope.deleteCategory = function (currentCategory)
    {
        var conf = confirm('Are you sure you want to delete this category?');

        if (conf === true) {
            $http.delete($browser.baseHref() + api + 'admincp/categories/delete/' + currentCategory.id)
                    .then(function success(e) {
                        //  $scope.categories.push(e.data);
                        $scope.categories.splice(currentCategory.id, 1);
                        $scope.GetLinks();
                        console.log(e.data);
                    }, function error(error) {
                        // $scope.errors.push(error.data.errors.category_name[0]);
                        console.log(error);
                        //    console.log($scope.errors);
                        // $scope.recordErrors(error);
                    });
        }
    }

});