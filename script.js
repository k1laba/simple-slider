// Code goes here

function Slider(elementId, options) {
  var defaults = {
    width: '550px',
    height: '350px',
    replay: true,
    duration: 3000
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
  
  var container = parent.children[0];
  var index = 0;
  var count = container.children.length;
  if (count < 2) { return; }
  
  function show() {
    for(var i=0; i< count; i++) {
      container.children[i].style.opacity = (i === index ? '1' : '0');
      container.children[i].style.zIndex = (i === index ? '2' : '1');
    }
    setupTimer();
  }
  var timer;
  function setupTimer() {
    if (timer) { clearTimeout(timer); }
    timer = setTimeout(function() { 
       next();
    }, defaults.duration);
  }
  
  function next() {
    if (index == count - 1 && !defaults.replay) { clearTimeout(timer); return; }
      index++;
      if (index == count) { 
        index = 0; 
      }
      show();
  }
  function prev() {
     index--;
     if (index < 0) { 
       index = !defaults.replay ? 0 : count - 1;
     }
     show();
  }
  
  function setupNavigation() {
    var prevButton = document.createElement('span');
    var nextButton = document.createElement('span');
    prevButton.className = "left-arrow";
    nextButton.className = "right-arrow";
    parent.appendChild(prevButton);
    parent.appendChild(nextButton);
    prevButton.addEventListener("click", function() { prev(); });
    nextButton.addEventListener("click", function() { next(); });
  }
  setupNavigation();
  show();
}
new Slider("slider1");