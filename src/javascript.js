function getH() {
	var myHeight = 0;
	if( typeof( window.innerWidth ) == 'number' ) {
		myHeight = window.innerHeight;
	} else if( document.documentElement && ( document.documentElement.clientWidth || document.documentElement.clientHeight ) ) {
		myHeight = document.documentElement.clientHeight;
	} else if( document.body && ( document.body.clientWidth || document.body.clientHeight ) ) {
		myHeight = document.body.clientHeight;
	}
	return myHeight;
}
function fittoheight() {
	var h  = $('.content p').height();
	if($('.content ul').length>0) h += $('.content ul').height();
	$('.contentrow').height(h);
	$('.middle,.middle img').css('height','0');
	var m = ($(window).height() - $('.tb').height());
	if($('figure').length==0){
		$('.content').css('paddingTop',(m/2+5)+'px');
		$('.content').css('paddingBottom',(m/2+5)+'px');
	} else {
		$('.middle').css('height',m);
		$('.middle img').css('height','auto');
		$('.middle img').css('max-height',m);
		$('.middle').data('m',m);
		setTimeout(function() {
			var m = $('.middle').data('m');
			var n = (m-$('.middle img:eq(0)').height())/2;
			$('.middle img:eq(0)').css('paddingTop',n)
			$('.middle img:eq(0)').css('paddingBottom',n)
			if($('.middle img:eq(1)').length>0) {
				var n = (m-$('.middle img:eq(1)').height())/2;
				$('.middle img:eq(1)').css('paddingTop',n)
				$('.middle img:eq(1)').css('paddingBottom',n)
			}
			if($('.middle img:eq(2)').length>0) {
				var n = (m-$('.middle img:eq(2)').height())/2;
				$('.middle img:eq(2)').css('paddingTop',n)
				$('.middle img:eq(2)').css('paddingBottom',n)
			}
		}, 100);
	}
}

$(function () {
	fittoheight()
	if($('figure').length>1) {
		$('#next').show();
	}
	$('img,figure p').click(function(event) {
		if($('#next').hasClass('hidden')){
			$('#next').removeClass('hidden');
			$('#prev').removeClass('hidden');
			$('figure p').removeClass('hidden');
			$('figure img').removeClass('fullsize');
			$('figure img').css('paddingLeft',0)
		} else  {
			$('#next').addClass('hidden');
			$('#prev').addClass('hidden');
			$('figure p').addClass('hidden');
			$('figure img').addClass('fullsize');
			if($('figure img').width()!=$('figure').width()){
				$('figure img').css('paddingLeft', ($('figure').width()-$('figure img').width())/2 )
			}
		}
	});
	$('#next').click(function(event) {
		$('#prev').show();
		var s = $('.middle').children('figure').length;
		var p = $('.middle').find('figure:not(.bgimg)').index()
		$('.middle').find('figure:not(.bgimg)').addClass('bgimg');
		if((p+1)===s) $('.middle').children(':eq(0)').removeClass('bgimg');
		else $('.middle').children(':eq('+(p+1)+')').removeClass('bgimg');
		if((p+2)===s) $('#next').hide();
	});
	$('#prev').click(function(event) {
		var s = $('.middle').children('figure').length;
		var p = $('.middle').find('figure:not(.bgimg)').index()
		$('.middle').find('figure:not(.bgimg)').addClass('bgimg');
		if(p==1) {
			$('#prev').hide();
			$('#next').show();
		} else $('#next').show();
		if(p===0) $('.middle').children(':eq('+(s-1)+')').removeClass('bgimg');
		else $('.middle').children(':eq('+(p-1)+')').removeClass('bgimg');
	});
	$('body').on('click','.sound',function(e){
    	//$('body').scrollTop();
		//if(console) console.log('yep '+$(this).attr('href'))
		if($(this).data('play')) {
			var audio = $(this).data('play');
			if($(this).data('pausing')==1) {
				audio.currentTime = 0;
				audio.play();
				$(this).parent().parent().addClass('playing');
				$(this).parent().addClass('pulse').removeClass('play-alt').addClass('stop-alt');
				$(this).data('pausing',0);
			} else {
				audio.pause();
				$(this).parent().parent().removeClass('playing');
				$(this).data('pausing',1);
				$(this).parent().removeClass('pulse').addClass('play-alt').removeClass('stop-alt');
			}
		} else {
			stoppallsounds();
			var audio = new Audio($(this).attr('href'));
			audio.play();
			$(this).parent().parent().addClass('playing');
			$(this).parent().parent().addClass('played');
			$(this).parent().addClass('pulse').removeClass('play-alt').addClass('stop-alt');
			$(this).data('play',audio);
			audio.element = this
			$(audio).on('ended', function() {
               if(console) console.log(this.element)
               $(this.element).parent().removeClass('pulse').addClass('play-alt').removeClass('stop-alt');
            });
		}
		e.stopPropagation();
		return false;
	});
	$('figure p').each(function() {
		// margin-top:-28px;
		if($(this).height()>19) $(this).css('marginTop','-45px');
		 //console.log($(this).height());
	});


	/**** touch select
	*/
	$('figure img').on('touchstart',function(event) {
		var e = window.event;
		var posX = e.clientX;
	    var posY = e.clientY;
	     $(this).data('s',1)
	    //console.log(event.originalEvent.touches[0].pageX);
	    $(this).data('pos',event.originalEvent.touches[0].pageX)
	    //$('#log').html('touch');
	});
	$('figure img').on('touchmove mousemove',function(event) {
	    if($(this).data('s')==1) {
	    var d = 8;
	    var p = $(this).data('pos')-event.originalEvent.touches[0].pageX;
	     //$('#log').html('tm '+p);
	    // console.log('tm '+p);
	    if(p>d) {
		    var c = $(this).parents('figure').index();
		    var t = ($(this).parents('figure').children().length-1);
		    if(c==t)  $(this).parents('figure').prev().find('li:eq(0)').click();
		    else $(this).parents('figure').prev().find('li:eq('+(c+1)+')').click();
		    //console.log(p+' next '+$(this).parents('figure').index()+' '+$(this).parents('figure').children().length)
		    $(this).data('s',0)
	    } else if(p<-d) {
	        var c = $(this).parents('figure').index();
		    var t = ($(this).parents('figure').children().length-1);
	        if(c==0) {
	            $('#next').click();
	            //console.log(p+' c '+c+' t '+t)
	        }
		    else $(this).parents('figure').prev().find('li:eq('+(c-1)+')').click();
	        //console.log(p+' prev '+c)
		    $(this).data('s',0)
	    }
	   }
	});
});



window.onorientationchange = function() {
	fittoheight();
	
}


function stoppallsounds() {
	 $('.sound').each(function(){
	 	var audio = $(this).data('play');
	 	if($(this).data('play')) {
	 		audio.pause();
	 		$(this).parent().parent().removeClass('playing');
			$(this).data('pausing',1);
			$(this).parent().removeClass('pulse').addClass('play-alt').removeClass('stop-alt');
	 	}
	 });
}