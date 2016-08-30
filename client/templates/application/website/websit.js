	// helper function that returns all available websites
	Template.website_list.helpers({
		websites:function(){
			return Websites.find({},{sort:{upvote: -1,createOn:-1}});
		}
	});
	
	
	Template.website_item.events({

  "click .js-upvote":function(event){
    // get website._id id for the website in the database
    var website_id = this._id;
    Websites.update( {_id: website_id},
                      {$inc: {upvote: 1}});
    var website = Websites.findOne({_id: website_id});
    return false;// prevent the button from reloading the page
  },
  "click .js-downvote":function(event){

    // example of how you can access the id for the website in the database
    // (this is the data context for the template)
    var website_id = this._id;
    Websites.update( {_id: website_id},
                      {$inc: {downvote: 1}});
    var website = Websites.findOne({_id: website_id});
    return false;// prevent the button from reloading the page
  }
});
	
	
	Template.website_form.events({
		"click .js-toggle-website-form":function(event){
			$("#website_form").toggle('slow');
		}, 
		"submit .js-save-website-form":function(event){

			event.preventDefault();
			// here is an example of how to get the url out of the form:
			var url = event.target.url.value;
			console.log("The url they entered is: "+url);
			
			
			Meteor.call("getWebsiteData",url,function(error,results){
				//Dump the markup into a dummy elements for jQuery manipulation
				var el=$('<head>');
				console.log(results.content);
				el.html(results.content);
				
				//Get the meta data
				var title = $('title',el).text();
				console.log('title:'+title);
			
				var description =$('meta[name="description"]',el).attr('content');
			   console.log('description:'+description);
				//Add the new website in the Websites collection
				
				if(Meteor.user()){
					Websites.insert({
					url: url,
					title:title,
					description:description,
					createdOn:new Date(),
					upvote:0,
					downvote:0,
					createdBy: Meteor.user()._id
				
					});
					console.log(Meteor.user()._id)
				}
			});
			
		//	var title=event.target.title.value;
			
		//	var description=event.target.description.value;
			
		
		//	$('#url').val('');
		//	$('#title').val('');
		//	$('#description').val('');

			$("#website_form").toggle();
			//Router.go('website_list','website')
			
			
			//  put your website saving code in here!	

			return false;// stop the form submit from reloading the page

		}
	});
	
	
