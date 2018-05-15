<!DOCTYPE html>
<html lang="{{ config('app.locale') }}">
    
    <head>        
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        
        <!-- CSRF Token -->
        <meta name="csrf-token" content="{{ csrf_token() }}">

        <title>Laravel and AngularJS project</title>

        <!-- Styles -->
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
        <link rel="stylesheet" href="{{ asset('css/style.css') }}"

        <!-- Scripts -->
        <script>
            window.Laravel = {!! json_encode([
                    'csrfToken' => csrf_token(),
            ]) !!}
            ;
        </script>
    </head>
    
    <body ng-app="LaravelAngularJS">

        <div id="nav">
            <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
                <a class="navbar-brand" href="#">Laravel-AngularJS</a>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div class="navbar-nav">
                        <a class="nav-item nav-link {{ (\Request::route()->getName() == 'index') ? 'active' : '' }}" href="{{ asset('#/!') }}">Home</a>
                       <!-- <a class="nav-item nav-link {{ (\Request::route()->getName() == 'about') ? 'active' : '' }}" href="{{ asset('/gallery') }}">Gallery</a> -->
                        <a class="nav-item nav-link {{ (\Request::route()->getName() == 'contact') ? 'active' : '' }}" href="{{ asset('#!/contact') }}">Contact</a>
                        
                        <a ng-show="isNotLogged" class="nav-item nav-link {{ (\Request::route()->getName() == 'login') ? 'active' : '' }}" href="{{ asset('#!/auth') }}">Login</a>
                        <a ng-show="isNotLogged" class="nav-item nav-link {{ (\Request::route()->getName() == 'register-user') ? 'active' : '' }}" href="{{ asset('#!/registration') }}">Registration</a>
                       
                        <a ng-show="isAdmin" class="nav-item nav-link {{ (\Request::route()->getName() == 'admincp') ? 'active' : '' }}" href="{{ asset('#!/admincp') }}">Admin Panel</a>
                       
                        <a ng-show="authenticated" class="nav-item nav-link {{ (\Request::route()->getName() == 'logout') ? 'active' : '' }}" href="{{ asset('#!/users') }}">User</a>
                     
                        
                    </div>
                </div>
            </nav> 
        </div>
        
        @verbatim
        <div ng-view id="content" class="container bg-light">
        </div>
        @endverbatim

        <div id="footer" class="bg-light">
            <footer>
                &copy; 2018 Ivan Georgiev 
            </footer>
        </div>

        <!-- Scripts -->
        <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
        <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.6.9/angular.min.js"></script>
        <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.6.9/angular-route.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/ngStorage/0.3.10/ngStorage.min.js"></script>
        <script src="//unpkg.com/@uirouter/angularjs/release/angular-ui-router.min.js"></script>
        <script src="https://cdn.jsdelivr.net/satellizer/0.15.5/satellizer.min.js"></script>
        <script src="{{ asset('js/core.js') }}"></script>
        <script src="{{ asset('js/controllers/HomeController.js')}}"></script>
        <script src="{{ asset('js/controllers/ArticleController.js')}}"></script>
        <script src="{{ asset('js/controllers/ArticlesByCategoryController.js')}}"></script>
        <script src="{{ asset('js/controllers/AdminCpController.js')}}"></script>
        <script src="{{ asset('js/controllers/AdminCpCategoriesController.js')}}"></script>
        <script src="{{ asset('js/controllers/AdminCpArticlesController.js')}}"></script>
        <script src="{{ asset('js/controllers/RegisterController.js')}}"></script>
        <script src="{{ asset('js/controllers/LoginController.js')}}"></script>
        <script src="{{ asset('js/controllers/authController.js')}}"></script>
        <script src="{{ asset('js/controllers/userController.js')}}"></script>
        <script src="{{ asset('js/controllers/ContactController.js')}}"></script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
        <script src="{{ asset('js/script.js') }}"></script>
    </body>
</html>