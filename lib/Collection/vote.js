
Meteor.methods({
	
	upvote: function(website_id){
		
		var website=Websites.findOne(website_id);
		if(!website)
			throw new Meteor.Error('invalid','website not found');
		
		Websites.update(website_id,{
			$inc:{upvote:1}
			
			});
		},
	
	downvote:function(website_id){
		
		
		var website=Websites.findOne(website_id);
		if(!website)
			throw new Meteor.Error('invalid','website not found');
		
		Websites.update(website_id,{
			$inc:{downvote:1}
			
			});
		},
	

});