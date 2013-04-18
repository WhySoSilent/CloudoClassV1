//全局状态和变量
var GlobalStatus = {
	test_outputJSON: 1,
	test_evalJsonToObject: 1,
	controlAjaxFrequency: 1*1000,
	groupMsgAjaxFrequency: 3*1000,
	stuMsgAjaxFrequency: 2*1000,
	collectON: 0,
}

var  GlobalVariables = {
	controlAjaxPath: "applications/control.php",
	groupMsgAjaxPath: "applications/MsgResponse.php",
	stuMsgAjaxPath: "applications/data.php",
	//controlAjaxPath: "../server/control.php",
	//groupMsgAjaxPath: "applications/MsgResponse.php",
	//stuMsgAjaxPath: "../server/data.php",
	timer: null
}

//Ajax 代码段
var getGroupMsg_Ajax = {};
getGroupMsg_Ajax.init = function() {
	function getGroupMsg() {
		
		$.ajax({
		   type: "POST",
		   url: GlobalVariables.groupMsgAjaxPath,
		   cache: false,
		   data: "getMsg=1&screen=1",
		   success: function(JSON){
				if( GlobalStatus.test_outputJSON == 1)	//testing...
				{	//测试代码
				}
				if( GlobalStatus.test_evalJsonToObject == 1)
				{
					var Msgs = eval ("(" + JSON + ")");
					if(!Msgs.groupsMsg) {
						return;
					}
					FunctionExecutionObject.addMsgToGroup(Msgs.groupsMsg);
				}
			}
		});
		setTimeout(getGroupMsg,GlobalStatus.groupMsgAjaxFrequency);
	}
	getGroupMsg();
/*	
	var tem = {"groupsMsg":[{"groupId":"1","msgs":[{"who":"某某","message":"test 1"},{"who":"某某","message":"text"},{"who":"某某","message":"text"}]},{"groupId":"2","msgs":null},{"groupId":"3","msgs":[{"who":"某某","message":"test"}]},{"groupId":"4","msgs":[{"who":"某某","message":"test"}]},{"groupId":"5","msgs":[{"who":"某某","message":"test"}]}]};
	FunctionExecutionObject.addMsgToGroup(tem.groupsMsg);
*/
};

var getStudengMsg_Ajax = {};
getStudengMsg_Ajax.init = function() {
	function getStudentAnswer() {
		$.ajax({
		   type: "POST",
		   url: GlobalVariables.stuMsgAjaxPath,
		   data: "getMsg=1&screen=1",
		   cache: false,
		   success: function(JSON){
				if( GlobalStatus.test_outputJSON == 1) {
					//testing...
				}
				if( GlobalStatus.test_evalJsonToObject == 1) {
					var Anss = eval ("(" + JSON + ")");
					if(Anss.anss) {
						FunctionExecutionObject.addToAnswers(Anss.anss);
					}
				}
			}
		});
		setTimeout(getStudentAnswer,GlobalStatus.stuMsgAjaxFrequency);
	}
	getStudentAnswer();
};

var controlAjax = {};		//完全没修改的代码
controlAjax.init = function() {

	function whitchCode(optJSON) {
		if(optJSON.opt == "pageSwitch") {
			FunctionExecutionObject.switchViewPage(optJSON.optRole);
			return;
		}
		if(optJSON.opt == "ansOutstanding") {
			FunctionExecutionObject.ansOutstanding(optJSON.sid);
			return;
		}
		if(optJSON.opt == "groupOutstanding") {
			FunctionExecutionObject.groupOutstanding(optJSON.gid);
			return;
		}
		if(optJSON.opt == "groupOutstandinGergodic") {
			FunctionExecutionObject.groupOutstandinGergodic(optJSON.dest);
			return;
		}
		if(optJSON.opt == "mark")	{
			FunctionExecutionObject.daFen(optJSON);
			return;
		}
		if(optJSON.opt == "newQuestion") {
			FunctionExecutionObject.newQuestion();
			return;
		}
		if(optJSON.opt == "collectClose") {
			FunctionExecutionObject.closeAnQuestion();
			return;
		}
		if(optJSON.opt == "videoPlayStatus" || optJSON.opt == "videoVolumeStatus") {
			$actionBindObject.trigger("evt_videoControl",optJSON);
			return;
		}
		if(optJSON.opt == "subtitlePlayStatus") {
			$actionBindObject.trigger("evt_subtitleControl",optJSON);
			return;
		}
		if(optJSON.opt == "loadTag") {
			$actionBindObject.trigger("evt_subtitleTagLoad",optJSON.tagId);
			return;
		}
		if(optJSON.opt == "pptControl") {
			$actionBindObject.trigger("evt_pptControl",optJSON);
			return;
		}
	}
	
	function getControlCode() {
		$.ajax({
		   type: "POST",
		   url: GlobalVariables.controlAjaxPath,
		   data: "screen=1",	//提交视频事件
		   cache: false,
		   success: function(whatShouldIDo){
				if( GlobalStatus.test_evalJsonToObject == 1) {
					var optJSON = eval ("(" + whatShouldIDo + ")");
					whitchCode(optJSON);
				}
			}
		});
		setTimeout(getControlCode,GlobalStatus.controlAjaxFrequency);
	}
	getControlCode();
}