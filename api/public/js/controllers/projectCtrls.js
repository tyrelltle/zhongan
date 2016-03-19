/*global define */

'use strict';

define(['angular'],function(angular) {

    var projc = angular.module('myApp.project',['ui.bootstrap']);
    projc.controller('projectcontroller', ['$scope','$location','$http','$uibModal',
        //this is the controller for Computer Management tab
        function($scope,$location,$http,$uibModal) {
            $scope.projects=[];



            $http.get("/projects").then(function successCallback(response) {
                $scope.projects=response.data;
            }, function errorCallback(response) {
                alert(response);
            });



            $scope.remove=function(id,index){
                $http.delete("/projects/id/"+id).then(function successCallback(response) {
                    $scope.projects.splice(index,1);
                }, function errorCallback(response) {
                    alert(response);
                });
            }

            $scope.edit=function(id,index){
                $uibModal.open({
                    templateUrl: 'projectmodal.html',
                    controller:'EditModalCtrl',
                    scope:$scope,
                    size: 'lg',
                    resolve:{
                        mode:function(){return 'edit'},
                        id:function(){return id;},
                        index:function(){return index;},
                        projects:function(){return $scope.projects;}
                    }
                });
            }

            $scope.add=function() {
                $uibModal.open({
                    templateUrl: 'projectmodal.html',
                    controller: 'EditModalCtrl',
                    scope: $scope,
                    size: 'lg',
                    resolve: {
                        mode: function () {
                            return 'new'
                        },
                        id:function(){return 'any';},
                        index:function(){return 'any';},
                        projects: function () {
                            return $scope.projects;
                        }
                    }
                });
            }
        }]);


    projc.controller('EditModalCtrl', ['$scope', '$http','id','index','projects','$uibModalInstance','mode',
        //this is the controller for Computer Management tab
        function($scope,$http,id,index,projects,$uibModalInstance,mode) {
            $scope.projects=projects;
            if(mode=='edit')
                $scope.project=projects[index];
            else if(mode=='new')
                $scope.project={};

            $scope.ok=function(){
                if(mode=='edit') {
                    $http.put("/projects", $scope.project).then(function successCallback(response) {
                        alert('成功!');
                    }, function errorCallback(response) {
                        alert(response);
                    });
                }else if(mode=='new'){
                    $http.post("/projects",$scope.project).then(function successCallback(response) {
                        alert('成功!');
                        projects.push($scope.project);
                    }, function errorCallback(response) {
                        alert(response);
                    });
                }
            }


            $scope.cancel=function() {
                $uibModalInstance.dismiss('cancel');
            }

        }]);





});