/*global define */

'use strict';

define(['angular'],function(angular) {

    var projc = angular.module('myApp.debit',['ui.bootstrap']);
    projc.controller('debitcontroller', ['$scope','$location','$http','$uibModal',
        //this is the controller for Computer Management tab
        function($scope,$location,$http,$uibModal) {
            $scope.debits=[];
            $scope.projects=[];

            $scope.$watch('debits', function(newv,oldv) {
                if(newv)
                    newv.forEach(function(v){
                        if(!(v.date instanceof Date))
                            v.date=new Date(v.date);
                    });
            });

            $scope.$watch('project', function(newv,oldv) {
                if(newv)
                    $http.get("/debits/project/"+newv).then(function successCallback(response) {
                        $scope.debits=response.data;
                    }, function errorCallback(response) {
                        alert(response);
                    });
                else
                    $http.get("/debits").then(function successCallback(response) {
                        $scope.debits=response.data;
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
                $http.delete("/debits/id/"+id).then(function successCallback(response) {
                    $scope.debits.splice(index,1);
                }, function errorCallback(response) {
                    alert(response);
                });
            }

            $scope.edit=function(id,index){
                $uibModal.open({
                    templateUrl: 'debitmodal.html',
                    controller:'DebitEditModalCtrl',
                    scope:$scope,
                    size: 'lg',
                    resolve:{
                        mode:function(){return 'edit'},
                        id:function(){return id;},
                        index:function(){return index;},
                        debits:function(){return $scope.debits;},
                        projects:function(){return $scope.projects}
                    }
                });
            }

            $scope.add=function() {
                $uibModal.open({
                    templateUrl: 'debitmodal.html',
                    controller: 'DebitEditModalCtrl',
                    scope: $scope,
                    size: 'lg',
                    resolve: {
                        mode: function () {
                            return 'new'
                        },
                        id:function(){return 'any';},
                        index:function(){return 'any';},
                        debits: function () {
                            return $scope.debits;
                        },
                        projects:function(){return $scope.projects}
                    }
                });
            }
        }]);


    projc.controller('DebitEditModalCtrl', ['$scope', '$http','id','index','debits','$uibModalInstance','mode','projects',
        //this is the controller for Computer Management tab
        function($scope,$http,id,index,debits,$uibModalInstance,mode,projects) {
            $scope.debits=debits;
            $scope.projects=projects;
            if(mode=='edit')
                $scope.debit=debits[index];
            else if(mode=='new')
                $scope.debit={};


            $scope.ok=function(){

                function toDateString(date){
                    return (date.getFullYear()) +'-'+ (date.getMonth()+1)+'-'+date.getDate();
                }
                var data=JSON.parse(JSON.stringify($scope.debit));
                data.date= toDateString($scope.debit.date);

                if(mode=='edit') {
                    $http.put("/debits",data).then(function successCallback(response) {
                        alert('成功!');
                        for(var i=0;i<projects.length;i++){
                            if(projects[i].id==data.project_id){
                                $scope.debit.project={name:projects[i].name,contract:projects[i].contract};
                                break;
                            }
                        }
                    }, function errorCallback(response) {
                        alert(response);
                    });
                }else if(mode=='new'){
                    $http.post("/debits",data).then(function successCallback(response) {
                        alert('成功!');
                        for(var i=0;i<projects.length;i++){
                            if(projects[i].id==data.project_id){
                                $scope.debit.project={name:projects[i].name,contract:projects[i].contract};
                                break;
                            }
                        }
                        debits.push($scope.debit);
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