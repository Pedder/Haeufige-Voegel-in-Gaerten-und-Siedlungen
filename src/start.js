/*https://gist.github.com/nateps/1172490
*/

var page = document.getElementById('page'),
    ua = navigator.userAgent,
    iphone = ~ua.indexOf('iPhone') || ~ua.indexOf('iPod'),
    ipad = ~ua.indexOf('iPad'),
    ios = iphone || ipad,
    // Detect if this is running as a fullscreen app from the homescreen
    fullscreen = window.navigator.standalone,
    android = ~ua.indexOf('Android'),
    lastWidth = 0;
 
if (android) {
  // Android's browser adds the scroll position to the innerHeight, just to
  // make this really fucking difficult. Thus, once we are scrolled, the
  // page height value needs to be corrected in case the page is loaded
  // when already scrolled down. The pageYOffset is of no use, since it always
  // returns 0 while the address bar is displayed.
  window.onscroll = function() {
    page.style.height = window.innerHeight + 'px'
  } 
}

