Meteor.methods({
    'project.list':function(){
        var response=HTTP.call( 'GET', 'http://localhost:9000/projects');
        return response;
    },
    'project.add':function(json){
        var response=HTTP.call( 'POST', 'http://localhost:9000/projects',{data:json});
        return response;
    },
    'project.remove':function(id){
        var response=HTTP.call( 'DELETE', 'http://localhost:9000/projects/id/'+id);
        return response;
    },
    'project.update':function(json){
        var response=HTTP.call( 'PUT', 'http://localhost:9000/projects',{data:json});
        return response;
    }
});