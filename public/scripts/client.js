/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// takes in a tweet object and is responsible for returning a tweet <article> element
// containing the entire HTML structure of the tweet.

// Test / driver code (temporary). Eventually will get this from the server.

$(document).ready(function() {

  const createTweetElement = function(tweet) {
    // add timeago
    const timeAgoStr = timeago.format(tweet.created_at);

    const $tweet = $(`<article class="tweet">
  <header class="tweet-header">
    <div class="user-info">
      <i class="fa-regular fa-face-smile"></i>
      <h3>${tweet.user.name}</h3>
    </div>
    <p class="username">${tweet.user.handle}</p>
  </header>
  
  <div class="tweet-content">
    <p>${tweet.content.text}</p>
  </div>

  <footer class="tweet-footer">
    <p>${timeAgoStr}</p>
    <p>
      <i class="fa-solid fa-flag"></i>
      <i class="fa-solid fa-retweet"></i>
      <i class="fa-solid fa-heart"></i>
    </p>
  </footer>
</article>`);

    return $tweet;
  };

  const renderTweets = function(tweets) {
    // loops through tweets
    $('#tweets-container').empty();
    for (const tweet of tweets) {
      // calls createTweetElement for each tweet
      const $tweet = createTweetElement(tweet);
      // takes return value and appends it to the tweets container
      $('#tweets-container').append($tweet);
    }
  };

//   .done(function( msg ) {
//     alert( "Data Saved: " + msg );
//   });
// $(form).serialize()
// .then(loadTweets)
// success function(
// loadTweets


  // $.ajax({
//   method: "POST",
//   url: "some.php",
//   data: { name: "John", location: "Boston" }
// })
//   .done(function( msg ) {
//     alert( "Data Saved: " + msg );
//   });
// $(form).serialize()
// .then(loadTweets)
// success function(
// loadTweets


  // add an event listener that listens for the submit event
  $('#tweets-form').submit(function(event) {
    // prevent the default behaviour of the submit event (data submission and page refresh)
    event.preventDefault();
    // create an AJAX POST request in client.js that sends the form data to the server.
  
    $.ajax({
      method: "POST",
      url: '/tweets',
      data: $(this).serialize()
    }).then(function () {
      loadTweets();
    });
  });

  // define the loadTweets function
  const loadTweets = function() {
    // make ajx GET request
    $.ajax({
      url: '/tweets',
      method: 'GET',
      success: function(response) {
        // call renderTweets w/ response to render to DOM
        renderTweets(response);
      },
      error: function(err) {
        console.log('There was an error fetching your tweet:', err)
      }
    })
  };

  loadTweets();
});




// $.ajax({
//   method: "POST",
//   url: "some.php",
//   data: { name: "John", location: "Boston" }
// })
//   .done(function( msg ) {
//     alert( "Data Saved: " + msg );
//   });
// $(form).serialize()
// .then(loadTweets)
// success function(
// loadTweets