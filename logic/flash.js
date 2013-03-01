
var add=function(session,message,type) {
	if (!session.flashMessages) session.flashMessages=[];
	if (!type) type="info";
	session.flashMessages.push({message:message,type:type});
};

var has=function(session) {
	if (!session.flashMessages) session.flashMessages=[];
	return session.flashMessages.length > 0;
};

var get=function(session) {
	if (!session.flashMessages) session.flashMessages=[];
	var temp=session.flashMessages;
	session.flashMessages=[];
	return temp;
};

exports.has=has;
exports.add=add;
exports.get=get;