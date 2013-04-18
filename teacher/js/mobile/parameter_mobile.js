$(document).ready(function(){	// jQuery 的 ready 先于 window 的 load 执行

/*<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<	准备数据阶段	>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>*/
	$guysAnswer = $("#guysAnswer");
	$switchView = $(".switchView");
	$captionsTags = $("#captionsTags");
	$controlSender = $(".controlSender");
	$pptControl = $(".pptControl");
	$pptView = $("#pptView");
	
	$groupOutstanding = $("#groupOutstanding");
	$groupOutstandinGergodic = $(".groupOutstandinGergodic");
/*<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<	功能绑定阶段	>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>*/
	$guysAnswer.delegate(".aAns","evt_ansOutstanding",function(){
		var thisSid = $(this).attr("data-sid");
		FunctionExecutionObject.sendOutstandingSid(thisSid);
	});
	
	$guysAnswer.delegate(".aAns","click",function(){
		$(this).trigger("evt_ansOutstanding");
	});
	
	$switchView.bind("click",function(){
		var optRole = $(this).attr("data-buttonRole");
		//alert("gotta it :" + optRole);
		FunctionExecutionObject.sendViewPageSwitch(optRole);
	});
	
	$groupOutstandinGergodic.bind("click",function(){
		var actionRole = $(this).attr("data-actionRole");
		//alert("action is :" + actionRole);
		FunctionExecutionObject.groupOutstandinGergodic(actionRole);
	});
	
	$groupOutstanding.bind("click",function(){
		//alert("action is :" + actionRole);
		var gid = 1;
		FunctionExecutionObject.groupOutstanding(gid);
	});
	
	$captionsTags.bind("change",function(){
		var thisId = $(this).attr("value");
		FunctionExecutionObject.loadTagWithId(thisId);
	});
	
	$controlSender.bind("click",function(){
		FunctionExecutionObject.sendControlSignal(this);
	});
	
	$pptControl.bind("click",function(){
		var actionRole = $(this).attr("data-actionRole");
		//设置PPT时间
		FunctionExecutionObject.pptControl(actionRole);
	});
/*<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<	启动器	>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>*/
	$(window).bind("beforeunload",function(event) {
		return " 确定要离开现在的页面吗 ？";	//比想象中简单的确认方法
	});
	$(window).bind("load",DynchronizingServerStatus.init);		//同步服务器状态的代码是应该移到 ready 里面吗??	服务器返回未测试
	$(window).bind("load",getData_Ajax.init);
	$(window).bind("load",sendControlAjax.init);

	var pptTag = {
	"pptPages":
		[
			{"id":1,"start":0.2,"end":13.44,"text":"大家好"},
			{"id":2,"start":0.7,"end":13.44,"text":"身在校园的我们发现"},
			{"id":3,"start":1,"end":13.44,"text":"我们切身体会到"},
			{"id":4,"start":1.2,"end":13.44,"text":"1 人数多导致课堂"},
			{"id":5,"start":1.5,"end":13.44,"text":"2 大班状态下老师辐射"},
			{"id":6,"start":1.7,"end":13.44,"text":"3 教学中最重要的"},
			{"id":7,"start":1.9,"end":13.44,"text":"我们在想，课堂上怎样"},
			{"id":8,"start":2.1,"end":13.44,"text":"教学过程中"},
			{"id":9,"start":2.5,"end":13.44,"text":"然而，时下流行的"},
			{"id":10,"start":3,"end":13.44,"text":"将社交的概念引入"},
			{"id":11,"start":3.22,"end":13.44,"text":"在我们的设计中"},
			{"id":12,"start":11.9,"end":13.44,"text":"老师在课堂的任何"},
			{"id":13,"start":24,"end":13.44,"text":"教材为什么"},
			{"id":13,"start":25,"end":13.44,"text":"影视字幕能为学习者"},
			{"id":13,"start":25.5,"end":13.44,"text":"提供了多种多样的"},
			{"id":15,"start":36,"end":13.44,"text":"如此一来可以想象"},
			{"id":16,"start":36.5,"end":13.44,"text":"演示系统"}
		]
	};
	PPT.setPptObj(pptTag.pptPages);
	
	var str = {
		"dialogues":{
						"tags":[4,5,9,10,12,19,21,24,25,28],
						"captions":
								[
									{
										"language":"en",
										"dialogues":
										[
										{"id":4,"start":9.559,"end":13.44,"text":" I get to see young minds <span class='key'>blossom</span>,","keyWords":["blossom"]},
										{"id":5,"start":13.44,"end":17.099,"text":"grow, develop. The ability to <span class='key'>engage</span> the<br>students","keyWords":["engage"]},
										{"id":9,"start":24.999,"end":28.209,"text":"In textbooks there are <span class='key'>diagrams</span> that are static","keyWords":["diagrams"]},
										{"id":10,"start":28.210,"end":32.369,"text":"something like a cell memory , a <span class='key'>fluid<span> thing, always moving","keyWords":["fluid"]},
										{"id":12,"start":35.68,"end":40.88,"text":"outdated and that is the second printed that<br>.Textbooks are really expensive <span class='key'>tense<span> but severe instances","keyWords":["tense"]},
										{"id":19,"start":60.66,"end":65.199,"text":"today to <span class='key'>assume</span> kids to use the same tools that were used in  1950’s. In fact,  to do so","keyWords":["assume"]},
										{"id":21,"start":70.75,"end":74.65,"text":"Education has always been a big part in <span class='key'>technology’s</span> DNA","keyWords":["technology’s"]},
										{"id":24,"start":83.04,"end":85.18,"text":"And we now have the <span class='key'>opportunity</span>","keyWords":["opportunity"]},
										{"id":25,"start":85.18,"end":92.1,"text":"to change one of the <span class='key'>cornerstones</span> of<br>education","keyWords":["cornerstones"]},
										{"id":28,"start":97.71,"end":104.71,"text":"<span class='key'>Interactivity.</span> The content comes to life<br>in ways that’s just not possible in printed pages.","keyWords":["Interactivity"]},
										]
									},
									{
										"language":"ch",
										"dialogues":
										[
										{"id":4,"start":9.559,"end":13.44,"text":" 我能看到这群年轻学子<span class='key'>开花结果</span>","keyWords":["开花结果"]},
										{"id":5,"start":13.44,"end":17.099,"text":",发光发热.<span class='key'> 吸引学生的能力</span>","keyWords":["吸引"]},
										{"id":9,"start":24.999,"end":28.209,"text":"教科书中有<span class='key'>图表</span>,但是他是静态的","keyWords":["图表"]},
										{"id":10,"start":28.210,"end":32.369,"text":"但像细胞内存那样的是<span class='key'>流动</span>的事物，它们一直是移动的","keyWords":["流动"]},
										{"id":12,"start":35.68,"end":40.88,"text":"只花不到一秒的时间就被印出来<br>.教科书非常昂贵","keyWords":["tense"]},
										{"id":19,"start":60.66,"end":65.199,"text":"<span class='key'>假定</span>今日的学生必须和50年代的学生使用一样的学习工具是不合理的","keyWords":["假定"]},
										{"id":21,"start":70.75,"end":74.65,"text":"教育一直是<span class='key'>科技</span>基因中重要的一部分","keyWords":["科技"]},
										{"id":24,"start":83.04,"end":85.18,"text":"我们现在有此<span class='key'>机会</span>","keyWords":["机会"]},
										{"id":25,"start":85.18,"end":92.1,"text":"改变教学<span class='key'>基石</span>中的一部分:教科书","keyWords":["基石"]},
										{"id":28,"start":97.71,"end":104.71,"text":"教学内容变得<span class='key'>栩栩如生</span><br>这种方式正是传统印刷所无法达成的.","keyWords":["栩栩如生"]},
										]
									}
								]
					},
		"chapters":null
		};
	FunctionExecutionObject.setTages(str.dialogues);
});