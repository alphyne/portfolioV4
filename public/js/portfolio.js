// When the user scrolls the page, execute myFunction 
window.onscroll = function() {myFunction()};

// Get the top navbar
var navbartop = document.getElementById("navbartop");

// Get the offset position of the top navbar
var stickytop = navbartop.offsetTop;

// Get the bottom navbar
var navbarbot = document.getElementById("navbarbot");

// Get the offset position of the bottom navbar
var stickybot = navbartop.offsetTop;

var windowHeight = $(window).height();
var botOffset = windowHeight - 70;

// Add the sticky class to the navbar when you reach its scroll position. Remove "sticky" when you leave the scroll position
function myFunction() {
  if (window.pageYOffset > stickytop) {
    navbartop.classList.add("stickytop")
  } else {
    navbartop.classList.remove("stickytop");
  }

  if (botOffset > stickybot) {
    navbarbot.classList.add("stickybot")
  } else {
    navbarbot.classList.remove("stickybot");
  }
}
