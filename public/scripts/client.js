/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function() {

  const renderTweets = (tweets) => {
    const container = $('#old-tweets-container');

    container.empty();
    $('#tweet-text').val("");
    $('.counter').val(140);

    // loops through tweets in reverse so shows newest at top
    for (const tweet of tweets) {

      // calls createTweetElement for each tweet
      const oldTweet = createTweetElement(tweet);

      // takes return value and appends it to the tweets container
      container.prepend(oldTweet);
    }

  };

  const createTweetElement = (tweetData) => {
      
    //  tweet html
    const markup = `
    <section class="old-tweets-container">
    <article class="old-tweets">
      <header class="userID">
          <div class="username-pic">
            <img class="tweet-pic" src="${tweetData.user.avatars}">
            <p class="username">${tweetData.user.name}</p>
          </div>
          <div class="user-handle">
            <p class="handle">${tweetData.user.handle}</p>
          </div>
      </header>
        <p class="old-tweet-text">${escape(tweetData.content.text)}</p>
      <footer class="bottom-row">
          <p class="tweet-age">${timeago.format(tweetData.created_at)}</p>
          <div class="icons">
            <i class="fas fa-flag"></i>
            <i class="fas fa-retweet"></i>
            <i class="fas fa-heart"></i>
          </div>
      </footer>
    </article>
  </section>
    `;
    return markup;
  };

  const loadTweets = () => {
    //  load existing tweets
    $.ajax('/tweets', { method: 'GET'})
    .then(function (tweets) {
      renderTweets(tweets);
    });

  };

  $("#new-tweet-form").submit(function (event) {

    const tweetText = $('#tweet-text').serialize();
    event.preventDefault();
    //  check if empty or too many chars
    if (tweetText.slice(5) === "") {
      $('.error-message').html('<i class="fas fa-exclamation-triangle"></i>Tweet cannot be empty<i class="fas fa-exclamation-triangle"></i>');
      $('.error-hidden').slideDown(25);
      return;
    }
    
    if ($(".counter").val() <= 0) {
      $('.error-message').html('<i class="fas fa-exclamation-triangle"></i>Tweet is too many characters<i class="fas fa-exclamation-triangle"></i>');
      $('.error-hidden').slideDown(25);
      return;
    }
    //  hide error box if triggered
    $('.error-hidden').slideUp();

    $.post("/tweets", tweetText)
    .then(() => {loadTweets()});

  });
  
  //  escape funtion protects from malicious
  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  //  load old tweets
  loadTweets();
});


