Websites = new Mongo.Collection("websites");


Websites.allow({
	insert:function(userId,doc){
		return !! userId;
	},
	
	update:function(){
		
		return true;
	}
})

