$(document).ready(function() {
  // --- our code goes here ---

  $('#tweet-text').on("input", function() {
    let charCount = $(this).val().length;

    const charMax = 140;

    let charBalance = charMax - charCount;

    //  make "counter" change with each char entered
    $(this).parent().find(".tweet-count").find(".counter").html(charBalance)
    
    if (charBalance<0) {
    $(this).parent().find(".tweet-count").find(".counter").addClass("counter-over")
    } else {
    $(this).parent().find(".tweet-count").find(".counter").removeClass("counter-over")
    }

  })

});