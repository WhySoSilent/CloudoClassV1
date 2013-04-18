$(document).ready(function(){
	var video = $("video")[0];
	var play = $("#play")[0];
	var buffer = $(".buffer")[0];
	
	//video.removeAttribute('controls');
	
	$("#play").click(function(){
		if(video.ended) {
			video.currentTime = 0;
		}
		if(video.paused) {
			video.play();
		} else {
			video.pause();
		}
	});
	$("#playUp").click(function(){
		video.currentTime += 30;
	});
	$("#playBack").click(function(){
		video.currentTime -= 30;
	});
	
	$("#volumeDown").click(function(){
		//$(".controls").fadeOut();
	});
	$("#volumeUp").click(function(){
		video.muted = true;
		setTimeout("$('video')[0].muted = false;",2000);
	});
/*	
	$("#videoBox").bind("mouseover",function(){
		$(".controls").slideDown('slow');
	});
	
	$("#videoBox").bind("mouseout",function(){
		$(".controls").slideUp('slow');
	});
*/
	
	video.addEventListener('play',function(){
		play.innerHTML ='&#x2950;&#x2950;';
		play.title = 'pause';
	},false);
	
	video.addEventListener('pause',function(){
		play.innerHTML ='&#x25ba;';
		play.title = 'play';
	},false);
	
	video.addEventListener('ended',function(){
		this.pause();
	},false);
	
	video.addEventListener('timeupdate',function(){
		var currentTimeBar = $("#progress")[0];
		var value = 0;
		if (video.currentTime > 0) {
			value = Math.floor((100 / video.duration) * video.currentTime);
		}
		currentTimeBar.style.width = value + "%";
		//$(currentTimeBar).html(video.currentTime);
	},false);
	
/*
	video.addEventListener('durationChange',updateSeekable,false);
	video.addEventListener('progress',updateSeekable,false);
	function updateSeekable(){
		//var endVal = this.seekable && this.seekable.length ? this.seekable.end() : 0;
		buffer.style.width = (100/ (this.duration || 1) * (this.seekable && this.seekable.length ? this.seekable.end() : 0)) + '%';
	};
*/

	
	function speedup(video,direction) {
		if(direction == undefined) direction = 1;
		
		if(video.playbackRate != undefined) {
			video.playbackRate = direction == 1 ? 2: -2;
		} else {
			video.setAttribute('data-playbackRate',setInterval((function(){
				video.currentTime += direction;
				return arguments.callee;
			})(),500));
		}
	}
	
	function playnormal(video) {
		if(video.playbackRate != undefined) {
			video.playbackRate = 1;
		} else {
			clearInterval(video.getAttribute('data-playbackRate'));
		}
	}


/*
	$(video).bind('play',function(){
		play.innerHTML ='&#x2950;&#x2950;';
		play.title = 'pause';
	});
	$(video).bind('pause',function(){
		play.innerHTML ='&#x25ba;';
		play.title = 'play';
	});
	$(video).bind('ended',function(){
		this.pause();
	});
*/
});