
Template.analytics.rendered = function () {
    Meteor.call('analytics.summary',function(err,response){
        if(err)
            alert(err);
        Session.set('lines',response.data);
    });

};

Template.analytics.helpers({

    lines:function(){
        return Session.get('lines');
    }
});

