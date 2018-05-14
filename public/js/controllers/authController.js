(function () {

    'use strict';

    angular
            .module('LaravelAngularJS')
            .controller('AuthController', AuthController);

    function AuthController($auth, $state, $http, $rootScope, $scope) {
        
       $rootScope.isNotLogged = true;
//        $scope.isNotLogged = true;
//        $scope.isAdmin = false;

        var vm = this;

        vm.loginError = false;
        vm.loginErrorText;


        vm.login = function () {

            var credentials = {
                email: vm.email,
                password: vm.password
            }

            // Use Satellizer's $auth service to login
            $auth.login(credentials).then(function () {

                // Return an $http request for the now authenticated
                // user so that we can flatten the promise chain
                return $http.get('api/authenticate/user');

                // Handle errors
            }, function (error) {
                vm.loginError = true;
                vm.loginErrorText = error.data.error;

                // Because we returned the $http.get request in the $auth.login
                // promise, we can chain the next promise to the end here
            }).then(function (response) {

                // Stringify the returned data to prepare it
                // to go into local storage
                var user = JSON.stringify(response.data.user);

                // Set the stringified user data into local storage
                localStorage.setItem('user', user);

                // The user's authenticated state gets flipped to
                // true so we can now show parts of the UI that rely
                // on the user being logged in
                $rootScope.isNotLogged = false;
            //    $scope.isNotLogged = false;
                $rootScope.authenticated = true;

                // Putting the user's data on $rootScope allows
                // us to access it anywhere across the app
                $rootScope.currentUser = response.data.user;
                if($rootScope.currentUser.isAdmin === 1) {
                    $rootScope.isAdmin = true;
                    $scope.isAadmin = true;
                }

                // Everything worked out so we can now redirect to
                // the users state to view the data
                $state.go('users');
            });
        }
    

}

})();