$('.slide-viewer').each(function(){ // for every slider
  var $this = $(this); // get the current slider
  var $group = $this.find('.slide-group'); // get the slide-group
  var $slides = $this.find('.slide'); // jQuery object to hold all slides
  var $slidesContents = $this.find('.slide img'); // jQuery object to hold all slides
  var buttonArray = []; // create array to hold nav buttons
  var currentIndex = 0; // current slide index
  var timeout; // store the timer
  // move() move the slides.
  function move(newIndex) {
    var animateLeft, slideLeft;
    advance(); // when slide moves call advance() again
    // if current slide is showing or a slide is animating, do nothing
    if ($group.is('animated') || currentIndex === newIndex){
      return;
    }
    // move active class from old indicator button to new one
    buttonArray[currentIndex].removeClass('active');
    buttonArray[newIndex].addClass('active');
    // set up variables for moving left or right depending on index #
    if (newIndex > currentIndex) {
      slideLeft = '100%'; // slide to the right
      animateLeft = '-100%'; // group to the left
    } else {
      slideLeft = '-100%';
      animateLeft = '100%';
    }
    // position new slide to left (if less) or right (if more) of current
    $slides.eq(newIndex).css( {left: slideLeft, display: 'block'} );
    $group.animate( {left: animateLeft} , function() {
      $slides.eq(currentIndex).css({display: 'none'});
      $slides.eq(newIndex).css({left:0});
      $group.css({left: 0});
      currentIndex = newIndex;
    });


  }


  function advance() { // sets a timer between slides
    clearTimeout(timeout); // clear timer stored in timeout
    // start timer to run anonymous function every 4 seconds
    timeout = setTimeout(function () {
      if (currentIndex < ($slides.length - 1)) { // if not the last slide
        move(currentIndex + 1); // move to the next slide
      } else {
        move(0); // otherwise move to the first slide
      }
    }, 4000); // wait 4000 ms.
  }
  function advanceRight () {
    clearTimeout(timeout);
    if (currentIndex < ($slides.length - 1)) { // if not the last slide
      move(currentIndex + 1); // move to the next slide
    } else {
      move(0); // otherwise move to the first slide
    }
  }
  function advanceLeft () {
    clearTimeout(timeout);
    if (currentIndex > 0) { // if not the first slide
      move(currentIndex - 1); // move to the previous slide
    } else {
      move($slides.length - 1); // otherwise move to the first slide
    }
  }

  $.each($slides, function(index){
    // create a button element for the button
    var $button = $('<button type="button" class="slide-btn">&bull;</button>');
    if (index === currentIndex) { // if index is the current item
      $button.addClass('active'); // add the active class
    }
    $button.on('click', function(){ // create an event handler for the button
      move(index); // calls the move() function
    }).appendTo('.slide-buttons'); // add to the buttons holder
    buttonArray.push($button); // add it to the button array
  })

  $('.slider-ctl-left').click(function() {
    advanceLeft();
  })
  $('.slider-ctl-right').click(function() {
    advanceRight();
  })
  advance();

})
