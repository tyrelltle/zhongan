/*global define */

'use strict';

define(['angular','angular-chart'],function(angular) {

    var projc = angular.module('myApp.analytics',['ui.bootstrap','chart.js']);
    projc.controller('analyticscontroller', ['$scope','$location','$http',
        //this is the controller for Computer Management tab
        function($scope,$location,$http) {
            $scope.summaries=[];

            $http.get("/analytics").then(function successCallback(response) {
                $scope.summaries=response.data;

                $scope.series=["收入","支出"];
                $scope.labels=[];
                var credits=[];
                var debits=[];
                for(var i=0;i<response.data.length;i++){
                    $scope.labels.push(response.data[i].projectname);
                    credits.push(response.data[i].credit);
                    debits.push(response.data[i].debit);
                }
                $scope.data=[credits,debits];
                $scope.chartoptions={responsive:true,maintainAspectRatio: true};

            }, function errorCallback(response) {
                alert(response);
            });

        }]);

});