Template.projectmodal.events({

    'click #confirmAdd':function(){
        var obj={
            name:$('#newProjectForm_name').val(),
            contract:$('#newProjectForm_contract').val(),
            price:$('#newProjectForm_price').val()
        };

        if(Session.get("updatemode")=="add") {
            Meteor.call('project.add', obj, function (err, response) {
                if (err)
                    alert(err);
                else {
                    alert("添加成功!");
                    Project._collection.insert(response.data);
                    $('#addproject_modal').modal('hide');
                }
            });
        }else if(Session.get("updatemode")=="edit"){
            obj.id=$('#newProjectForm_id').val();
            Meteor.call('project.update', obj, function (err, response) {
                if (err)
                    alert(err);
                else {
                    alert("添加成功!");
                    var id=obj.id;
                    delete obj.id;
                    Project._collection.update({id:parseInt(id)},{$set:obj});
                    $('#addproject_modal').modal('hide');
                }
            });
        }
    }
});

Template.projectmodal.configureAddModal=function(){
    Session.set("updatemode","add");

}

Template.projectmodal.configureEditModal=function(project){
    Session.set('updatemodaldata',project);
    Session.set("updatemode","edit");
}


Template.projectmodal.rendered=function(){
    if(Session.get("updatemode")=='edit') {
        var project = Session.get('updatemodaldata');
        $('#newProjectForm_name').val(project.name);
        $('#newProjectForm_contract').val(project.contract);
        $('#newProjectForm_price').val(project.price);
        $('#newProjectForm_id').val(project.id);
    }
}