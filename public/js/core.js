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


    function redirectWhenLoggedOut($q, $injector) {

        return {

            responseError: function (rejection) {
                var $state = $injector.get('$state');
                var rejectionReasons = ['token_not_provided', 'token_expired', 'token_absent', 'token_invalid'];

                angular.forEach(rejectionReasons, function (value, key) {

                    if (rejection.data.error === value) {
                        localStorage.removeItem('user');

                        $state.go('auth');
                    }
                });

                return $q.reject(rejection);
            }
        }
    }

    $provide.factory('redirectWhenLoggedOut', redirectWhenLoggedOut);

    $httpProvider.interceptors.push('redirectWhenLoggedOut');

    $authProvider.loginUrl = '/api/auth/login';

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

        $rootScope.$on('$stateChangeStart', function (event, toState) {

            var user = JSON.parse(localStorage.getItem('user'));

            if (user) {
                $rootScope.authenticated = true;
                $rootScope.isNotLogged = false;
                $rootScope.currentUser = user;

                if (toState.name === "auth") {
                    event.preventDefault();

                    $state.go('users');
                }
            } else {
                $rootScope.authenticated = false;
                $rootScope.isAdmin = false;
                $rootScope.isNotLogged = true;
            }
        });

    });



});