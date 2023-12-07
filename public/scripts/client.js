/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// takes in a tweet object and is responsible for returning a tweet <article> element
// containing the entire HTML structure of the tweet.

// Test / driver code (temporary). Eventually will get this from the server.

$(document).ready(function() {

  // Fake data taken from initial-tweets.json
  const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png"
        ,
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd"
      },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ];


  // const tweetData = {
  //   "user": {
  //     "name": "Newton",
  //     "avatars": "https://i.imgur.com/73hZDYK.png",
  //       "handle": "@SirIsaac"
  //     },
  //   "content": {
  //       "text": "If I have seen further it is by standing on the shoulders of giants"
  //     },
  //   "created_at": 1461116232227
  // }

  const createTweetElement = function(tweet) {
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
    <p>10 days ago</p>
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

  renderTweets(data);
});