Credit=new Mongo.Collection();

Template.credit.rendered = function () {
    Meteor.call('credit.list',function(err,response){
        if(err)
            alert(err);
        //Session.set('projects',response.data);
        Credit._collection.remove({});
        for(var i=0;i<response.data.length;i++)
            Credit._collection.insert(response.data[i]);
    });

    Meteor.call('project.list',function(err,response){
        console.log(response);
        if(err)
            alert(err);
        Session.set('projects',response.data);
    });


};

Template.credit.helpers({
    credits:function(){
        //return Session.get("projects");
        return Credit.find();
    },
    projects:function(){
        return Session.get('projects');
    }
});

Template.credit.events({
    'click #add':function(e){
        Template.creditmodal.configureAddModal();
        Modal.show('creditmodal');
    },
    'click #edit':function(){
        Template.creditmodal.configureEditModal(this);
        Modal.show('creditmodal');
    },
    'click #del':function(){
        if(!confirm("确定删除吗?"))
            return;
        var self=this;
        Meteor.call('credit.remove',this.id,function(err,r){
            if(err)
                alert(err);
            else{
                Credit._collection.remove({id:self.id});
            }
        });
    },
    'change #select_project_id':function(evt){
        Meteor.call('credit.listWithProject',$(evt.target).val(),function(err,response){
            if(err)
                alert(err);
            //Session.set('projects',response.data);
            Credit._collection.remove({});
            for(var i=0;i<response.data.length;i++)
                Credit._collection.insert(response.data[i]);
        });
    }
});
  
