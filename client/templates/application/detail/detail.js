Template.websitedetail.helpers({
  getUser:function(user_id){
    var user = Meteor.users.findOne({_id:user_id});
    if (user){
	
      return user.username;
    }
    else {
      return "Anonymous";
    }
  }
});