/*global define */

'use strict';

define(['angular'],function(angular,jq) {

    var loginctrls = angular.module('myApp.login',['ui.bootstrap']);
    loginctrls.controller('logincontroller', ['$scope','$location',
        //this is the controller for Computer Management tab
        function($scope,$location) {
           /* $(".login-page").addClass("ng-enter");
            setTimeout(function(){
                $(".login-page").addClass("ng-enter-active");
            }, 300);
            setTimeout(function(){
                $(".login-page").removeClass("ng-enter");
                $(".login-page").removeClass("ng-enter-active");
            }, 600);*/


        /*    $scope.login=function(){
               // $location.path('/dashboard');
                window.location.href='/dashboard';
            }*/

        }]);

    loginctrls.controller('dashboardcontroller', ['$scope','$location',
        //this is the controller for Computer Management tab
        function($scope,$location) {
            /* $(".login-page").addClass("ng-enter");
             setTimeout(function(){
             $(".login-page").addClass("ng-enter-active");
             }, 300);
             setTimeout(function(){
             $(".login-page").removeClass("ng-enter");
             $(".login-page").removeClass("ng-enter-active");
             }, 600);*/
        }]);

});