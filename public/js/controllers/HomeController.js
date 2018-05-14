app.controller('HomeController', function ($scope, $http, $rootScope) {
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


//    $rootScope.linksGuestState = true;

    $scope.GetResources = function ()
    {
        $http.get(api + 'getIndexResources')
                .then(function (response) {
                    console.log(response.data);
                    $scope.categories = response.data.categories;
                    $scope.articles = response.data.articles;
                });
    }

    $scope.GetResources();

//    $scope.linksGuestState = function ()
//    {
//        $rootScope.linksGuestState = !$rootScope.linksGuestState;
//    }
//
//    if ($rootScope.authenticated === true) {
//        $rootScope.linksGuestState = true;
//    } else {
//        $rootScope.linksGuestState = false;
//    }




//    $scope.invoke = function (id) {
//        $http({
//            method: 'GET',
//            url: api + '/article/' + id
//        });
//    }



//    $scope.users = [];
//	$scope.editUser = {name: 'Gosho'};
//
//	$scope.GetUsers = function()
//	{
//		$http.get('https://jsonplaceholder.typicode.com/users')
//			 .then(function(response){
//			 	console.log(response.data);
//			 	$scope.users = response.data;
//			 });
//	}
//
//	$scope.GetUsers();
//
//	$scope.DeleteUser = function(index)
//	{
//		$scope.users.splice(index,1);
//	}
//
//	$scope.EditUser = function(index)
//	{
//		$scope.editUser = $scope.users[index];
//	}
//
//	$scope.AddUser = function()
//	{
//		//var user = $scope.users[0];
//		$scope.users.push({name: 'Gosho', username: 'Bret'});
//	}

});


/*class HomeController
 {
 public List<User> Users{get;set;}
 
 public List<User> GetUsers()
 {
 return List<
 }
 }*/