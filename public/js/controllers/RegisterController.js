app.controller('RegisterController', function ($scope, $http, $browser, $rootScope) {
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

    $scope.errors = [];
    $scope.successMsg = null;
    $scope.registerFormState = true;

    $scope.GetLinks = function ()
    {
        $http.get($browser.baseHref() + api + 'register') // edit if /public
                .then(function (response) {
                    console.log(response.data);
                    $scope.links = response.data;
                });
    }

    $scope.GetLinks();

    $scope.insertUser = function (userInfo)
    {
        $http.post($browser.baseHref() + api + 'register', {"email": userInfo.email, "name": userInfo.name, "password": userInfo.password, "passwordConfirmed": userInfo.passwordConfirmed})
                .then(function success(e) {
                    $scope.successMsg = "Success!";
                    $scope.registerFormState = false;
                    $scope.loginDivState = !$scope.loginDivState;
                    console.log(e.data);
                }, function error(error) {
                    $scope.errors = [];

                    if (error.data.errors.name) {
                        $scope.errors.push(error.data.errors.name[0]);
                    }
                    if (error.data.errors.email) {
                        $scope.errors.push(error.data.errors.email[0]);
                    }
                    if (error.data.errors.password) {
                        $scope.errors.push(error.data.errors.password[0]);
                    }
                    if (error.data.errors.passwordConfirmed) {
                        $scope.errors.push(error.data.errors.passwordConfirmed[0]);
                    }

                    // $scope.errors.push(error.data);
                    // console.log(error);
                    console.log($scope.errors);
                    // $scope.recordErrors(error);
                });
    }
});