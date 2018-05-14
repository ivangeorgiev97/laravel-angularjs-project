// public/scripts/userController.js

(function () {

    'use strict';

    angular
            .module('LaravelAngularJS')
            .controller('UserController', UserController);

    function UserController($http, $auth, $rootScope) {

        var vm = this;

        vm.users;
        vm.error;

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

        vm.getUsers = function () {

            // This request will hit the index method in the AuthenticateController
            // on the Laravel side and will return the list of users
//            $http.get('api/authenticate').success(function (users) {
//                vm.users = users;
//            }).error(function (error) {
//                vm.error = error;
//            });

            $http.get('api/authenticate').then(function (response) {
                console.log(response.data);
                vm.users = response.data;
            }, function error(error) {
                vm.error = error;
                console.log(error);

                // $scope.recordErrors(error);
            });

//            function successCallback(users) {
//                vm.users = users;
//                console.log(users);
//            }
//            function errorCallback(error) {
//                vm.error = error;
//            }
        }

        vm.logout = function () {

            $auth.logout().then(function () {

                // Remove the authenticated user from local storage
                localStorage.removeItem('user');

                // Flip authenticated to false so that we no longer
                // show UI elements dependant on the user being logged in
                $rootScope.authenticated = false;

                // Remove the current user info from rootscope
                $rootScope.currentUser = null;

                $rootScope.isNotLogged = true;
                $rootScope.isAdmin = false;

            //    $state.go('users');
            });
        }


    }

})();