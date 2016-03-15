Debit=new Mongo.Collection();

Template.debit.rendered = function () {
    Meteor.call('debit.list',function(err,response){
        if(err)
            alert(err);
        //Session.set('projects',response.data);
        Debit._collection.remove({});
        for(var i=0;i<response.data.length;i++)
            Debit._collection.insert(response.data[i]);
    });

    Meteor.call('project.list',function(err,response){
        console.log(response);
        if(err)
            alert(err);
        Session.set('projects',response.data);
    });


};

Template.debit.helpers({
    debits:function(){
        //return Session.get("projects");
        return Debit.find();
    },
    projects:function(){
        return Session.get('projects');
    }
});

Template.debit.events({
    'click #add':function(e){
        Template.debitmodal.configureAddModal();
        Modal.show('debitmodal');
    },
    'click #edit':function(){
        Template.debitmodal.configureEditModal(this);
        Modal.show('debitmodal');
    },
    'click #del':function(){
        if(!confirm("确定删除吗?"))
            return;
        var self=this;
        Meteor.call('debit.remove',this.id,function(err,r){
            if(err)
                alert(err);
            else{
                Debit._collection.remove({id:self.id});
            }
        });
    },
    'change #select_project_id':function(evt){
        Meteor.call('debit.listWithProject',$(evt.target).val(),function(err,response){
            if(err)
                alert(err);
            //Session.set('projects',response.data);
            Debit._collection.remove({});
            for(var i=0;i<response.data.length;i++)
                Debit._collection.insert(response.data[i]);
        });
    }
});
  
