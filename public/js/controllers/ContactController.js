app.controller('ContactController', function ($scope, $http, $browser, $routeParams, $rootScope) {
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
    
    $scope.successMsg;
    $scope.errors = [];

    $scope.sendEmail = function (contactInfo)
    {
        $http.post($browser.baseHref() + api + 'contact/send',
                {"email": contactInfo.email, "subject": contactInfo.subject, "message": contactInfo.message})
                .then(function success(e) {
                    $scope.successMsg = e.data.success;
                    console.log(e.data);
                }, function error(error) {
                    $scope.errors.push(error.data.errors.email[0]);
                    $scope.errors.push(error.data.errors.subject[0]);
                    $scope.errors.push(error.data.errors.message[0]);
                    console.log(error);
                    console.log($scope.errors);
                });
    }


});