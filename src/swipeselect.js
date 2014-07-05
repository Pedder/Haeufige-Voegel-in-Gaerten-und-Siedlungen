jQuery(document).ready(function($) {
//  $( "#card" ).bind( "tap", function( e ){
//			alert( "Tap!" );
//
//
//	});
//    document.querySelector("#info").innerHTML = 'started';
//
//
//
//
// $( "#card" ).bind( "tap", function( e ){
// 	$("#info").html(' end');
// 	$("#card").rotate(0);
// });
// 
// #card
$("#card").on('touchend mouseup touchcancel',function (e){
	$("#cardbg").attr('class',' ');
			$("#card").rotate(0);
    e.preventDefault();
    $("#card").rotate(0);
});
   $("#card").swipe( {

   	//   swipeLeft:function(event, direction, distance, duration, fingerCount) {
	swipeStatus:function(event, phase, direction, distance, duration, fingerCount) {

		var mindist = 50;
		//Here we can check the:
		//phase : 'start', 'move', 'end', 'cancel'
		//direction : 'left', 'right', 'up', 'down'
		//distance : Distance finger is from initial touch point in px
		//duration : Length of swipe in MS
		//fingerCount : the number of fingers used
		$("#info").html(' '+direction+' '+distance);
		if(direction=='left' &&  $('.decision_no').length>0) {
			// $(".middle,.contentrow p").rotate(-distance);
			$("#cardbg").attr('class','left');
			$(".decision_no").removeClass('passive');
			$(".decision_yes").addClass('passive');
			if(distance>mindist){
				$("#cardbg").attr('class','left1');
				// $("#card").fadeOut('fast', function() {
				// });;
				//$("#info").html(' nop');
				// setTimeout(function(){ 
				// 	window.location.href = $('.decision_no').attr('href');
				// }, 1000);
				if(phase=='cancel' || phase=='end') {
					window.location.href = $('.decision_no').attr('href');
				} 
			} else {
				if(phase=='cancel' || phase=='end') {
					$("#cardbg").attr('class',' ');
					$("#card").rotate(0);
					$(".decision_yes").removeClass('passive');
				}
			}
		} else if(direction=='right' &&  $('.decision_yes').length>0) {
			// $(".middle,.contentrow p").rotateX(distance);
			$("#cardbg").attr('class','right');
			$(".decision_yes").removeClass('passive');
			$(".decision_no").addClass('passive');
			if(distance>mindist){
				$("#cardbg").attr('class','right1');
				// $("#card").fadeOut('fast', function() {
				// });;
				//$("#info").html(' yep');
				// setTimeout(function(){ 
				// 	//alert($('.decision_yes').attr('href'))
				// 	window.location.href = $('.decision_yes').attr('href');
				// }, 1000);
				if(phase=='cancel' || phase=='end') {
					window.location.href = $('.decision_yes').attr('href');
				}
			} else {
				if(phase=='cancel' || phase=='end') {
					$("#cardbg").attr('class',' ');
					$("#card").rotate(0);
					$(".decision_no").removeClass('passive');
				}
			}
		} else if(phase=='cancel' || phase=='end') {
			//$(".home").html(' end');
			$("#cardbg").attr('class',' ');
			$("#card").rotate(0);
		} else {
			$("#info").html(' '+duration+' '+distance);
		}
	},
	threshold:20,
	maxTimeThreshold:2050,
	fingers:'all'
	});
});

// (function animloop(){
//    requestAnimationFrame(animloop);
//    //$("#card").innerHTML = 'click '+e.pageX;
//
//})();
jQuery.fn.rotate = function(degrees) {
    $(this).css({'-webkit-transform' : 'rotateY('+ degrees +'deg) rotateX('+ degrees +'deg)',
                 '-moz-transform' : 'rotateY('+ degrees +'deg) rotateX('+ degrees +'deg)',
                 '-ms-transform' : 'rotateY('+ degrees +'deg) rotateX('+ degrees +'deg)',
                 'transform' : 'rotateY('+ degrees +'deg) rotateX('+ degrees +'deg)'});
};
jQuery.fn.rotateX = function(degrees) {
    $(this).css({'-webkit-transform' : 'rotateY('+ degrees +'deg) rotateX('+ -degrees +'deg)',
                 '-moz-transform' : 'rotateY('+ degrees +'deg) rotateX('+ -degrees +'deg)',
                 '-ms-transform' : 'rotateY('+ degrees +'deg) rotateX('+ -degrees +'deg)',
                 'transform' : 'rotateY('+ degrees +'deg) rotateX('+ -degrees +'deg)'});
};



// document.addEventListener('touchmove', function(e) {
//     e.preventDefault();
//     var touch = e.touches[0];
//     $("#info1").html(touch.pageX + " - " + touch.pageY);
// }, false);
// document.addEventListener('touchend', function(e) {
//     var touch = e.touches[0];
//     $("#info").html('end'+touch.pageX + " - " + touch.pageY);



// }, false);
// document.addEventListener('touchstart', function(e) {
//     e.preventDefault();
//     var touch = e.touches[0];
//     $("#info").html('start'+touch.pageX + " - " + touch.pageY);
// }, false);

// var flag = 0;
// var element = document.querySelector("#card");

// element.addEventListener("touch", function(e){
//     flag = 0;
//     document.querySelector("#info").innerHTML = '!active';
//      document.querySelector("#info").pos = e.pageX;
//     document.querySelector("#info").m = 1;
// }, false);
// element.addEventListener("mousedown", function(e){
//     flag = 0;
//     document.querySelector("#info").innerHTML = 'active';
//      document.querySelector("#info").pos = e.pageX;
//     document.querySelector("#info").m = 1;
// }, false);
// element.addEventListener("mousemove", function(e){
//     flag = 1;

//     document.querySelector("#info").innerHTML = 'down '+(document.querySelector("#info").pos-e.pageX);

//    if(document.querySelector("#info").m === 1)  {
//        $("#card").rotate(-(document.querySelector("#info").pos-e.pageX));
//        if((document.querySelector("#info").pos-e.pageX)>0) $("#cardbg").attr('class','right');
//        else $("#cardbg").attr('class','left');
//    }
// }, false);
// element.addEventListener("mouseup", function(e){
//     if(flag === 0){
//        document.querySelector("#info").innerHTML = 'click '+e.pageX;
//     }
//     else if(flag === 1){
//         document.querySelector("#info").innerHTML = 'drag'+e.pageX;
//     }
//     document.querySelector("#info").innerHTML = ' moved '+(document.querySelector("#info").pos-e.pageX);
//     $("#card").rotate(0);
//     document.querySelector("#info").m = 0;
// }, false);

// element.addEventListener("mouseout", function(e){

//     $("#card").rotate(0);
//     document.querySelector("#info").m = 0;
// }, false);


/*! Tappy! - a lightweight normalized tap event. Copyright 2013 @scottjehl, Filament Group, Inc. Licensed MIT */
(function( w, $, undefined ){

	// handling flag is true when an event sequence is in progress (thx androood)
	w.tapHandling = false;

	var tap = function( $els ){
		return $els.each(function(){

			var $el = $( this ),
				resetTimer,
				startY,
				startX,
				cancel,
				scrollTolerance = 10;

			function trigger( e ){
				$( e.target ).trigger( "tap", [ e, $( e.target ).attr( "href" ) ] );
				e.stopImmediatePropagation();
			}

			function getCoords( e ){
				var ev = e.originalEvent || e,
					touches = ev.touches || ev.targetTouches;

				if( touches ){
					return [ touches[ 0 ].pageX, touches[ 0 ].pageY ];
				}
				else {
					return null;
				}
			}

			function start( e ){
				if( e.touches && e.touches.length > 1 || e.targetTouches && e.targetTouches.length > 1 ){
					return false;
				}

				var coords = getCoords( e );
				startX = coords[ 0 ];
				startY = coords[ 1 ];
			}

			// any touchscroll that results in > tolerance should cancel the tap
			function move( e ){
				if( !cancel ){
					var coords = getCoords( e );
					if( coords && ( Math.abs( startY - coords[ 1 ] ) > scrollTolerance || Math.abs( startX - coords[ 0 ] ) > scrollTolerance ) ){
						cancel = true;
					}
				}
			}

			function end( e ){
				clearTimeout( resetTimer );
				resetTimer = setTimeout( function(){
					w.tapHandling = false;
					cancel = false;
				}, 1000 );

				if( e.ctrlKey || e.metaKey ){
					return;
				}

				e.preventDefault();

				// this part prevents a double callback from touch and mouse on the same tap

				// if a scroll happened between touchstart and touchend
				if( cancel || w.tapHandling && w.tapHandling !== e.type ){
					cancel = false;
					return;
				}

				w.tapHandling = e.type;
				trigger( e );
			}

			$el
				.bind( "touchstart MSPointerDown", start )
				.bind( "touchmove MSPointerMove", move )
				.bind( "touchend MSPointerUp", end )
				.bind( "click", end );
		});
	};

	// use special events api
	if( $.event && $.event.special ){
		$.event.special.tap = {
			add: function( handleObj ) {
				tap( $( this ), true );
			},
			remove: function( handleObj ) {
				tap( $( this ), false );
			}
		};
	}
	else{
		// monkeybind
		var oldBind = $.fn.bind;
		$.fn.bind = function( evt ){
			if( /(^| )tap( |$)/.test( evt ) ){
				tap( this );
			}
			return oldBind.apply( this, arguments );
		};
	}

}( this, jQuery ));

//(function animloop(){
//  requestAnimFrame(animloop);
//   document.querySelector("#info").innerHTML = 'click '+e.pageX;
//})();


(function() {
    var lastTime = 0;
    var vendors = ['webkit', 'moz'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
        window.cancelAnimationFrame =
          window[vendors[x]+'CancelAnimationFrame'] || window[vendors[x]+'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() { callback(currTime + timeToCall); },
              timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };

    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
}());