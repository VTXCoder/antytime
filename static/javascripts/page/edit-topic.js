

$(function() {
	var $page=$("#mainPage");


	$("#buttonSave").on("click",function(e) {
		e.preventDefault();
		tb.action("save-topic",$("#formEditTopic"),function(data) {
			tb.prepForm($page);
			if (data.ok) {
				tb.redirect("/edit-topic/"+data.topic_id);
			} else {
				tb.showFormErrors($page,data);
			}
		});
	});

	$("#buttonSaveClose").on("click",function(e) {
		e.preventDefault();
		tb.action("save-topic",$("#formEditTopic"),function(data) {
			tb.prepForm($page);
			if (data.ok) {
				tb.redirect("/list-topics");
			} else {
				tb.showFormErrors($page,data);
			}
		});
	});

	// Even when deleting a topic it needs saving first!
	$("#buttonDelete").on("click",function(e) {
		e.preventDefault();
		tb.action("save-topic",$("#formEditTopic"),function(data) {
			tb.prepForm($page);
			if (data.ok) {
				tb.action("delete-topic",$("#formEditTopic"),function(data) {
					tb.redirect("/list-topics");
				});
			} else {
				tb.showFormErrors($page,data);
			}
		});
	});

	$("#buttonRevert").on("click",function(e) {
		e.preventDefault();
		tb.action("save-topic",$("#formEditTopic"),function(data) {
			tb.prepForm($page);
			if (data.ok) {
				tb.action("revert-topic",$("#formEditTopic"),function(data) {
					tb.redirect("/edit-topic/"+data.topic_id);
				});
			} else {
				tb.showFormErrors($page,data);
			}
		});
	});

	$("#buttonPublish").on("click",function(e) {
		e.preventDefault();
		tb.action("save-topic",$("#formEditTopic"),function(data) {
			tb.prepForm($page);
			if (data.ok) {
				tb.action("publish-topic",$("#formEditTopic"),function(data) {
					tb.redirect("/edit-topic/"+data.topic_id);
				});
			} else {
				tb.showFormErrors($page,data);
			}
		});
	});


});



