/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function() {

  const renderTweets = (tweets) => {
    // loops through tweets in reverse so shows newest at top
    tweets.slice().reverse().forEach(tweet => {

      // calls createTweetElement for each tweet
      const oldTweet = createTweetElement(tweet);

      // takes return value and appends it to the tweets container
      $('#old-tweets-container').append(oldTweet);
    });
  };

  const createTweetElement = (tweetData) => {

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
      <footer class="old-tweet">
        <p class="old-tweet-text">${escape(tweetData.content.text)}</p>
        <div class="bottom-row">
        <p> <time class="tweet-age" datetme=${tweetData.created_at}></time></p>
          <div class="icons">
            <i class="fas fa-flag"></i>
            <i class="fas fa-retweet"></i>
            <i class="fas fa-heart"></i>
          </div>
        </div>
      </footer>
    </article>
  </section>
    `;
    return markup;
  };

  const loadTweets = () => {
    $.ajax('/tweets', { method: 'GET'})
    .then(function (tweets) {
    renderTweets(tweets);
    })

  };

  const newRenderTweet = () => {
      $.ajax('/tweets', { method: 'GET'})
      .then(function (tweets) {
        const newTweet = tweets[tweets.length-1];
        $('#old-tweets-container').prepend(createTweetElement(newTweet))
        $('#tweet-text').val("")
      })
  };


  $("#new-tweet-form").submit(function (event) {
    const tweetText = $('#tweet-text').serialize()
    event.preventDefault();

    if (tweetText.slice(5) === "") {
      $('.error-message').html('<i class="fas fa-exclamation-triangle"></i>Tweet cannot be empty<i class="fas fa-exclamation-triangle"></i>')
      $('.error-hidden').slideDown(25)
      return;
    } else if ($(".counter").val() <= 0) {
      $('.error-message').html('<i class="fas fa-exclamation-triangle"></i>Tweet is too many characters<i class="fas fa-exclamation-triangle"></i>')
      $('.error-hidden').slideDown(25)
      return;
    }

    $.ajax("/tweets", {method: 'POST', data: tweetText});
    newRenderTweet();

  })

  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  loadTweets();
});


