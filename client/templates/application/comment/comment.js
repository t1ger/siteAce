Template.comment_form.events({
  "click .js-toggle-comment-form":function(event){
    $("#comment_form").toggle('slow');
  },

  "click .js-cancel-comment-form": function(event) {
    $("#comment_form").toggle();
  },

  "submit .js-save-comment-form":function(event){

    //get the title, and body out of the form:
    var title = event.target.title.value;
    var body = event.target.body.value;

    // If user logged in, update comments
    if (Meteor.user()) {
      Websites.update({ _id: this._id },{ $push: { comments: {
              title: title,
              body: body,
              createdOn: new Date(),
			  createdBy: Meteor.userId()
            }}});
    }
    $("#comment_form").toggle();
    return false; // stop the form submit from reloading the page
  }
});

Template.comment_item.helpers({
  comments:function(){
    var comments = Websites.findOne({_id: this._id}).comments;
 //   var sortComments = comments.sort(dynamicSort("createdOn"));
 //   return sortComments;
 return comments;
  },
  
  getUsername:function(user_id){
		  var user = Meteor.users.findOne({_id:user_id});
		  if (user){
		    return user.username;
		  }
		  else {
		    return "anonymous";
		  }
		}
});

function dynamicSort(property) {
    var sortOrder = 1;
    if(property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }
    return function (a,b) {
        var result = (a[property] < b[property]) ? 1 : (a[property] > b[property]) ? -1 : 0;
        return result * sortOrder;
    };
}