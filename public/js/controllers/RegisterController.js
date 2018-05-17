app.controller('RegisterController', function ($scope, $http, $browser, $rootScope) {
    
    // TODO: Add error msg to show user that is already registred if it is already logged in. 
    
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

                    console.log($scope.errors);
                });
    }
});