Meteor.methods({
    'analytics.summary':function(){
        var response=HTTP.call( 'GET', 'http://localhost:9000/analytics');
        return response;
    }
});