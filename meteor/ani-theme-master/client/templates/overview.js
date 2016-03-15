if(Meteor.isClient){
	Template.overview.rendered = function(){
		if(Session.get("animateChild")){
			$(".overview-page").addClass("ng-enter");
			setTimeout(function(){
				$(".overview-page").addClass("ng-enter-active");
			}, 300);
			setTimeout(function(){
				$(".overview-page").removeClass("ng-enter");
				$(".overview-page").removeClass("ng-enter-active");
			}, 600);
		}
	};

	Template.overview.events({
		'click #nonimpl':function(){
			alert("对不起此功能正在建设中!");
		}
	});

}