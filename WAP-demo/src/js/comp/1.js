
$(function(){
  console.log('This is working');
  $('h1').text('This is working');

    $('button').on('touchend',function(event){
      alert('d')
    },false);
})
