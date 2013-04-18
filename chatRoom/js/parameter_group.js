$(window).ready(function(){
	$(window).bind("beforeunload",function(event) {
		return " 确定要离开现在的页面吗 ？";	//比想象中简单的确认方法
	});
});

$(window).bind("load",getGroupMsg_Ajax.init);
$(window).bind("load",sendMsgAjax.init);

//全局状态和变量

var GlobalStatus = {
	test_outputJSON: 1,
	test_evalJsonToObject: 1,
	collectON: 0,
}


var  GlobalVariables = {
	sendMsgAjaxPath: "MsgCollect.php",
	groupMsgAjaxPath: "MsgResponse.php",
}

// 以下是一些封装的模型类