$(function() {
  var away = "👀 Are you there? — Jared Suasin";
  //var away = "Come look over here"
  var original;

  $(window).focus(function() {
    if (original) {
      document.title = original;
    }
  }).blur(function() {
    var title = $('title').text();
    if (title != away) {
      original = title;
    }
    document.title = away;
  });
});

$(document).ready(function (){

  
  $('#nav-work').hover(function(){
      var navLabel = $('#nav-work-content').html();
      navLabel = 'UNDER CONSTRUCTION';
      $('#nav-work-content').html(navLabel);
  });

  $('#nav-work').mouseleave(function(){
    var navLabel = $('#nav-work-content').html();
    navLabel = 'WORK';
    $('#nav-work-content').html(navLabel);
  });

  $("#work").click(function (){
      $('html, body').animate({
          scrollTop: $("#navbar").offset().top,
          behavior: 'smooth'
      }, 800);
  });

  $("#prototype").click(function (){
    $('html, body').animate({
        scrollTop: $("#embed").offset().top,
        behavior: 'smooth'
    }, 800);
});
});

var animateHTML = function() {
  var elems;
  var windowHeight;
  function init() {
    elems = document.querySelectorAll('.hidden');
    windowHeight = window.innerHeight;
    addEventHandlers();
    checkPosition();
  }
  function addEventHandlers() {
    window.addEventListener('scroll', checkPosition);
    window.addEventListener('resize', init);
  }
  function checkPosition() {
    for (var i = 0; i < elems.length; i++) {
      var positionFromTop = elems[i].getBoundingClientRect().top;
      if (positionFromTop - windowHeight <= 0) {
        elems[i].className = elems[i].className.replace(
          'hidden',
          'fade-in'
        );
      }
    }
  }
  return {
    init: init
  };
};
animateHTML().init();