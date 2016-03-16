
Template.analytics.rendered = function () {
    Meteor.call('analytics.summary',function(err,response){
        if(err)
            alert(err);
        Session.set('lines',response.data);
        var ctx = document.getElementById("myChart").getContext("2d");
        var labels=[];
        var credits=[];
        var debits=[];
        for(var i=0;i<response.data.length;i++){
            labels.push(response.data[i].projectname);
            credits.push(response.data[i].credit);
            debits.push(response.data[i].debit);
        }
        var data = {
            labels: labels,
            datasets: [
                {
                    label: "收入",
                    fillColor: "rgba(220,220,220,0.5)",
                    strokeColor: "rgba(220,220,220,0.8)",
                    highlightFill: "rgba(220,220,220,0.75)",
                    highlightStroke: "rgba(220,220,220,1)",
                    data: credits
                },
                {
                    label: "支出",
                    fillColor: "rgba(151,187,205,0.5)",
                    strokeColor: "rgba(151,187,205,0.8)",
                    highlightFill: "rgba(151,187,205,0.75)",
                    highlightStroke: "rgba(151,187,205,1)",
                    data: debits
                }
            ]
        };
        var myNewChart = new Chart(ctx).Bar(data,{responsive: true,maintainAspectRatio: true});
        document.getElementById('js-legend').innerHTML = myNewChart.generateLegend();

    });

};

Template.analytics.helpers({

    lines:function(){
        return Session.get('lines');
    }
});

