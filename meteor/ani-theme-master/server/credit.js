Meteor.methods({
    'credit.list':function(){
        var response=HTTP.call( 'GET', 'http://localhost:9000/credits');
        return response;
    },
    'credit.add':function(json){
        var response=HTTP.call( 'POST', 'http://localhost:9000/credits',{data:json});
        return response;
    },
    'credit.remove':function(id){
        var response=HTTP.call( 'DELETE', 'http://localhost:9000/credits/id/'+id);
        return response;
    },
    'credit.update':function(json){
        var response=HTTP.call( 'PUT', 'http://localhost:9000/credits',{data:json});
        return response;
    },
    'credit.listWithProject':function(projectid){
        var response=HTTP.call( 'GET', 'http://localhost:9000/credits/project/'+projectid);
        return response;
    }
});