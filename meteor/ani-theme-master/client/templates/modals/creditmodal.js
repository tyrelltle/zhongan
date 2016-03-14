Template.creditmodal.events({

    'click #confirmAdd':function(){
        var obj={
            project_id:$('#newCreditForm_project_id').val(),
            recieptdate:$('#newCreditForm_recieptdate').val(),
            recieptprice:$('#newCreditForm_recieptprice').val(),
            paydate:$('#newCreditForm_paydate').val(),
            payprice:$('#newCreditForm_payprice').val(),
            notes:$('#newCreditForm_notes').val()
        };

        if(Session.get("updatemode")=="add") {
            Meteor.call('credit.add', obj, function (err, response) {
                if (err)
                    alert(err);
                else {
                    alert("添加成功!");
                    Credit._collection.insert(response.data);
                    $('#addcredit_modal').modal('hide');
                }
            });
        }else if(Session.get("updatemode")=="edit"){
            obj.id=$('#hidden_creditid').val();
            Meteor.call('credit.update', obj, function (err, response) {
                if (err)
                    alert(err);
                else {
                    alert("添加成功!");
                    var id=obj.id;
                    delete obj.id;
                    Project._collection.update({id:parseInt(id)},{$set:obj});
                    $('#addcredit_modal').modal('hide');
                }
            });
        }
    }
});

Template.creditmodal.configureAddModal=function(){
    Session.set("updatemode","add");

}

Template.creditmodal.configureEditModal=function(credit){
    Session.set('updatemodaldata',credit);
    Session.set("updatemode","edit");
}


Template.creditmodal.rendered=function(){
    if(Session.get("updatemode")=='edit') {
        var credit = Session.get('updatemodaldata');
        $('#hidden_creditid').val(credit.id);
        $('#newCreditForm_project_id').val(credit.project.id);
        $('#newCreditForm_recieptdate').val(credit.recieptdate);
        $('#newCreditForm_recieptprice').val(credit.recieptprice);
        $('#newCreditForm_paydate').val(credit.paydate);
        $('#newCreditForm_payprice').val(credit.payprice);
        $('#newCreditForm_notes').val(credit.notes);
    }

    Meteor.call('project.list',function(err,response){
        console.log(response);
        if(err)
            alert(err);
        Session.set('projectlist',response.data);
    });


}

Template.creditmodal.helpers({
    projects:function(){
        return Session.get('projectlist');
    }
});