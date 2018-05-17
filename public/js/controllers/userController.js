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

        vm.getUsers = function () {

            $http.get('api/authenticate').then(function (response) {
                console.log(response.data);
                vm.users = response.data;
            }, function error(error) {
                vm.error = error;
                console.log(error);
            });

        }

        vm.logout = function () {

            $auth.logout().then(function () {
                localStorage.removeItem('user');
                
                $rootScope.authenticated = false;
                $rootScope.currentUser = null;
                $rootScope.isNotLogged = true;
                $rootScope.isAdmin = false;
            });
        }


    }

})();