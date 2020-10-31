
const navSlide = () => {
  const burger = document.querySelector('.burger')
  const nav = document.querySelector('.nav-links')


  burger.addEventListener('click', () => {
    nav.classList.toggle('nav-active')
    
  })
}

navSlide()



// moving cursor
const cursor = document.querySelector(".eyes")
let mouseX = 0
let mouseY = 0

let cursorX = 0
let cursorY = 0

let speed = 0.05

function animate (){
	let distX = mouseX - cursorX
	let distY = mouseY - cursorY
	
	cursorX =  cursorX + (distX * speed)
	cursorY = cursorY + (distY * speed)
	
	cursor.style.left = cursorX + "px"
	cursor.style.top = cursorY + "px"
	
	requestAnimationFrame(animate)
}
animate()

document.addEventListener("mousemove", function(event){
	mouseX = event.pageX
	mouseY = event.pageY
})

$('body').mousemove(function(event) {
  var eye = $(".eye");
  var x = (eye.offset().left) + (eye.width() / 2);
  var y = (eye.offset().top) + (eye.height() / 2);
  var rad = Math.atan2(event.pageX - x, event.pageY - y);
  var rot = (rad * (180 / Math.PI) * -1) + 180;
  eye.css({
    '-webkit-transform': 'rotate(' + rot + 'deg)',
    '-moz-transform': 'rotate(' + rot + 'deg)',
    '-ms-transform': 'rotate(' + rot + 'deg)',
    'transform': 'rotate(' + rot + 'deg)'
  });
});
        

var acc = document.getElementsByClassName("accordion");
var i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var panel = this.nextElementSibling;
    if (panel.style.display === "block") {
      panel.style.display = "none";
    } else {
      panel.style.display = "block";
    }
  });
}
// When the user scrolls the page, execute myFunction 
window.onscroll = function() {myFunction()};

// Get the header
var header = document.querySelector(".header");

// Get the offset position of the navbar
var sticky = header.offsetTop;

// Add the sticky class to the header when you reach its scroll position. Remove "sticky" when you leave the scroll position
function myFunction() {
  if (window.pageYOffset > sticky) {
    header.classList.add("sticky");
  } else {
    header.classList.remove("sticky");
  }
}

    (function(window, undefined) // Code in a function to create an isolate scope
{
    'use strict';
    var height_fixed_header = 0, // For layout with header with position:fixed. Write here the height of your header for your anchor don't be hiden behind
        speed = 800,
        moving_frequency = 15, // Affects performance ! High number makes scroll more smooth
        links = document.getElementsByTagName('a'),
        href;
    
    for(var i = 0; i < links.length; i++)
    {
        href = (links[i].attributes.href === undefined) ? null : links[i].attributes.href.nodeValue.toString();
        if(href !== null && href.length > 1 && href.indexOf('#') != -1) // href.substr(0, 1) == '#'
        {
            links[i].onclick = function()
            {
                var element,
                    href = this.attributes.href.nodeValue.toString(),
                    url = href.substr(0, href.indexOf('#')),
                    id = href.substr(href.indexOf('#') + 1);
                if (element = document.getElementById(id))
                {

                    var hop_count = (speed - (speed % moving_frequency)) / moving_frequency, // Always make an integer
                        getScrollTopDocumentAtBegin = getScrollTopDocument(),
                        gap = (getScrollTopElement(element) - getScrollTopDocumentAtBegin) / hop_count;
                    
                    if (window.history && typeof window.history.pushState == 'function')
                        window.history.pushState({}, undefined, url + '#' + id); // Change URL for modern browser

                    for (var i = 1; i <= hop_count; i++)
                    {
                        (function()
                        {
                            var hop_top_position = gap * i;
                            setTimeout(function(){  window.scrollTo(0, hop_top_position + getScrollTopDocumentAtBegin); }, moving_frequency * i);
                        })();
                    }

                    return false;
                }
            };
        }
    }
    
    var getScrollTopElement =  function(e)
    {
        var top = height_fixed_header * -1;

        while (e.offsetParent != undefined && e.offsetParent != null)
        {
            top += e.offsetTop + (e.clientTop != null ? e.clientTop : 0);
            e = e.offsetParent;
        }

        return top;
    };
    
    var getScrollTopDocument = function()
    {
        return window.pageYOffset !== undefined ? window.pageYOffset : document.documentElement.scrollTop !== undefined ? document.documentElement.scrollTop : document.body.scrollTop;
    };

    
})(window);


var $ticker = $('[data-ticker="list"]'),
    tickerItem = '[data-ticker="item"]'
    itemCount = $(tickerItem).length,
    viewportWidth = 0;

function setupViewport(){
    $ticker.find(tickerItem).clone().prependTo('[data-ticker="list"]');
    
    for (i = 0; i < itemCount; i ++){
        var itemWidth = $(tickerItem).eq(i).outerWidth();
        viewportWidth = viewportWidth + itemWidth;
    }
    
    $ticker.css('width', viewportWidth);
}

function animateTicker(){
    $ticker.animate({
        marginLeft: -viewportWidth
      }, 30000, "linear", function() {
        $ticker.css('margin-left', '0');
        animateTicker();
      });
}

function initializeTicker(){
    setupViewport();
    animateTicker();
    
    $ticker.on('mouseenter', function(){
        $(this).stop(true);
    }).on('mouseout', function(){
        animateTicker();
    });
}

initializeTicker();




