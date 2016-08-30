
// start up function that creates entries in the Websites databases.
  Meteor.startup(function () {
    // code to run on server at startup
    if (!Websites.findOne()){
    	console.log("No websites yet. Creating starter data.");
    	  Websites.insert({
    		title:"Goldsmiths Computing Department", 
    		url:"http://www.gold.ac.uk/computing/", 
    		description:"This is where this course was developed.", 
    		createdOn:new Date(),
			upvote:0,
			downvote:0,
			createdBy: "Anonymous",
			comments: [{title: "Best University Ever!", body: "I really really like it there and I heard they offer great MOOC's", createdOn: new Date()},
                {title: "I love this website", body: "The use of the color scheme is out of this world", createdOn: new Date()}]
    
    	});
    	 Websites.insert({
    		title:"University of London", 
    		url:"http://www.londoninternational.ac.uk/courses/undergraduate/goldsmiths/bsc-creative-computing-bsc-diploma-work-entry-route", 
    		description:"University of London International Programme.", 
    		createdOn:new Date(),
			upvote:0,
			downvote:0,
			createdBy: "Anonymous"
    	});
    	 Websites.insert({
    		title:"Coursera", 
    		url:"http://www.coursera.org", 
    		description:"Universal access to the world's best education.", 
    		createdOn:new Date(),
			upvote:0,
			downvote:0,
			createdBy: "Anonymous"
    	});
    	Websites.insert({
    		title:"Google", 
    		url:"http://www.google.com", 
    		description:"Popular search engine.", 
    		createdOn:new Date(),
			upvote:0,
			downvote:0,
			createdBy: "Anonymous"
    	});
    }
  });
  
  Meteor.methods({
	 
		getWebsiteData: function (url) {
		this.unblock();
		console.log(HTTP.call("GET", url, {"npmRequestOptions" : {"gzip" : true}}))
		return HTTP.call("GET", url, {"npmRequestOptions" : {"gzip" : true}});
		}
  });