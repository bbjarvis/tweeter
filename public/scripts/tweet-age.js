/*  jQuery using timeago to give date stamp on tweets
*/
$(document).ready(function() {
  const now = timeago.format(new Date());
  $("time.tweet-age").timeago(now);
});