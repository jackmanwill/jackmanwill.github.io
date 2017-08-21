const titleFontSize = parseInt($('.backgroundTitle').css("font-size")); //store the title font size
const mobileWidth = 480;

$(window).scroll(function() {
  //how far the user has scrolled (in px)
  var scrollTopPx = $(window).scrollTop();
  //the browser window's height (in px)
  var windowHeight = $(window).height();
  //"number of screens scrolled" - independent of viewport height!
  var scrollTop = scrollTopPx/windowHeight;
  
  //change the title font size on scroll
  var fontSize = titleFontSize - scrollTop*40 + 'px';
  $('.backgroundTitle').css({'font-size': fontSize}); 
  
  //superscroll control
  //iterate over each superscroll element
  $('.superscroll').each(function() {
    //get the data of any superscroll elements
    var data = $(this).data('superscroll');
    var acceleratedSpeed = parseFloat(data[0]);
    var regularSpeed = parseFloat(data[1]);
    var fixedSpeed = parseFloat(data[2]);
    var transitionPoint = parseFloat(data[3]);
    var scrollFixedPoint = parseFloat(data[4]);
    //if popNavigator displays as 2x2 we alter the accelerated speed to ensure bottom row scrolls far enough
    if ($(window).width()<mobileWidth)
    {
      //if portrait - not needed yet since haven't decided what to do for landscape - but it works so that's something 
      if ($(window).width()<$(window).height())
      {
        if ($(this).hasClass("linkedBoxes"))
        {
          acceleratedSpeed = acceleratedSpeed*1.5;
        }
        if ($(this).hasClass("subTitle"))
        {
          transitionPoint = transitionPoint/4;
        }
      }
    }
    
    if (scrollTop<transitionPoint)
    {
  	  var newYPos = - scrollTop*acceleratedSpeed*windowHeight;
    }
    else if (scrollTop<scrollFixedPoint)
    {
  	  var newYPos = - (transitionPoint*acceleratedSpeed + (scrollTop-transitionPoint)*regularSpeed)*windowHeight;
    }
    else
    {
  	  var newYPos = - (transitionPoint*acceleratedSpeed + (scrollFixedPoint-transitionPoint)*regularSpeed + (scrollTop-scrollFixedPoint)*fixedSpeed)*windowHeight;
    }
    $(this).css('transform', 'translateY(' + newYPos + 'px)');
  });
  
  //the point of scrolling at which the popNavigator superscroll and subtitle need to be pushed back to make way for main
  var zChangePoint = 0.25
  if (scrollTop>zChangePoint)
  {
    $('.popNavigator').css({'z-index': "500"});
  }
  else
  {
    $('.popNavigator').css({'z-index': "1500"});
  }
});
  	  
$('.linkedBoxWriting').hover(function() {
    $(this).toggleClass("unShaded");                        /*toggle shading on hover*/
  });
$('.linkedBoxWriting').hover(function() {
  $(this).find('.boxTitle').animate({paddingTop: "10%"});   /*movewriting up and down*/
  }, function() {
    $(this).find('.boxTitle').animate({paddingTop: "45%"});
  });
$('.linkedBoxWriting').click(function() {                   /*bug fix - resets box when clicked*/
  $(this).removeClass("unShaded");
  $(this).find('.boxTitle').css({"padding-top": "45%"});
});

$('.bookTitle').click(function() {
  $(this).siblings().toggle(400);
  $(this).parent().siblings().children().not('.bookTitle').hide(1200);
});