var FunctionExecutionObject = {
	addMsgToRoom: function(msgsDatas) {
		for(var i = 0; i< msgsDatas.length; i++) {
			var thisMsg = msgsDatas[i];
			
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
			$(newAnMessageDiv).addClass("other");
			$(newAnMessageDiv).addClass("fClear");
			
			newAnMessageDiv.appendChild(newWhoDiv);
			newAnMessageDiv.appendChild(newMsgDiv);

			var theContentBox = document.getElementById("content");
			theContentBox.appendChild(newAnMessageDiv);
		}
		//$("body").animate({scrollTop: $(document).height()}, 'slow');
		//$("#input").focus();
	},
	addMyMsg: function(thisMsg) {
			var whoTextNode = document.createTextNode("我");
			var msgTextNode = document.createTextNode(thisMsg);
			
			var newWhoDiv = document.createElement("div");
			var newMsgDiv = document.createElement("div");
			
			newWhoDiv.appendChild(whoTextNode);
			newMsgDiv.appendChild(msgTextNode);
			
			$(newWhoDiv).addClass("member");
			$(newMsgDiv).addClass("message");

			var newAnMessageDiv = document.createElement("div");
			$(newAnMessageDiv).addClass("aMessage");
			$(newAnMessageDiv).addClass("me");
			$(newAnMessageDiv).addClass("fClear");
			
			newAnMessageDiv.appendChild(newWhoDiv);
			newAnMessageDiv.appendChild(newMsgDiv);
			
					//var newClearDiv = document.createElement("div");
					//$(newClearDiv).addClass("clearFloat");
					//newAnswerDiv.appendChild(newClearDiv);
				
			var theContentBox = document.getElementById("content");
			theContentBox.appendChild(newAnMessageDiv);
			//$("body").animate({scrollTop: $(document).height()}, 'slow');
			//$("#input").focus();
	}
};