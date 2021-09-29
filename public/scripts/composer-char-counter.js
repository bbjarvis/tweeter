$(document).ready(function() {
  // --- our code goes here ---

  $('#tweet-text').on("input", function() {
    let charCount = $(this).val().length;

    const charMax = 140;

    let charBalance = charMax - charCount;

    //  make "counter" change with each char entered
    $(this).parent().find(".tweet-count").find(".counter").html(charBalance)
    
    if (charCount<0) {
    $(this).parent().find(".tweet-count").find(".counter").css("color", "#FF0000")
    } else {
    $(this).parent().find(".tweet-count").find(".counter").css("color", "#000000")  
    }

  })

});