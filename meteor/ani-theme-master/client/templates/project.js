Project=new Mongo.Collection();

Template.project.rendered = function () {
    Meteor.call('project.list',function(err,response){
        console.log(response);
        if(err)
            alert(err);
        //Session.set('projects',response.data);
        Project._collection.remove({});
        for(var i=0;i<response.data.length;i++)
            Project._collection.insert(response.data[i]);
    });

};

Template.project.helpers({
    projects:function(){
        //return Session.get("projects");
        return Project.find();
    }
});

Template.project.events({
    'click #add':function(e){
        Template.projectmodal.configureAddModal();
        Modal.show('projectmodal');
    },
    'click #edit':function(){
        Template.projectmodal.configureEditModal(this);
        Modal.show('projectmodal');
    },
    'click #del':function(){
        if(!confirm("确定删除吗?"))
            return;
        var self=this;
        Meteor.call('project.remove',this.id,function(err,r){
            if(err)
                alert(err);
            else{
                Project._collection.remove({id:self.id});
            }
        });
    }
});
  
