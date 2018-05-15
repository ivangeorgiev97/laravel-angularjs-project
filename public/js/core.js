var app = angular.module('LaravelAngularJS', ['ngRoute', 'ngStorage', 'ui.router', 'satellizer']).constant('urls', {
    BASE: 'http://127.0.0.1:8000',
    BASE_API: 'http://127.0.0.1:800/api'
});

app.config(function ($routeProvider, $httpProvider, $stateProvider, $urlRouterProvider, $authProvider, $provide) {
    $routeProvider.
            when('/', {
                templateUrl: 'templates/home.html',
                controller: 'HomeController'
            })
            .when('/page', {
                templateUrl: 'templates/page.html',
                controller: 'PageController'
            })
            .when('/article/:id', {
                templateUrl: 'templates/currentArticle.html',
                controller: 'ArticleController'
            })
            .when('/article/byCategory/:categoryId', {
                templateUrl: 'templates/articlesByCategory.html',
                controller: 'ArticlesByCategoryController'
            })
            .when('/admincp', {
                templateUrl: 'templates/admincp/index.html',
                controller: 'AdminCpController'
            })
            .when('/admincp/categories', {
                templateUrl: 'templates/admincp/categories.html',
                controller: 'AdminCpCategoriesController'
            })
            .when('/admincp/articles', {
                templateUrl: 'templates/admincp/articles.html',
                controller: 'AdminCpArticlesController'
            })
            .when('/registration', {
                templateUrl: 'templates/registration.html',
                controller: 'RegisterController'
            })
            .when('/login', {
                templateUrl: 'templates/login.html',
                controller: 'LoginController'
            })
            .when('/auth', {
                templateUrl: 'templates/authView.html',
                controller: 'AuthController as auth'
            }).
            when('/users', {
                templateUrl: 'templates/userView.html',
                controller: 'UserController as user'
            }).
            when('/signin', {
                templateUrl: 'templates/signin.html',
                controller: 'HomeAuthController'
            }).
            when('/signup', {
                templateUrl: 'templates/signup.html',
                controller: 'HomeAuthController'
            }).
            when('/restricted', {
                templateUrl: 'templates/restricted.html',
                controller: 'RestrictedController'
            })
            .when('/contact', {
                templateUrl: 'templates/contact.html',
                controller: 'ContactController'
            })
//            .otherwise({
//                redirectTo: '/'
//            });

//    $rootScope.isNotLogged = true;
//
//    var user = JSON.parse(localStorage.getItem('user'));
//
//    // If there is any user data in local storage then the user is quite
//    // likely authenticated. If their token is expired, or if they are
//    // otherwise not actually authenticated, they will be redirected to
//    // the auth state because of the rejected request anyway
//    if (user) {
//
//        // The user's authenticated state gets flipped to
//        // true so we can now show parts of the UI that rely
//        // on the user being logged in
//        $rootScope.authenticated = true;
//        $rootScope.isNotLogged = false;
//
//
//        // Putting the user's data on $rootScope allows
//        // us to access it anywhere across the app. Here
//        // we are grabbing what is in local storage
//        $rootScope.currentUser = user;
//
//        // If the user is logged in and we hit the auth route we don't need
//        // to stay there and can send the user to the main state
//        if (toState.name === "auth") {
//
//            // Preventing the default behavior allows us to use $state.go
//            // to change states
//            event.preventDefault();
//
//            // go to the "main" state which in our case is users
//            $state.go('users');
//        }
//    } else {
//        $rootScope.authenticated = false;
//        $rootScope.isAdmin = false;
//        $rootScope.isNotLogged = true;
//    }


//    $httpProvider.interceptors.push(['$q', '$location', '$localStorage', function ($q, $location, $localStorage) {
//            return {
//                'request': function (config) {
//                    config.headers = config.headers || {};
//                    if ($localStorage.token) {
//                        config.headers.Authorization = 'Bearer ' + $localStorage.token;
//                    }
//                    return config;
//                },
//                'responseError': function (response) {
//                    if (response.status === 401 || response.status === 403) {
//                        $location.path('/signin');
//                    }
//                    return $q.reject(response);
//                }
//            };
//        }]);

    // Satellizer configuration that specifies which API
    // route the JWT should be retrieved from
    //   $authProvider.loginUrl = '/api/authenticate';


    function redirectWhenLoggedOut($q, $injector) {

        return {

            responseError: function (rejection) {

                // Need to use $injector.get to bring in $state or else we get
                // a circular dependency error
                var $state = $injector.get('$state');

                // Instead of checking for a status code of 400 which might be used
                // for other reasons in Laravel, we check for the specific rejection
                // reasons to tell us if we need to redirect to the login state
                var rejectionReasons = ['token_not_provided', 'token_expired', 'token_absent', 'token_invalid'];

                // Loop through each rejection reason and redirect to the login
                // state if one is encountered
                angular.forEach(rejectionReasons, function (value, key) {

                    if (rejection.data.error === value) {

                        // If we get a rejection corresponding to one of the reasons
                        // in our array, we know we need to authenticate the user so 
                        // we can remove the current user from local storage
                        localStorage.removeItem('user');

                        // Send the user to the auth state so they can login
                        $state.go('auth');
                    }
                });

                return $q.reject(rejection);
            }
        }
    }

    // Setup for the $httpInterceptor
    $provide.factory('redirectWhenLoggedOut', redirectWhenLoggedOut);

    // Push the new factory onto the $http interceptor array
    $httpProvider.interceptors.push('redirectWhenLoggedOut');

    //  $authProvider.loginUrl = '/api/authenticate';


    $authProvider.loginUrl = '/api/auth/login';
//
//    // Redirect to the auth state if any other states
//    // are requested other than users
//    //  $urlRouterProvider.otherwise('/auth');
//
    $stateProvider
            .state('auth', {
                url: '/auth',
                templateUrl: 'templates/authView.html',
                controller: 'AuthController as auth'
            })
            .state('users', {
                url: '/users',
                templateUrl: 'templates/userView.html',
                controller: 'UserController as user'
            });

    app.run(function ($rootScope, $state) {



        $rootScope.isNotLogged = true;
        // $stateChangeStart is fired whenever the state changes. We can use some parameters
        // such as toState to hook into details about the state as it is changing
        $rootScope.$on('$stateChangeStart', function (event, toState) {

            // Grab the user from local storage and parse it to an object
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

                // If the user is logged in and we hit the auth route we don't need
                // to stay there and can send the user to the main state
                if (toState.name === "auth") {

                    // Preventing the default behavior allows us to use $state.go
                    // to change states
                    event.preventDefault();

                    // go to the "main" state which in our case is users
                    $state.go('users');
                }
            } else {
                $rootScope.authenticated = false;
                $rootScope.isAdmin = false;
                $rootScope.isNotLogged = true;
            }
        });

    });


//    app.controller('HomeAuthController', ['$rootScope', '$scope', '$location', '$localStorage', 'Auth',
//        function ($rootScope, $scope, $location, $localStorage, Auth) {
//            function successAuth(res) {
//                $localStorage.token = res.token;
//                window.location = "/";
//            }
//
//            $scope.signin = function () {
//                var formData = {
//                    email: $scope.email,
//                    password: $scope.password
//                };
//
//                Auth.signin(formData, successAuth, function () {
//                    $rootScope.error = 'Invalid credentials.';
//                })
//            };
//
//            $scope.signup = function () {
//                var formData = {
//                    email: $scope.email,
//                    password: $scope.password
//                };
//
//                Auth.signup(formData, successAuth, function () {
//                    $rootScope.error = 'Failed to signup';
//                })
//            };
//
//            $scope.logout = function () {
//                Auth.logout(function () {
//                    window.location = "/"
//                });
//            };
//            $scope.token = $localStorage.token;
//            $scope.tokenClaims = Auth.getTokenClaims();
//        }])
//
//    app.controller('RestrictedController', ['$rootScope', '$scope', 'Data', function ($rootScope, $scope, Data) {
//            Data.getRestrictedData(function (res) {
//                $scope.data = res.data;
//            }, function () {
//                $rootScope.error = 'Failed to fetch restricted content.';
//            });
//            Data.getApiData(function (res) {
//                $scope.api = res.data;
//            }, function () {
//                $rootScope.error = 'Failed to fetch restricted API content.';
//            });
//        }]);
//
//    app.factory('Auth', ['$http', '$localStorage', 'urls', function ($http, $localStorage, urls) {
//            function urlBase64Decode(str) {
//                var output = str.replace('-', '+').replace('_', '/');
//                switch (output.length % 4) {
//                    case 0:
//                        break;
//                    case 2:
//                        output += '==';
//                        break;
//                    case 3:
//                        output += '=';
//                        break;
//                    default:
//                        throw 'Illegal base64url string!';
//                }
//                return window.atob(output);
//            }
//
//            function getClaimsFromToken() {
//                var token = $localStorage.token;
//                var user = {};
//                if (typeof token !== 'undefined') {
//                    var encoded = token.split('.')[1];
//                    user = JSON.parse(urlBase64Decode(encoded));
//                }
//                return user;
//            }
//
//            var tokenClaims = getClaimsFromToken();
//
//            return {
//                signup: function (data, success, error) {
//                    $http.post(urls.BASE + '/signup', data).success(success).error(error)
//                },
//                signin: function (data, success, error) {
//                    $http.post(urls.BASE + '/signin', data).success(success).error(error)
//                },
//                logout: function (success) {
//                    tokenClaims = {};
//                    delete $localStorage.token;
//                    success();
//                },
//                getTokenClaims: function () {
//                    return tokenClaims;
//                }
//            };
//        }
//    ]);
//    
//    app.factory('Data', ['$http', 'urls', function ($http, urls) {
//
//       return {
//           getRestrictedData: function (success, error) {
//               $http.get(urls.BASE + '/restricted').success(success).error(error)
//           },
//           getApiData: function (success, error) {
//               $http.get(urls.BASE_API + '/restricted').success(success).error(error)
//           }
//       };
//   }
//   ]);
//

});