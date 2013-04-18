$(document).ready(function(){
	/*<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<	准备数据阶段	>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>*/
	$("#switchMrQ")[0].oopPage = $("#mrQPage")[0];
	$("#switchGroup")[0].oopPage = $("#groupPage")[0];
	$("#switchVideo")[0].oopPage = $("#videoPage")[0];
	$("#switchWritePad")[0].oopPage = $("#writePage")[0];
	$("#switchPPT")[0].oopPage = $("#PPT")[0];
	$("#ch").hide();
	
	var temp = false;
	//------------------------------------------jQuery 对象缓存阶段
	var actionObj = {};
	$actionBindObject = $(actionObj);
	
	$video = $("video");
	$pptVideo = $("#pptVideo");
	
	var keyTags = {};
	keyTags.tagIds =[];
	$keyTags = $(keyTags);
	
	$pageSwitches = $(".pageSwitch");
	
	$mrQContent = $("#mrQContent");
	
	$mrQCover = $("#mrQCover");
	$groupCover = $("#groupCover");
	
	$ansOutStandingNow = null;
	$aGroupCard = $(".aGroupCard");
	/*<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<	功能绑定阶段	>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>*/
		$(window).bind("beforeunload",function(event) {
			return " 确定要离开现在的页面吗 ？";	//比想象中简单的确认方法
		});
	//------------------------------------------ 底层调用事件
	$mrQCover.bind("evt_mrQCoverDisNone",function(){
		$(this).hide();
		//$(".aAns[id=displayOutstanding]").attr("id","none");	//非缓存版本
		
		if($ansOutStandingNow) {
			$ansOutStandingNow.attr("id","notId");
			$ansOutStandingNow = null;
		}
	});
	
	$mrQCover.click(function(){
		$(this).trigger("evt_mrQCoverDisNone");
	});
	
	
	$groupCover.bind("evt_groupCoverDisNone",function(){
		$(this).hide();
		
	});
	$groupCover.click(function(){
		$(this).trigger("evt_groupCoverDisNone");
	});
	
	//------------------------------------------ 功能卡切换事件
	$pageSwitches.bind("evt_pageSwitch",function(evt,data){
		//每个按钮都订阅 evt_pageSwitch 事件做响应
		var thisRole = $(this).attr("data-buttonRole");
		
		if( thisRole === data) {
			//alert(thisRole + "响应");
			$(".aPage").hide();
			$(this.oopPage).show();
			$(this).addClass("active");
		}else {
			//alert(thisRole + "不响应");
			$(this).removeClass("active");
		}
	
	});
	
	$pageSwitches.click(function(){
		var buttonRole = $(this).attr("data-buttonRole");
		$pageSwitches.trigger("evt_pageSwitch",buttonRole);
	});
	
	//------------------------------------------ 突出显示某答案事件
	$mrQContent.delegate(".aAns","evt_ansOutstanding",function(evt,data){
		var thisSid = $(this).attr("data-sid");
		if (thisSid === data) {
			if($ansOutStandingNow) {	//如果已经放大显示，则关闭
				if ($ansOutStandingNow.attr("data-sid") === data) {
					$mrQCover.trigger("evt_mrQCoverDisNone");
					return;
				}
			}
			$mrQCover.trigger("evt_mrQCoverDisNone");
			
			$(this).attr("id","displayOutstanding");
			$mrQCover.show();
			$ansOutStandingNow = $(this);
		}
	});
	
	
	$mrQContent.delegate("#guysAnswer .aAns","click",function(){
		var thisCardSid = $(this).attr("data-sid");
		$(this).trigger("evt_ansOutstanding",thisCardSid);	//注意这里是局部触发
	});
	/*
	$mrQContent.delegate(".guysAnswer .aAns","click",function(){
		var thisCardSid = $(this).attr("data-sid");
		$(this).trigger("evt_ansOutstanding",thisCardSid);	//注意这里是局部触发
	});*/
	//------------------------------------------ 突出显示某讨论组事件
	//动态绑定的问题 ？？
	$aGroupCard.bind("evt_groupOutstanding",function(evt,data){
		var thisgroupId = $(this).attr("data-groupId");
		if(thisgroupId === data) {
			$("#groupSwitchCut").css("top",groupCut.setCut(thisgroupId));	//暂未缓存
			$("#groupTitle").html(groupCut.getCutName());					//暂未缓存
			$groupCover.show();
		}
	});
	
	$aGroupCard.click(function(){
		var thisgroupId = $(this).attr("data-groupId");
		$(this).trigger("evt_groupOutstanding",thisgroupId);
		//$(this).trigger("evt_colorChange",thisgroupId);
	});
	
	$actionBindObject.bind("evt_groupOutstandinGergodic",function(evt,data){
		if(data === "next") {
			$("#groupSwitchCut").css("top",groupCut.nextCut());	//暂未缓存
			$("#groupTitle").html(groupCut.getCutName());					//暂未缓存
			$groupCover.show();
			//alert(groupCut.cutNow);
		}
		if(data === "before") {
			$("#groupSwitchCut").css("top",groupCut.befCut());	//暂未缓存
			$("#groupTitle").html(groupCut.getCutName());					//暂未缓存
			$groupCover.show();
			//alert(groupCut.cutNow);
		}
	});

	$aGroupCard.bind("evt_colorChange",function(evt,data){
		var thisgroupId = $(this).attr("data-groupId");
			$(this).stop();
			var hot = $(this).attr("data-hot");
			var startColor = "rgba(" + hot + ",50,50,.9)";
			var obj = {
				backgroundColor: startColor,
				color: "#000"
				};
			$(this).animate(obj, 1500);
			//$(this).animate({backgroundColor:"rgba(233,50,50,.9)",color: "#000"}, 1500);
			$(this).animate({backgroundColor:"rgba(233,250,250,.9)",color: "#000"}, 3000);
	});
	//------------------------------------------视频、字幕、PPT
	$actionBindObject.bind("evt_videoControl",function(evt,data) {
		if(data.action === "play") {
			//alert(data.action + " now");
			$video[0].play();
		}
		if(data.action === "pause") {
			//alert(data.action + " now");
			$video[0].pause();
		}
		if(data.action === "tagCycle") {
			//alert(data.action + " now :" + data.status);
			if(data.status){
				//alert("no action");
			}else {
				//alert("no action");
			}
		}
		if(data.action === "mute") {
			//alert(data.action + " now");
			$video[0].muted = true;
		}
		if(data.action === "unMute") {
			//alert(data.action + " now");
			$video[0].muted = false;
		}
		if(data.action === "fullScreen") {
			//alert(data.action + " now");
			if(data.status){
				//alert("fullScreen");
				$pptVideo[0].webkitRequestFullScreen();
			}else {
				//alert("un fullScreen");
				document.webkitCancelFullScreen();
			}
		}
	});
	$actionBindObject.bind("evt_subtitleTagLoad",function(evt,data) {
		//alert("切换字幕标签：" + data);
		var destTagId = data;
		var thisTagStart = $keyTags.tagIds[destTagId];
		alert(thisTagStart);
		$video[0].currentTime = thisTagStart;
	});
	$actionBindObject.bind("evt_subtitleControl",function(evt,data) {
		if(data.mode === "cover") {
			//alert(data.mode + " now");
			if(data.status){
				$("#ziMuContainer").addClass("cover");
			}else {
				$("#ziMuContainer").removeClass("cover");
			}
		}
		if(data.mode === "mark") {
			//alert(data.mode + " now");
			if(data.status){
				$("#ziMuContainer").addClass("mark");
			}else {
				$("#ziMuContainer").removeClass("mark");
			}
		}
		if(data.mode === "toggle") {
			//alert(data.mode + " now :" + data.status);
			if(data.status){
				$("#en").hide();
				$("#ch").show();
			}else {
				$("#en").show();
				$("#ch").hide();
			}
		}
		if(data.mode === "autoPause") {
			//alert(data.action + " now");
			if(data.status){
				//alert("no action");
			}else {
				//alert("no action");
			}
		}
	});
	$actionBindObject.bind("evt_pptControl",function(evt,data) {
		//alert("ppt控制" + data.opt);
		var action = data.action;
		var pptCurrentTime = data.currentTime;
		
		$pptVideo[0].pause();
		if(action ==="play") {
		}else {
			$pptVideo[0].currentTime = pptCurrentTime;
		}
	});
	
	$pptVideo[0].addEventListener('timeupdate',function(){
		var value = $pptVideo[0].currentTime;
		if (Math.abs(3.22 - value) < 0.2 ) {
			$pptVideo[0].play();
			if(temp) {
			}else{
				setTimeout(pptPause,8600);
				temp = true;
			}
		}
		if (Math.abs(11.9 - value) < 0.2 ) {
			$pptVideo[0].play();
			if(temp) {
			}else{
				setTimeout(pptPause,11500);
				temp = true;
			}
		}
		if (Math.abs(25.5 - value) < 0.2 ) {
			$pptVideo[0].play();
			if(temp) {
			}else{
				setTimeout(pptPause,10500);
				temp = true;
			}
		}
		function pptPause(){
			//alert("pause now");
			$pptVideo[0].pause();
			temp = false;
		}
	},false);
	//------------------------------------------测试点
	$("#toFullScreen").click(function(){
		$pptVideo[0].webkitRequestFullScreen();
	});
	$("#testButtom1").click(function(){
		$("#ziMuContainer").toggleClass("cover");
		$("#ziMuContainer").toggleClass("mark");
	});
	
	$("#testButtom2").click(function(){
		$("#en").toggle();
		$("#ch").toggle();
		$groupCover.toggle();
	});
	
	$("#testButtom3").click(function(){
		$actionBindObject.trigger("evt_groupOutstandinGergodic","before");
		//$video[0].play();
		document.webkitCancelFullScreen();
	});
	
	$("#testButtom4").click(function(){
		
		//$(".pageSwitch").trigger("evt_pageSwitch","MrQ");
		//$("#guysAnswer .aAns").trigger("evt_ansOutstanding","1120126125");
		//$actionBindObject.trigger("evt_groupOutstandinGergodic","next");
		$pptVideo[0].webkitRequestFullScreen();
		//$mrQCover.trigger("evt_mrQCoverDisNone");
	});
	$("#setTime").click(function(){
		var time = $("#timeInput").attr("value");
		//alert(time);
		$pptVideo[0].currentTime = time;
	});
	/*<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<	启动器	>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>*/
	$(window).bind("load",getGroupMsg_Ajax.init);
	$(window).bind("load",getStudengMsg_Ajax.init);
	$(window).bind("load",controlAjax.init);
	//------------------------------------------问题
	
	//字幕设置的部分
	var str = {
"dialogues":{
				"tags":[4,5,9,10,12,19,21,24,25,28],
				"captions":
						[
							{
								"language":"en",
								"dialogues":
								[
								{"id":1,"start":2.05,"end":5.57,"text":"I teach because","keyWords":null},
								{"id":2,"start":5.57,"end":7.25,"text":"when you learn ,","keyWords":null},
								{"id":3,"start":7.25,"end":9.559,"text":"you become a better person always","keyWords":null},
								{"id":4,"start":9.559,"end":13.44,"text":" I get to see young minds <span class='key'>blossom</span>,","keyWords":["blossom"]},
								{"id":5,"start":13.44,"end":17.099,"text":"grow, develop. The ability to <span class='key'>engage</span> the<br>students","keyWords":["engage"]},
								{"id":6,"start":17.099,"end":21.58,"text":"is the key to be a good teacher.<br>Using outdated materials such as","keyWords":null},
								{"id":7,"start":21.58,"end":22.579,"text":"textbooks","keyWords":null},
								{"id":8,"start":22.579,"end":24.999,"text":"makes that job much more difficult","keyWords":null},
								{"id":9,"start":24.999,"end":28.209,"text":"In textbooks there are <span class='key'>diagrams</span> that are static","keyWords":["diagrams"]},
								{"id":10,"start":28.210,"end":32.369,"text":"something like a cell memory , a <span class='key'>fluid<span> thing, always moving","keyWords":["fluid"]},
								{"id":11,"start":32.369,"end":35.68,"text":"With US history, they print textbooks that are","keyWords":null},
								{"id":12,"start":35.68,"end":40.88,"text":"outdated and that is the second printed that<br>.Textbooks are really expensive <span class='key'>tense<span> but severe instances","keyWords":["tense"]},
								{"id":13,"start":40.88,"end":44.81,"text":"they're usually sixty to hundred<br>dollars for different textbooks","keyWords":null},
								{"id":14,"start":44.81,"end":45.9,"text":"So,","keyWords":null},
								{"id":15,"start":45.9,"end":50.37,"text":"They’re adopted for five years and you stop with them. They are extremely heavy and if","keyWords":null},
								{"id":16,"start":50.37,"end":52.73,"text":"you have three or four in a backpack","keyWords":null},
								{"id":17,"start":52.73,"end":57.47,"text":"you know it's a lot of weight and<br>some students simply quit","keyWords":null},
								{"id":18,"start":57.47,"end":60.66,"text":"bringing textbooks to class. There<br>is no reason","keyWords":null},
								{"id":19,"start":60.66,"end":65.199,"text":"today to <span class='key'>assume</span> kids to use the same tools that were used in  1950’s. In fact,  to do so","keyWords":["assume"]},
								{"id":20,"start":65.199,"end":70.75,"text":"is to prepare them for a world that is already past.","keyWords":null},
								{"id":21,"start":70.75,"end":74.65,"text":"Education has always been a big part in <span class='key'>technology’s</span> DNA","keyWords":["technology’s"]},
								{"id":22,"start":74.65,"end":79.03,"text":"and that's because we really believe<br>technology can make a profound difference","keyWords":null},
								{"id":23,"start":79.03,"end":83.04,"text":"in the way that teachers teach, kids learn.","keyWords":null},
								{"id":24,"start":83.04,"end":85.18,"text":"And we now have the <span class='key'>opportunity</span>","keyWords":["opportunity"]},
								{"id":25,"start":85.18,"end":92.1,"text":"to change one of the <span class='key'>cornerstones</span> of<br>education","keyWords":["cornerstones"]},
								{"id":26,"start":92.1,"end":96.15,"text":"with the mobile device we’re making textbooks so<br>much more engaging","keyWords":null},
								{"id":27,"start":96.15,"end":97.71,"text":"playing audio, video","keyWords":null},
								{"id":28,"start":97.71,"end":104.71,"text":"<span class='key'>Interactivity.</span> The content comes to life<br>in ways that’s just not possible in printed pages.","keyWords":["Interactivity"]},
								]
							},
							{
								"language":"ch",
								"dialogues":
								[
								{"id":1,"start":2.05,"end":5.57,"text":"我教书的原因是","keyWords":null},
								{"id":2,"start":5.57,"end":7.25,"text":"当你学习时","keyWords":null},
								{"id":3,"start":7.25,"end":9.559,"text":"你能成为一个更好的人，一向如此","keyWords":null},
								{"id":4,"start":9.559,"end":13.44,"text":" 我能看到这群年轻学子<span class='key'>开花结果</span>","keyWords":["开花结果"]},
								{"id":5,"start":13.44,"end":17.099,"text":",发光发热.<span class='key'> 吸引学生的能力</span>","keyWords":["吸引"]},
								{"id":6,"start":17.099,"end":21.58,"text":"是成为一个好老师的关键.<br>使用教科书那样过时了的","keyWords":null},
								{"id":7,"start":21.58,"end":22.579,"text":"教材","keyWords":null},
								{"id":8,"start":22.579,"end":24.999,"text":"让教学过程困难许多","keyWords":null},
								{"id":9,"start":24.999,"end":28.209,"text":"教科书中有<span class='key'>图表</span>,但是他是静态的","keyWords":["图表"]},
								{"id":10,"start":28.210,"end":32.369,"text":"但像细胞内存那样的是<span class='key'>流动</span>的事物，它们一直是移动的","keyWords":["流动"]},
								{"id":11,"start":32.369,"end":35.68,"text":"过期的美国历史教科书","keyWords":null},
								{"id":12,"start":35.68,"end":40.88,"text":"只花不到一秒的时间就被印出来<br>.教科书非常昂贵","keyWords":["tense"]},
								{"id":13,"start":40.88,"end":44.81,"text":"每本通常要花60～100美元","keyWords":null},
								{"id":14,"start":44.81,"end":45.9,"text":"然而","keyWords":null},
								{"id":15,"start":45.9,"end":50.37,"text":"过了几年时间,你就开始库存这些书，它们非常重","keyWords":null},
								{"id":16,"start":50.37,"end":52.73,"text":"如果你放了三四本在背包里","keyWords":null},
								{"id":17,"start":52.73,"end":57.47,"text":"你知道,那真的很重","keyWords":null},
								{"id":18,"start":57.47,"end":60.66,"text":"所以有些学生就干脆不带教科书到学校上课","keyWords":null},
								{"id":19,"start":60.66,"end":65.199,"text":"<span class='key'>假定</span>今日的学生必须和50年代的学生使用一样的学习工具是不合理的","keyWords":["假定"]},
								{"id":20,"start":65.199,"end":70.75,"text":"事实上,那个时期学生所处的时代早已经过去了.","keyWords":null},
								{"id":21,"start":70.75,"end":74.65,"text":"教育一直是<span class='key'>科技</span>基因中重要的一部分","keyWords":["科技"]},
								{"id":22,"start":74.65,"end":79.03,"text":"因为我们深信<br>科技能够深刻的改变教师教学","keyWords":null},
								{"id":23,"start":79.03,"end":83.04,"text":"以及学生学习的方式.","keyWords":null},
								{"id":24,"start":83.04,"end":85.18,"text":"我们现在有此<span class='key'>机会</span>","keyWords":["机会"]},
								{"id":25,"start":85.18,"end":92.1,"text":"改变教学<span class='key'>基石</span>中的一部分:教科书","keyWords":["基石"]},
								{"id":26,"start":92.1,"end":96.15,"text":"透过移动设备我们能使教科书更有吸引力","keyWords":null},
								{"id":27,"start":96.15,"end":97.71,"text":"加入音效、影片及互动能力","keyWords":null},
								{"id":28,"start":97.71,"end":104.71,"text":"教学内容变得<span class='key'>栩栩如生</span><br>这种方式正是传统印刷所无法达成的.","keyWords":["栩栩如生"]},
								]
							}
						]
			},
"chapters":null
};
	
	//var t = eval("(" + str + ")");
	
    FunctionExecutionObject.setCaptions(str.dialogues);
});