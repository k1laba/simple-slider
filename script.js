'use strict'
function Slider(elementId, options) {
  var defaults = {
    width: '550px',
    height: '350px',
    replay: true,
    duration: 3000,
    autoPlay: true
  }
  if (options) {
    for(var prop in options) {
       if (prop && defaults[prop]) {
         defaults[prop] = options[prop];
       }
    }
  }
  var parent = document.getElementById(elementId);
  parent.style.overflow = 'hidden';
  parent.style.position = 'relative';
  parent.style.width = defaults.width;
  parent.style.height = defaults.height;
  
  var prevButton = document.createElement('span');
  if (!defaults.replay) { prevButton.style.opacity = 0.3; }
  var nextButton = document.createElement('span');
  
  var container = parent.children[0];
  var index = 0;
  var count = container.children.length;
  if (count < 2) { return; }
  
  var currentElement = container.children[index];
  var nextElement = container.children[index + 1];
  currentElement.style.opacity = 1;
  currentElement.style.zIndex = 1;
  nextElement.style.opacity = 0;
  nextElement.style.zIndex = 0;
  var isCurrentElemIframe = currentElement.children[0].tagName.toLowerCase() === 'iframe';
  var animationTimer;
  function show() {
  	prevButton.style.opacity = index == 0 && !defaults.replay ? 0.3 : 1;
    nextButton.style.opacity = index == count - 1 && !defaults.replay ? 0.3 : 1;
    for(var i=0; i< count; i++) {
      container.children[i].style.opacity = 0;
      container.children[i].style.zIndex = 0;
    }
    nextElement.style.zIndex = 1;
    currentElement.style.opacity = 1;
    animationTimer = setInterval(function() {
      nextElement.style.opacity = parseFloat(nextElement.style.opacity) + 0.2;
      currentElement.style.opacity = parseFloat(currentElement.style.opacity) - 0.2;
      if (nextElement.style.opacity == 1) { 
        clearInterval(animationTimer);
        clearTimeout(timer);
        animationTimer = false;
        isCurrentElemIframe = nextElement.children[0].tagName.toLowerCase() === 'iframe';
        if (defaults.autoPlay && !isCurrentElemIframe) { 
        setupTimer(); }
      }
    }, 100);
  }
  var timer;
  function setupTimer() {
    if (timer) { clearTimeout(timer); }
    timer = setTimeout(function() { 
       next();
    }, defaults.duration);
  }
  function next() {
    if (animationTimer) {return; }
    currentElement = container.children[index];
    if (index == count - 1 && !defaults.replay) { clearTimeout(timer); return; }
      index++;
      if (index == count) { index = 0; }
      nextElement = container.children[index];
      show();
  }
  function prev() {
    if (animationTimer) {return; }
     currentElement = container.children[index];
     index--;
     if (index < 0) { index = !defaults.replay ? 0 : count - 1; }
     nextElement = container.children[index];
     show();
  }
  function setupNavigation() {
    prevButton.className = "left-arrow";
    nextButton.className = "right-arrow";
    parent.appendChild(prevButton);
    parent.appendChild(nextButton);
    prevButton.addEventListener("click", function() { prev(); });
    nextButton.addEventListener("click", function() { next(); });
  }
  (function() {
  		for(var i=0; i<count; i++) {
      	var elem = container.children[i].children[0];
      	if (elem.tagName.toLowerCase() === 'iframe') {
        		elem.setAttribute('width', defaults.width);
            elem.setAttribute('height', defaults.height);
            elem.setAttribute('src', elem.getAttribute('src').replace('watch?v=', 'embed/'));
        }
      }
  })();
  setupNavigation();
  if (defaults.autoPlay && !isCurrentElemIframe) { setupTimer(); }
}
new Slider("slider1");
