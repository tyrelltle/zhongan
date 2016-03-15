Meteor.methods({
    'debit.list':function(){
        var response=HTTP.call( 'GET', 'http://localhost:9000/debits');
        return response;
    },
    'debit.add':function(json){
        var response=HTTP.call( 'POST', 'http://localhost:9000/debits',{data:json});
        return response;
    },
    'debit.remove':function(id){
        var response=HTTP.call( 'DELETE', 'http://localhost:9000/debits/id/'+id);
        return response;
    },
    'debit.update':function(json){
        var response=HTTP.call( 'PUT', 'http://localhost:9000/debits',{data:json});
        return response;
    },
    'debit.listWithProject':function(projectid){
        var response=HTTP.call( 'GET', 'http://localhost:9000/debits/project/'+projectid);
        return response;
    }
});