//全局状态和变量
var GlobalStatus = {
	test_outputJSON: 1,
	test_evalJsonToObject: 1,
	collectON: 0,
}

var  GlobalVariables = {
	controlAjaxPath: "applications/control.php",
	dataAjaxPath: "applications/data.php",
	timer: null
}

var FunctionExecutionObject = {
	clearAnswers: function(anws) {	//想想能不能直接把 innerHTML 清掉呢
	//opt: 1) 清除问题描述	2) 删除所有答案	3) 重新计时
		$("#question").html("Mr Q:");
		
		var anwserBox = document.getElementById("guysAnswer");
		
		for(var i = 0; i < anws.length; i++) {
			anwserBox.removeChild(anws[i]);
		}
		
		//重新计时
		FunctionExecutionObject.startTimer();
	},
	
	mark: function() {
		//
		var queInput = document.getElementById("queInput");
		if( queInput.value != "" ) {
			$("#question").text("Mr Q: " + queInput.value);
		}
		//手机端简单的打分
	},
	
	addToAnswers: function(answerDatas) {
		$theQuestionBox = $("#guysAnswer");
		var gidToClass = ["第一组","第二组","第三组","第四组","第五组","第六组","第七组","第八组","第九组","第十组","第十一组","第十二组"];
		
		for(var i = 0; i< answerDatas.length; i++) {
			var thisAns = answerDatas[i];
			
			var sid = thisAns.sid;
			var gid = thisAns.gid;	//是否需要 +"" 转字符串？
			var right = thisAns.right;	//小心为null
			
			$thisGuy = $("div[data-sid='" + sid + "']");
			if( $thisGuy.length > 0 ) {
				var ansTextNodeThis = document.createTextNode(thisAns.answer);
				var newAnsPThis = document.createElement("p");
				newAnsPThis.appendChild(ansTextNodeThis);
				$(newAnsPThis).addClass("stuAnswer");
				
				$thisGuy.append(newAnsPThis);
				$theQuestionBox.prepend($thisGuy);	//位置更新到最前
				continue;	//写成return 造成的一个不知如何解释的问题
			}
			var ansTextNode = document.createTextNode(thisAns.answer);
			var nameTextNode = document.createTextNode(thisAns.name);
			var classTextNode = document.createTextNode(gidToClass[gid - 1]);
			var newAnsP = document.createElement("p");
			var newNameP = document.createElement("p");
			var newClassP = document.createElement("p");
			newAnsP.appendChild(ansTextNode);
			newNameP.appendChild(nameTextNode);
			newClassP.appendChild(classTextNode);
			
			$(newAnsP).addClass("stuAnswer");
			$(newNameP).addClass("stuName");
			$(newClassP).addClass("stuClass");

			var newAnswerDiv = document.createElement("div");
			$(newAnswerDiv).addClass("aAns");
			$(newAnswerDiv).attr("data-sid",sid);
			$(newAnswerDiv).attr("data-gid",gid);
			
			newAnswerDiv.appendChild(newClassP);
			newAnswerDiv.appendChild(newNameP);
			newAnswerDiv.appendChild(newAnsP);
			
			$theQuestionBox.prepend(newAnswerDiv);
		}
	},
	closeAnQuestion: function() {
		FunctionExecutionObject.stopTimer();
		//close data Ajax
		GlobalStatus.collectON = 0;
	},
	startTimer: function() {
		Timer.clear();
		GlobalVariables.timer = setInterval(FunctionExecutionObject.runningTimer, 1000);
	},
	runningTimer: function() {
		Timer.ss += 1;
		if( Timer.ss === 60 ) {
			Timer.mm += 1;
			Timer.ss = 0;
		}
		var TextOfTime = ((Timer.mm < 10) ? "0" :"" )+ Timer.mm + ":" + ((Timer.ss < 10) ? "0" :"" )+ Timer.ss;
		$("#limitTime").text(TextOfTime);
	},
	stopTimer: function() {
		clearInterval(GlobalVariables.timer);
	},
	sendOutstandingSid: function(sid) {
		var ajaxParameter = "ansOutstanding=1&sid=" + sid;
		$.ajax({
		   type: "POST",
		   url: GlobalVariables.controlAjaxPath,
		   cache: false,
		   data: ajaxParameter,		//填什么
		   success: function(JSON){
				if( GlobalStatus.test_outputJSON == 1)	{
				}
				if( GlobalStatus.test_evalJsonToObject == 1)
				{
					var Anss = eval ("(" + JSON + ")");
					//********************************* no action
				}
			}
		});
	},
	sendOutstandingGroupId: function(gid) {
		var ajaxParameter = "groupOutstanding=1&gid=" + gid;
		$.ajax({
		   type: "POST",
		   url: GlobalVariables.controlAjaxPath,
		   cache: false,
		   data: ajaxParameter,		//填什么
		   success: function(JSON){
				if( GlobalStatus.test_outputJSON == 1)	{
				}
				if( GlobalStatus.test_evalJsonToObject == 1)
				{
					var Anss = eval ("(" + JSON + ")");
					//********************************* no action
				}
			}
		});
	},
	sendViewPageSwitch: function(optRole) {
		var ajaxParameter = "pageSwitch=1&optRole=" + optRole;
		//alert(optRole +" 开始发鸟～" + ajaxParameter);
		$.ajax({
		   type: "POST",
		   url: GlobalVariables.controlAjaxPath,
		   cache: false,
		   data: ajaxParameter,		//填什么
		   success: function(JSON){
				if( GlobalStatus.test_outputJSON == 1)	{
				}
				if( GlobalStatus.test_evalJsonToObject == 1)
				{
					var Anss = eval ("(" + JSON + ")");
					//********************************* no action
				}
			}
		});
	},
	groupOutstandinGergodic: function(actionRole) {
		var ajaxParameter = "groupOutstandinGergodic=1&dest=" + actionRole;
		//alert(actionRole +" 开始发鸟～" + ajaxParameter);
		$.ajax({
		   type: "POST",
		   url: GlobalVariables.controlAjaxPath,
		   cache: false,
		   data: ajaxParameter,		//填什么
		   success: function(JSON){
				if( GlobalStatus.test_outputJSON == 1)	{
				}
				if( GlobalStatus.test_evalJsonToObject == 1)
				{
					var Anss = eval ("(" + JSON + ")");
					//********************************* no action
				}
			}
		});
	},
	groupOutstanding: function(gid) {
		var ajaxParameter = "groupOutstanding=1&gid=" + gid;
		//alert(gid +" 开始发鸟～" + ajaxParameter);
		$.ajax({
		   type: "POST",
		   url: GlobalVariables.controlAjaxPath,
		   cache: false,
		   data: ajaxParameter,		//填什么
		   success: function(JSON){
				if( GlobalStatus.test_outputJSON == 1)	{
				}
				if( GlobalStatus.test_evalJsonToObject == 1)
				{
					var Anss = eval ("(" + JSON + ")");
					//********************************* no action
				}
			}
		});
	},
	setTages: function(tem) {			
		var captions = tem.captions;
		
		for(var i = 0; i < captions.length; i++) {
				setToTages(captions[i]);
		}
		
		function setToTages(aCaptions) {
			var dialogues = aCaptions.dialogues;
			
			
			for(var i = 0; i < dialogues.length; i++) {
				var id = dialogues[i].id;
				var start = dialogues[i].start;
				var end = dialogues[i].end;
				var text = dialogues[i].text;
				var keyWord = dialogues[i].keyWords[0];
				var subText = text.substr(0,5) + "...";
				
				//<option value="option1">05:23 -- 06:21</option>
				var aTagText = document.createTextNode(keyWord + "  " +subText);

				var aOpt = document.createElement("option");
				aOpt.appendChild(aTagText);

				$(aOpt).attr("value",id);
				$(aOpt).addClass("aCaptionsTag");

				$captionsTags.append($(aOpt));
				
			}
		}
	},
	loadTagWithId: function(tagId) {
		var ajaxParameter = "loadTag=1&tagId=" + tagId;
		//alert(tagId +" 开始发鸟～" + ajaxParameter);
		$.ajax({
		   type: "POST",
		   url: GlobalVariables.controlAjaxPath,
		   cache: false,
		   data: ajaxParameter,		//填什么
		   success: function(JSON){
				if( GlobalStatus.test_evalJsonToObject == 1){
					var Anss = eval ("(" + JSON + ")");
					//********************************* no action
				}
			}
		});
	},
	sendControlSignal: function(signalSender) {
		var actionRole = $(signalSender).attr("data-actionRole");
		if(actionRole === "pause") {
			if(signalSender.checked) {
				var ajaxParameter = "videoPlayStatus=1&action=pause";
			}
			else {
				var ajaxParameter = "videoPlayStatus=1&action=play";
			}

		}
		if(actionRole === "tagCycle") {
			if(signalSender.checked) {
				var ajaxParameter = "videoPlayStatus=1&action=tagCycle&status=1";
			}else {
				var ajaxParameter = "videoPlayStatus=1&action=tagCycle&status=0";
			}
		}
		if(actionRole === "mute") {
			if(signalSender.checked) {
				var ajaxParameter = "videoVolumeStatus=1&action=mute";
			}else {
				var ajaxParameter = "videoVolumeStatus=1&action=unMute";
			}
		}
		if(actionRole === "fullScreen") {
			if(signalSender.checked) {
				var ajaxParameter = "videoPlayStatus=1&action=fullScreen&status=1";
			}else {
				var ajaxParameter = "videoPlayStatus=1&action=fullScreen&status=0";
			}
		}
		//字幕部分
		if(actionRole === "mark") {
			if(signalSender.checked) {
				var ajaxParameter = "subtitlePlayStatus=1&mode=mark&status=1";
			}else {
				var ajaxParameter = "subtitlePlayStatus=1&mode=mark&status=0";
			}
		}
		if(actionRole === "cover") {
			if(signalSender.checked) {
				var ajaxParameter = "subtitlePlayStatus=1&mode=cover&status=1";
			}else {
				var ajaxParameter = "subtitlePlayStatus=1&mode=cover&status=0";
			}
		}
		if(actionRole === "toggle") {
			if(signalSender.checked) {
				var ajaxParameter = "subtitlePlayStatus=1&mode=toggle&status=1";
			}else {
				var ajaxParameter = "subtitlePlayStatus=1&mode=toggle&status=0";
			}
		}
		if(actionRole === "autoPause") {
			if(signalSender.checked) {
				var ajaxParameter = "subtitlePlayStatus=1&mode=autoPause&status=1";
			}else {
				var ajaxParameter = "subtitlePlayStatus=1&mode=autoPause&status=0";
				
			}
		}
		//alert(ajaxParameter);
		$.ajax({
		   type: "POST",
		   url: GlobalVariables.controlAjaxPath,
		   cache: false,
		   data: ajaxParameter,
		   success: function(JSON){
				if( GlobalStatus.test_evalJsonToObject == 1) {
					var Anss = eval ("(" + JSON + ")");
					//********************************* no action
				}
			}
		});
	},
	pptControl: function(actionRole) {
		if(actionRole === "nextPPT") {
			PPT.nextPage();
			var ajaxParameter = "pptControl=1&action=nextPPT&currentTime=" + PPT.getCurrentTime();
		}
		if(actionRole === "prePPT") {
			PPT.prePage();
			var ajaxParameter = "pptControl=1&action=prePPT&currentTime=" + PPT.getCurrentTime();
		}
		if(actionRole === "play") {
			var ajaxParameter = "pptControl=1&action=play&currentTime=" + PPT.getCurrentTime();
		}
		//alert(actionRole +" 开始发鸟～" + ajaxParameter);
		$.ajax({
		   type: "POST",
		   url: GlobalVariables.controlAjaxPath,
		   cache: false,
		   data: ajaxParameter,
		   success: function(JSON){
				if( GlobalStatus.test_outputJSON == 1)	{
				}
				if( GlobalStatus.test_evalJsonToObject == 1)
				{
					var Anss = eval ("(" + JSON + ")");
					//********************************* no action
				}
			}
		});
	}
};

// 以下是一些封装的模型类
var PPT = {
	currentPage: 1,
	pptObj: null,
	nextPage: function() {
		if(this.currentPage === this.pptObj.length) {
			return this.currentPage ;
		}
		this.currentPage++;
		return this.currentPage;
	},
	prePage: function() {
		if(this.currentPage === 1) {
			return this.currentPage;
		}
		this.currentPage--;
		return this.currentPage;
	},
	getCurrentTime: function() {
		$pptView.html(this.pptObj[this.currentPage-1].text);
		return this.pptObj[this.currentPage-1].start;
	},
	setPptObj: function(obj) {
		this.pptObj = obj;
	}
}

var Timer = {
	mm: 0,
	ss: 0,
	clear: function() {
		this.mm = 0;
		this.ss = 0;
	}
}