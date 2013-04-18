var getGroupMsg_Ajax = {};
getGroupMsg_Ajax.init = function() {
	function getGroupMsg() {
		
		$.ajax({
		   type: "POST",
		   url: GlobalVariables.groupMsgAjaxPath,
		   cache: false,
		   data: "getMsg=1&mobile=1",
		   success: function(JSON){
				if( GlobalStatus.test_outputJSON == 1)	//testing...
				{
				}
				if( GlobalStatus.test_evalJsonToObject == 1)
				{
					var Msgs = eval ("(" + JSON + ")");
					if(!Msgs.msgs) {
						return;
					}
					FunctionExecutionObject.addMsgToRoom(Msgs.msgs);
				}
			}
		});
		setTimeout(getGroupMsg,2*1000);
	}
	getGroupMsg();
}

var sendMsgAjax = {};
sendMsgAjax.init = function() {
	$( "#send" ).click( function(event){
							var inputMsg = document.getElementById("input");
							
							if(inputMsg.value == "") {
								return;
							}
							var sendParameter = "sendMsg=1&mobile=1&message=" +inputMsg.value;
							$.ajax({
							   type: "POST",
							   url: GlobalVariables.sendMsgAjaxPath,
							   cache: false,
							   data: sendParameter,
							   success: function(JSON){
									if( GlobalStatus.test_outputJSON == 1)
									{//testing...
									}
									if( GlobalStatus.test_evalJsonToObject == 1)
									{
										var response = eval ("(" + JSON + ")");
										if(response.response === "ok") {
											alert("return: ok");
										}
									}
								}
							});
							FunctionExecutionObject.addMyMsg(inputMsg.value);
							inputMsg.value = "";
						} );
}