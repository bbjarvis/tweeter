/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function() {
  // Fake data taken from initial-tweets.json
  const tweets = [
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
        "handle": "@rd" },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ];

  const renderTweets = (tweets) => {
    // loops through tweets
    tweets.forEach(tweet => {

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
        <p class="old-tweet-text">${tweetData.content.text}</p>
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

  renderTweets(tweets);

});