/*global define */

'use strict';

define(['angular'],function(angular) {

    var projc = angular.module('myApp.credit',['ui.bootstrap']);
    projc.controller('creditcontroller', ['$scope','$location','$http','$uibModal',
        //this is the controller for Computer Management tab
        function($scope,$location,$http,$uibModal) {
            $scope.credits=[];
            $scope.projects=[];

            $scope.$watch('credits', function(newv,oldv) {
                if(newv)
                    newv.forEach(function(v){
                        if(!(v.recieptdate instanceof Date))
                            v.recieptdate=new Date(v.recieptdate);
                        if(!(v.paydate instanceof Date))
                            v.paydate=new Date(v.paydate);
                    });
            });

            $scope.$watch('project', function(newv,oldv) {
                if(newv)
                    $http.get("/credits/project/"+newv).then(function successCallback(response) {
                        $scope.credits=response.data;
                    }, function errorCallback(response) {
                        alert(response);
                    });
                else
                    $http.get("/credits").then(function successCallback(response) {
                        $scope.credits=response.data;
                    }, function errorCallback(response) {
                        alert(response);
                    });
            });

            $scope.toDateString=function(date){
                return (date.getFullYear()) +'-'+ (date.getMonth()+1)+'-'+date.getDate();
            }



            $http.get("/projects").then(function successCallback(response) {
                $scope.projects=response.data;
            }, function errorCallback(response) {
                alert(response);
            });

            $scope.remove=function(id,index){
                $http.delete("/credits/id/"+id).then(function successCallback(response) {
                    $scope.credits.splice(index,1);
                }, function errorCallback(response) {
                    alert(response);
                });
            }

            $scope.edit=function(id,index){
                $uibModal.open({
                    templateUrl: 'creditmodal.html',
                    controller:'CreditEditModalCtrl',
                    scope:$scope,
                    size: 'lg',
                    resolve:{
                        mode:function(){return 'edit'},
                        id:function(){return id;},
                        index:function(){return index;},
                        credits:function(){return $scope.credits;},
                        projects:function(){return $scope.projects}
                    }
                });
            }

            $scope.add=function() {
                $uibModal.open({
                    templateUrl: 'creditmodal.html',
                    controller: 'CreditEditModalCtrl',
                    scope: $scope,
                    size: 'lg',
                    resolve: {
                        mode: function () {
                            return 'new'
                        },
                        id:function(){return 'any';},
                        index:function(){return 'any';},
                        credits: function () {
                            return $scope.credits;
                        },
                        projects:function(){return $scope.projects}
                    }
                });
            }
        }]);


    projc.controller('CreditEditModalCtrl', ['$scope', '$http','id','index','credits','$uibModalInstance','mode','projects',
        //this is the controller for Computer Management tab
        function($scope,$http,id,index,credits,$uibModalInstance,mode,projects) {
            $scope.credits=credits;
            $scope.projects=projects;
            if(mode=='edit')
                $scope.credit=credits[index];
            else if(mode=='new')
                $scope.credit={};


            $scope.ok=function(){

                function toDateString(date){
                    return (date.getFullYear()) +'-'+ (date.getMonth()+1)+'-'+date.getDate();
                }
                var data=JSON.parse(JSON.stringify($scope.credit));
                data.paydate= toDateString($scope.credit.paydate);
                data.recieptdate= toDateString($scope.credit.recieptdate);


                if(mode=='edit') {
                    $http.put("/credits",data).then(function successCallback(response) {
                        alert('成功!');
                        for(var i=0;i<projects.length;i++){
                            if(projects[i].id==data.project_id){
                                $scope.credit.project={name:projects[i].name,contract:projects[i].contract};
                                break;
                            }
                        }
                    }, function errorCallback(response) {
                        alert(response);
                    });
                }else if(mode=='new'){
                    $http.post("/credits",data).then(function successCallback(response) {
                        alert('成功!');
                        for(var i=0;i<projects.length;i++){
                            if(projects[i].id==data.project_id){
                                $scope.credit.project={name:projects[i].name,contract:projects[i].contract};
                                break;
                            }
                        }
                        credits.push($scope.credit);
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