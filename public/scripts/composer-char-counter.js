$(document).ready(function() {
  // --- our code goes here ---\
  const counter = $('.counter');
  $('.new-tweet form textarea').on('input', function() {
    const limit = 140; 
    const currentLength = this.value.length;

    console.log('currentLength', currentLength);
    counter.text(limit - currentLength);

    if ((limit - currentLength) < 0) {
      counter.addClass('negative');
    } else {
      counter.removeClass('negative');
    }
  });
});

