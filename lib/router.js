Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound',
  //waitOn: function() { return Meteor.subscribe('websites'); }
});

//Router.route('/', {name: 'website_list'});
Router.route('/', function(){
	this.render('website_list');
	this.render('header', {to: 'header'});

	this.layout("layout");
	});

Router.route('/website', function(){
	this.render('website_list');
	this.render('header', {to: 'header'});

	this.layout("layout");
	});	
	
	
Router.route('website/:_id',function() {
	this.render('header', {to: 'header'});
	this.render('websitedetail',{
		
		data:function(){
			return Websites.findOne({_id:this.params._id})
		}
	});
	this.layout("layout");
	
});

Router.route('/submit', {name: 'webSubmit'});


var requireLogin = function(){
	if ( ! Meteor.user()){
		
		if(Meteor.logginIn()) {
			this.render(this.loadingTemplate);
		} else {
			this.render('accessDenied');
		}
	}else{
		this.next();
	}
}

Router.onBeforeAction(requireLogin,{only: 'webSubmit'});