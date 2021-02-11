var rating;

$('#1').click(function(){
    $('#1').css('color', '#ffc107');
    $('#2').css('color', 'black');
    $('#3').css('color', 'black');
    $('#4').css('color', 'black');
    $('#5').css('color', 'black');
    rating=1;
})

$('#2').click(function(){
    $('#1').css('color', '#ffc107');
    $('#2').css('color', '#ffc107');
    $('#3').css('color', 'black');
    $('#4').css('color', 'black');
    $('#5').css('color', 'black');
    rating=2;
})

$('#3').click(function(){
    $('#1').css('color', '#ffc107');
    $('#2').css('color', '#ffc107');
    $('#3').css('color', '#ffc107');
    $('#4').css('color', 'black');
    $('#5').css('color', 'black');
    rating=3;
})

$('#4').click(function(){
    $('#1').css('color', '#ffc107');
    $('#2').css('color', '#ffc107');
    $('#3').css('color', '#ffc107');
    $('#4').css('color', '#ffc107');
    $('#5').css('color', 'black');
    rating=4;
})

$('#5').click(function(){
    $('#1').css('color', '#ffc107');
    $('#2').css('color', '#ffc107');
    $('#3').css('color', '#ffc107');
    $('#4').css('color', '#ffc107');
    $('#5').css('color', '#ffc107');
    rating=5;
});

var id= $('#id').text();
$('#btn').click(function(){
    var post = {comment: "", rating: '', restaurantId: ''};
    post.comment = $('#txt').val();
    post.rating =rating;
    post.restaurantId = $('#id').html();
    $.ajax({
        method: "POST",
        url: '/restaurant/nearby/post',
        data: post
        }).done(function(response){
        console.log(response);
        }).fail(function(response){
        console.log(response);
        })
    })