var x = true
$('h1').on('click', function functionName() {
  if (x) {
    // $('.image').css('opacity', '0')
    $('.image').fadeOut(200)
    // $('.alt-image').delay(11800).css('opacity', '.7')
    $('.alt-image').delay(800).fadeIn(200)
    x = false
  } else {
    // $('.alt-image').css('opacity', '0')
    $('.alt-image').fadeOut(400)
    // $('.image').delay(800).css('opacity', '.7')
    $('.image').delay(800).fadeIn(400)
    x = true
  }

})
