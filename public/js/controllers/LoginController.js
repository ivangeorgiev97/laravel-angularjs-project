app.controller('LoginController', function ($scope, $http, $browser) {
    var api = 'api/';

    $scope.errors = [];

    $scope.loginFormState = true;

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

    $scope.GetLinks = function ()
    {
        $http.get($browser.baseHref() + api + 'login') // edit if /public
                .then(function (response) {
                    console.log(response.data);
                    $scope.links = response.data;
                });
    }

    $scope.loginUser = function (userInfo)
    {
        $http.post($browser.baseHref() + api + 'auth/login', {"email": userInfo.email, "password": userInfo.password})
                .then(function success(e) {
                    $scope.successMsg = "Success!";
                    $scope.loginFormState = false;
                    $scope.loginDivState = !$scope.loginDivState;



                    console.log(e.data);
                }, function error(error) {
                    $scope.errors = [];

                    $scope.errors.push(error.data.error);
//                    if (error.data.errors.email) {
//                        $scope.errors.push(error.data.errors.email[0]);
//                    }
//                    if (error.data.errors.password) {
//                        $scope.errors.push(error.data.errors.password[0]);
//                    }

                    // $scope.errors.push(error.data);
                    console.log(error);
                    console.log($scope.errors);
                    // $scope.recordErrors(error);
                });
    }

    $scope.GetLinks();
});