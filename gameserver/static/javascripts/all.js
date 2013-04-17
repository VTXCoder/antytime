(function($){
    $.fn.disableSelection = function() {
        return this
                 .attr('unselectable', 'on')
                 .css('user-select', 'none')
                 .on('selectstart', false);
    };
})(jQuery);

var tb={};

$(function() {
	$("[rel=tooltip]").tooltip();
	$("[rel=datepicker]").datepicker();
	//$("[rel=popover][data-trigger!='manual']").popover();
	//$("[rel=popover][data-trigger='manual']").popover('show');

	$("[data-clicknav]").css("cursor","pointer");

	$(document).on("click","[data-clicknav]",function(e) {
		tb.redirect($(this).data("clicknav"));
	});
});


// Abstracted Ajax Call 

tb.call=function(remoteURL,callData,callBack) {
	var form=null;

	// Serialize the form object from almost any kind of data type
	if (callData) {
		if (callData.selector) {form=callData.serialize();}
		if (!form && callData.type && callData.type=="form") {form=$(callData).serialize();}
		if (!form) form=callData;
	}

	// Make the Ajax call
	$.ajax({
		url: remoteURL,
		//accepts: 'application/json',
		success: function(data) {
			//console.log(data);
			// Error handling incomplete
			if (data && data.error) {
				// Incomplete (just alert it for now)
				//console.log("Server "+data.error);
				alert("Server Exception\n\n"+data.error);
			} else {
				callBack(data);
			}
		},
		error: function(xhr,testStatus,errorThrown) {
			console.log(xhr.responseText);
		},
		data: form,
		dataType: 'json',
		type: "POST"
	});
};

// Execute an action
tb.action=function(action,callData,callBack) {
	tb.call("/?call="+action,callData,callBack);
};

// Simply grab a template - could be one of the main pages! 
tb.template=function(template,callData,callBack) {
	tb.call("/ajax/template",{template:template},callBack);
};

tb.prepForm=function($page) {
	$page.find(".control-group").removeClass("error");
	$page.find(".validation").hide();
	$page.find(".errorMessage").hide();
};

tb.showFormErrors=function($page,data) {
	if (data.errors.length) {
		_.each(data.errors,function(name) {
			$page.find("[name='"+name+"']").parents(".control-group").addClass("error");
			$page.find("[name='"+name+"']").parent().children(".validation").show();
		});
	}

	if (data.message) {
		$page.find(".errorMessage").show().html(data.message);
	}
};


tb.redirect=function(url) {
	self.location=url;
};


function random(from,to)
{
    return Math.floor(Math.random()*(to-from+1)+from);
}

var degreeInRadians = 2*Math.PI/360;

