

$(function() {
	var $page=$("#mainPage");
	$("#buttonSubmit").on("click",function(e) {
		e.preventDefault();
		tb.action("create-topic",$("#formNewTopic"),function(data) {
			tb.prepForm($page);
			if (data.ok) {
				tb.redirect("/edit-topic/"+data.topic_id);
			} else {
				tb.showFormErrors($page,data);
			}
		});
	});

});




