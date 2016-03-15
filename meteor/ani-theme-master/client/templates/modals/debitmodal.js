Template.debitmodal.events({

    'click #confirmAdd':function(){
        var obj={
            project_id:$('#newDebitForm_project_id').val(),
            recieptnumber:$('#newDebitForm_recieptnumber').val(),
            date:$('#newDebitForm_date').val(),
            price:$('#newDebitForm_price').val(),
            paidorg:$('#newDebitForm_paidorg').val(),
            recieptstatus:$('#newDebitForm_recieptstatus').val(),
            payee:$('#newDebitForm_payee').val(),
            notes:$('#newDebitForm_notes').val()

        };

        if(Session.get("updatemode")=="add") {
            Meteor.call('debit.add', obj, function (err, response) {
                if (err)
                    alert(err);
                else {
                    alert("添加成功!");
                    Debit._collection.insert(response.data);
                    $('#adddebit_modal').modal('hide');
                }
            });
        }else if(Session.get("updatemode")=="edit"){
            obj.id=$('#hidden_debitid').val();
            Meteor.call('debit.update', obj, function (err, response) {
                if (err)
                    alert(err);
                else {
                    alert("添加成功!");
                    var id=obj.id;
                    delete obj.id;
                    Debit._collection.update({id:parseInt(id)},{$set:obj});
                    $('#adddebit_modal').modal('hide');
                }
            });
        }
    }
});

Template.debitmodal.configureAddModal=function(){
    Session.set("updatemode","add");

}

Template.debitmodal.configureEditModal=function(debit){
    Session.set('updatemodaldata',debit);
    Session.set("updatemode","edit");
}


Template.debitmodal.rendered=function(){
    if(Session.get("updatemode")=='edit') {
        var debit = Session.get('updatemodaldata');
        $('#hidden_debitid').val(debit.id);
        $('#newDebitForm_project_id').val(debit.project_id);
        $('#newDebitForm_recieptnumber').val(debit.recieptnumber);
        $('#newDebitForm_date').val(debit.date);
        $('#newDebitForm_price').val(debit.price);
        $('#newDebitForm_paidorg').val(debit.paidorg);
        $('#newDebitForm_recieptstatus').val(debit.recieptstatus);
        $('#newDebitForm_payee').val(debit.payee);
        $('#newDebitForm_notes').val(debit.notes);
    }

    Meteor.call('project.list',function(err,response){
        console.log(response);
        if(err)
            alert(err);
        Session.set('projectlist',response.data);
    });


}

Template.debitmodal.helpers({
    projects:function(){
        return Session.get('projectlist');
    }
});