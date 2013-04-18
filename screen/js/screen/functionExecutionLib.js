var FunctionExecutionObject = {
	setCaptions: function(tem) {
		var popcorn = Popcorn( "#thisVideo" );
		
		var tags = tem.tags;	//取关键词标签
		var captions = tem.captions;	//取出字幕
		for(var i = 0; i < captions.length; i++) {
				setWithPopcorn(captions[i]);
		}
		
		function setWithPopcorn(aCaptions) {
			var lang = aCaptions.language;
			var dialogues = aCaptions.dialogues;
			
			for(var i = 0; i < dialogues.length; i++) {
				if(dialogues[i].keyWords) {
					var tagId = dialogues[i].id;
					$keyTags[0].tagIds[tagId] = dialogues[i].start;
					//alert($keyTags.tagId);
				}
				popcorn.footnote({  
					start: dialogues[i].start,  
					end: dialogues[i].end,  
					target: lang, 
					text: dialogues[i].text
				});
			}
		}
	},
	addMsgToGroup: function(groupMsgs) {	//添加实时讨论组消息到对应小组
		
		for(var i = 0; i< groupMsgs.length; i++) {

			var thisGroup = groupMsgs[i];
			
			var groupId = thisGroup.groupId;
			$colorGroup = $("div[data-groupId="+ groupId +"]");
			
			var msgs = thisGroup.msgs;
				if(!msgs) {
					continue;
				}

			groupId = "#groupId_" + groupId;
			$theContentBox = $(groupId);
			
			for(var j = 0; j < msgs.length; j++) {
				var thisMsg = msgs[j];
				
				var whoTextNode = document.createTextNode(thisMsg.who);
				var msgTextNode = document.createTextNode(thisMsg.message);
				
				var newWhoDiv = document.createElement("div");
				var newMsgDiv = document.createElement("div");
				
				newWhoDiv.appendChild(whoTextNode);
				newMsgDiv.appendChild(msgTextNode);
				
				$(newWhoDiv).addClass("member");
				$(newMsgDiv).addClass("message");

				var newAnMessageDiv = document.createElement("div");
				$(newAnMessageDiv).addClass("aMessage");
				//$(newAnMessageDiv).addClass("fClear");
		
				newAnMessageDiv.appendChild(newWhoDiv);
				newAnMessageDiv.appendChild(newMsgDiv);

				$theContentBox.prepend(newAnMessageDiv);
			}
			
			$colorGroup.trigger("evt_colorChange");
		}
	},
	addToAnswers: function(answerDatas) {		//添加微信消息到mrQ
		//-----------------------------------------------没有验证 null数组	！！！！！！！！！！！！！！！！！！！！
		$theQuestionBox =$("#guysAnswer");
		var gidToClass = ["第一组","第二组","第三组","第四组","第五组","第六组","第七组","第八组","第九组","第十组","第十一组","第十二组"];
		
		for(var i = 0; i< answerDatas.length; i++) {
			var thisAns = answerDatas[i];
			
			var sid = thisAns.sid;
			var gid = thisAns.gid;	//是否需要 +"" 转字符串？
			var right = thisAns.right;	//小心为null
			
			$thisGuy = $("#guysAnswer div[data-sid='" + sid + "']");
			if( $thisGuy.length > 0 ) {
				//alert($thisGuy.attr("class"));
				
				var ansTextNodeThis = document.createTextNode(thisAns.answer);
				var newAnsPThis = document.createElement("p");
				newAnsPThis.appendChild(ansTextNodeThis);
				$(newAnsPThis).addClass("stuAnswer");
				
				$thisGuy.append(newAnsPThis);
				$theQuestionBox.prepend($thisGuy);	//位置更新到最前
				continue;	//写成return 造成的一个不知如何解释的问题
			}else {
				//alert("nofond");
			}
			var ansTextNode = document.createTextNode(thisAns.answer);
			var nameTextNode = document.createTextNode(thisAns.name);
			var classTextNode = document.createTextNode(gidToClass[gid - 1]);	//
			var newAnsP = document.createElement("p");
			var newNameP = document.createElement("p");
			var newClassP = document.createElement("p");
			newAnsP.appendChild(ansTextNode);
			newNameP.appendChild(nameTextNode);
			newClassP.appendChild(classTextNode);
			
			$(newAnsP).addClass("stuAnswer");
			$(newNameP).addClass("stuName");
			$(newClassP).addClass("stuClass");
			
			//以下代码添加头像
			var newAvatarImage = document.createElement("img");
			$(newAvatarImage).addClass("avatar");
			$(newAvatarImage).attr("src","css/screen/images/default_boy.jpg");
			
			var newAnswerDiv = document.createElement("div");
			$(newAnswerDiv).addClass("aAns");
			$(newAnswerDiv).attr("data-sid",sid);
			$(newAnswerDiv).attr("data-gid",gid);
			newAnswerDiv.appendChild(newAvatarImage);
			newAnswerDiv.appendChild(newClassP);
			newAnswerDiv.appendChild(newNameP);
			newAnswerDiv.appendChild(newAnsP);
			
			$theQuestionBox.prepend(newAnswerDiv);
		}
	},
	creatAQuestion: function() {
		//注意以下的缩进描述了添加的层次关系
		var aQuestion = document.createElement("div");
		$(aQuestion).attr("id","aQuestion");

			var mrQ = document.createElement("div");
			$(mrQ).addClass("mrQ");
				
				var question = document.createElement("h2");
				$(question).attr("id","question");
					var questionText = document.createTextNode("Give me an answer~");
					question.appendChild(questionText);

				var limitTime = document.createElement("h2");
				$(limitTime).attr("id","limitTime");
					var limitTimeText = document.createTextNode("00:00");
					limitTime.appendChild(limitTimeText);

				var clearFloat = document.createElement("div");
				$(clearFloat).addClass("fClear");	//css里面有没有定义清楚浮动的类？
				
				mrQ.appendChild(question);
				mrQ.appendChild(limitTime);
				mrQ.appendChild(clearFloat);

			var guysAnswer = document.createElement("div");
			$(guysAnswer).attr("id","guysAnswer");
			
			aQuestion.appendChild(mrQ);
			aQuestion.appendChild(guysAnswer);
			
		return aQuestion;
	},
	newQuestion: function() {
		//认为是，javascript 靠几个主要的 id 属性寻找操作的锚点，向里面插入收集到的答案。换一道新的问题重新收集答案意味着把现有数据当成老数据样式化，创建新的答案收集容器并为之添上 id 锚点，但一个页面同id的元素只许一个，所以要移除以前的锚点，以下是通过把 id 属性转换到 class 实现的。这样也为 CSS 文件里对新老数据样式化提供了一种寻找差异的方法
		var content = document.getElementById("mrQContent");
		var thisQuesAnswer = document.getElementById("guysAnswer");
		var questionNow = document.getElementById("aQuestion");

		
				var question = document.getElementById("question");
				var limitTime = document.getElementById("limitTime");
				$(question).addClass("question");	//add class
				$(limitTime).addClass("limitTime");
				$(question).attr("id","");		//remove id
				$(limitTime).attr("id","");	
		
		$(questionNow).addClass("oldQuestion");
		$(thisQuesAnswer).addClass("guysAnswer");
		
		$(thisQuesAnswer).attr("id","");	//remove id
		
		content.insertBefore(FunctionExecutionObject.creatAQuestion(),questionNow);
		$(questionNow).attr("id","");	//remove id
		
		//更新计时器状态
		GlobalStatus.collectON = 0;
		FunctionExecutionObject.startTimer();
		//启动Q先生
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
	daFen: function() {
	},
	ansOutstanding: function(sid) {
		$("#guysAnswer .aAns").trigger("evt_ansOutstanding",sid);	//未缓存
		//$("#question").html("突出显示 " + sid);
	},
	groupOutstanding: function(gid) {
		$(".aGroupCard").trigger("evt_groupOutstanding",gid);		//未缓存
		//alert("突出小组 " + gid);
	},
	groupOutstandinGergodic: function(dest) {
		$actionBindObject.trigger("evt_groupOutstandinGergodic",dest);
		//alert("遍历讨论组 " + dest);
	},
	switchViewPage: function(optRole) {
		$pageSwitches.trigger("evt_pageSwitch",optRole);			//能否引用到 $pageSwitches 对象
		//alert("切换到页 " + optRole);
	}
}

var groupCut = {
	cutNow: 1,
	cutMax: 12,
	cutName:["第一组","第二组","第三组","第四组","第五组","第六组","第七组","第八组","第九组","第十组","第十一组","第十二组"],
	nextCut: function() {
		if(this.cutNow == this.cutMax) {		//妈的 ===
			this.cutNow = 1;
			return ((this.cutNow - 1)* -100) + "%";
		}
		this.cutNow++;
		return ((this.cutNow - 1)* -100) + "%";
	},
	befCut: function() {
		if(this.cutNow == 1) {		//妈的 ===
			this.cutNow = this.cutMax;
			return ((this.cutNow - 1)* -100) + "%";
		}
		this.cutNow--;
		return ((this.cutNow - 1)* -100) + "%";
	},
	setCut: function(cutNum) {
		//不能为0 ，下标从1开始
		this.cutNow = cutNum;
		return((this.cutNow - 1)* -100) + "%";;
	},
	getCutName:function() {
		return this.cutName[this.cutNow - 1];
	}
};

// 以下是一些封装的模型类
var Timer = {
	mm: 0,
	ss: 0,
	clear: function() {
		this.mm = 0;
		this.ss = 0;
	}
}