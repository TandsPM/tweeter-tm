$(document).ready(function() {

    // tweet security
  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  const createTweetElement = function(tweet) {
    const timeAgo = timeago.format(tweet.created_at);

    const userName = `<p>${escape(tweet.user.name)}</p>`;
    const userHandle = `<p>${escape(tweet.user.handle)}</p>`;
    const tweetText = `<p>${escape(tweet.content.text)}</p>`;

    const $tweet = $(`<article class="tweet">
    <header class="tweet-header">
    <div class="user-info">
    <img src="${tweet.user.avatars}" alt="Profile Picture">
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

  // render tweets
  const renderTweets = function(tweets) {
    $('#tweets-container').empty();
    for (const tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      $('#tweets-container').prepend($tweet);
    }
  };

  // Error handling
  $('#tweet-form').submit(function(event) {
    event.preventDefault();

    const errors = $('#error');

    const checkTweet = $(this).find('textarea[name="text"]').val();
    if (checkTweet === '' || checkTweet.length === 0) {
      $('#error').text('The conents of the tweet are empty.').slideDown();
      setTimeout(function() {
        errors.slideUp();
      }, 3000);
      return;
    }
    if (checkTweet.length > 140) {
      $('#error').text('You have exceeded the meximum limit of 140 characters.').slideDown();
      setTimeout(function() {
        errors.slideUp();
      }, 3000);
      return;
    }

    errors.slideUp();

    // AJAX POST request
    $.ajax({
      method: 'POST',
      url: '/tweets',
      data: $(this).serialize(),
      success: function(response) {
        console.log('Successful:', response);

        // clear after successful tweet
        $('#tweet-form textarea').val('');

        $('#counter').text('140');

        loadTweets();
      },
      error: function(err) {
        console.log('There was an error posting your tweet:', err);
      }
    });
  });

  // load the Tweets
  const loadTweets = function() {
    $.ajax({
      url: '/tweets',
      method: 'GET',
      success: function(response) {
        renderTweets(response);
      },
      error: function(err) {
        console.log('There was an error fetching your tweet:', err);
      }
    });
  };

  loadTweets();
});

