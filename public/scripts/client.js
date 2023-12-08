/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// takes in a tweet object and is responsible for returning a tweet <article> element
// containing the entire HTML structure of the tweet.

// Test / driver code (temporary). Eventually will get this from the server.

$(document).ready(function() {

  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  const createTweetElement = function(tweet) {
    // add timeago
    const timeAgo = timeago.format(tweet.created_at);

    const userName = `<p>${escape(tweet.user.name)}</p>`;
    const userHandle = `<p>${escape(tweet.user.handle)}</p>`;
    const tweetText = `<p>${escape(tweet.content.text)}</p>`;

    const $tweet = $(`<article class="tweet">
  <header class="tweet-header">
    <div class="user-info">
      <i class="fa-regular fa-face-smile"></i>
      <h3>${userName}</h3>
    </div>
    <p class="username">${userHandle}</p>
  </header>
  
  <div class="tweet-content">
    <p>${tweetText}</p>
  </div>

  <footer class="tweet-footer">
    <p>${timeAgo}</p>
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
      $('#tweets-container').prepend($tweet);
    }
  };

  // add an event listener that listens for the submit event
  $('#tweet-form').submit(function(event) {
    // prevent the default behaviour of the submit event (data submission and page refresh)
    event.preventDefault();

    // validate content
    const checkTweet = $(this).find('textarea[name="text"]').val();
    if (checkTweet === '' || checkTweet.length === 0) {
      $('#error').text('The conents of the tweet are empty.').slideDown();
      return;
    }
    if (checkTweet.length > 140) {
      $('#error').text('You have exceeded the meximum limit of 140 characters.').slideDown();
      return;
    }

    // create an AJAX POST request in client.js that sends the form data to the server.
    $.ajax({
      method: 'POST',
      url: '/tweets',
      data: $(this).serialize(),
      success: function(response) {
        console.log('Successful:', response);

        // have new tweet post to the top instead of bottom
        // const $newestTweet = createTweetElement(response);
        // $('#tweets-container').prepend($newestTweet);
        // // clear after successful tweet
        $('#tweet-form textarea').val('');

        loadTweets();
      },
      // throw error if any issues
      error: function(err) {
        console.log('There was an error posting your tweet:', err);
      }
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
        console.log('There was an error fetching your tweet:', err);
      }
    });
  };

  loadTweets();
});

