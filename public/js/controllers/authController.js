(function () {

    'use strict';

    angular
            .module('LaravelAngularJS')
            .controller('AuthController', AuthController);

    function AuthController($auth, $state, $http, $rootScope, $scope) {
        
       $rootScope.isNotLogged = true;

        var vm = this;

        vm.loginError = false;
        vm.loginErrorText;


        vm.login = function () {

            var credentials = {
                email: vm.email,
                password: vm.password
            }

            $auth.login(credentials).then(function () {
                return $http.get('api/authenticate/user');

            }, function (error) {
                vm.loginError = true;
                vm.loginErrorText = error.data.error;

            }).then(function (response) {
                var user = JSON.stringify(response.data.user);

                localStorage.setItem('user', user);

                $rootScope.isNotLogged = false;
                $rootScope.authenticated = true;
                $rootScope.currentUser = response.data.user;
                
                if($rootScope.currentUser.isAdmin === 1) {
                    $rootScope.isAdmin = true;
                    $scope.isAadmin = true;
                }

                $state.go('users');
            });
        }
   
}

})();