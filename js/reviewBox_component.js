function textAreaComponent (){
 
  $('.status-box').keyup(function() {
    var postLength = $(this).val().length;
    var charactersLeft = 2000 - postLength;
    $('.counter').text(charactersLeft);
    if (charactersLeft < 0) {
      $('.btn').addClass('disabled');
    } else if (charactersLeft === 2000) {
      $('.btn').addClass('disabled');
    } else {
      $('.btn').removeClass('disabled');
    }
  });
}