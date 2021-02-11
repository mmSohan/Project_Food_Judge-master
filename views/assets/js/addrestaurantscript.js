
/*
=======================
    Form Validation
=======================
*/


$('#validationName').on('input', function(){
    var name = $(this).val();
    if(name.length == 0){
        $(this).addClass('is-invalid').removeClass('is-valid');
    }
    else{
        $(this).addClass('is-valid').removeClass('is-invalid');
    }
});

$('#validationAddress').on('input', function(){
    var description = $(this).val();
    if(description.length < 10){
        $(this).addClass('is-invalid').removeClass('is-valid');
    }
    else{
        $(this).addClass('is-valid').removeClass('is-invalid');
    }
});

$('#validationLatitude').on('input', function(){
    var latitude = $(this).val();
    if(latitude.length < 2){
        $(this).addClass('is-invalid').removeClass('is-valid');
    }
    else{
        $(this).addClass('is-valid').removeClass('is-invalid');
    }
});

$('#validationLongitude').on('input', function(){
    var longitude = $(this).val();
    if(longitude.length < 2){
        $(this).addClass('is-invalid').removeClass('is-valid');
    }
    else{
        $(this).addClass('is-valid').removeClass('is-invalid');
    }
});

$('#validationContact').on('input', function(){
    if(!/(^(\+88|0088)?(01){1}[3456789]{1}(\d){8})$/i.test($(this).val())){
        $(this).addClass('is-invalid').removeClass('is-valid');
    }
    else{
        $(this).addClass('is-valid').removeClass('is-invalid');
    }
});

$('#validationOpenTime').on('input', function(){
    var open = (parseInt($(this).val().substring(0, 2))*60)+parseInt($(this).val().substring(3, 5));
    var close = (parseInt($('#validationCloseTime').val().substring(0, 2))*60)+parseInt($('#validationCloseTime').val().substring(3, 5));

    if(open > close || isNaN(open) || isNaN(close)){
        $(this).addClass('is-invalid').removeClass('is-valid');
        $('#validationCloseTime').addClass('is-invalid').removeClass('is-valid');
    }else{
        $(this).addClass('is-valid').removeClass('is-invalid');
        $('#validationCloseTime').addClass('is-valid').removeClass('is-invalid');
    }
    
});

$('#validationCloseTime').on('input', function(){
    var close = (parseInt($(this).val().substring(0, 2))*60)+parseInt($(this).val().substring(3, 5));
    var open = (parseInt($('#validationOpenTime').val().substring(0, 2))*60)+parseInt($('#validationOpenTime').val().substring(3, 5));

    if(open > close  || isNaN(open) || isNaN(close)){
        $(this).addClass('is-invalid').removeClass('is-valid');
        $('#validationOpenTime').addClass('is-invalid').removeClass('is-valid');

    }else{
        $(this).addClass('is-valid').removeClass('is-invalid');
        $('#validationOpenTime').addClass('is-valid').removeClass('is-invalid');
    }
    
});



$('#validationURL').on('input', function(){

    if(/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/i.test($(this).val())){
        $(this).addClass('is-valid').removeClass('is-invalid');
    }
    else{
        $(this).addClass('is-invalid').removeClass('is-valid');
    } 
});


$('#submit').on('click', function(){
    var name = $('#validationName').val();
    var address = $('#validationAddress').val();
    var lat = $('#validationLatitude').val();
    var long = $('#validationLongitude').val();
    var otime = (parseInt($('#validationOpenTime').val())*60)+parseInt($('#validationOpenTime').val());
    var ctime = (parseInt($('#validationCloseTime').val())*60)+parseInt($('#validationCloseTime').val());
    var url = $('#validationURL').val();
    var contact = $('#validationContact').val();

    var restaurant = {name: name, 
                      address: address, 
                      latitude: lat, 
                      longitude: long, 
                      closingTime: ctime, 
                      openingTime: otime, 
                      contactNo: contact, 
                      photo: url};

    if(name.length>0 && address.length>=10 && lat.length>=2 && long.length>=2 && (otime<=ctime) && !isNaN(otime) && !isNaN(ctime) && /(^(\+88|0088)?(01){1}[56789]{1}(\d){8})$/.test(contact) && /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/i.test(url)){
        $.ajax({
            method: "POST",
            url: '/restaurant/add',
            data: restaurant
        }).done(function(response){
            console.log('Done');
        }).fail(function(response){
            console.log('Fail');
        });

        window.location.href = '/restaurant/add';
        alertify.success('Record saved successfully!');
        
    }
    else{
        if(name.length == 0){
            $('#validationName').addClass('is-invalid').removeClass('is-valid');
        }

        if(address.length < 10){
            $('#validationAddress').addClass('is-invalid').removeClass('is-valid');
        }

        if(!/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/i.test(url)){
            $('#validationURL').addClass('is-invalid').removeClass('is-valid');
        }

        if(lat.length<2){
            $('#validationLatitude').addClass('is-invalid').removeClass('is-valid');
        }

        if(long.length<2){
            $('#validationLongitude').addClass('is-invalid').removeClass('is-valid');
        }


        if(otime>ctime || isNaN(otime) || isNaN(ctime)){
            $('#validationOpenTime').addClass('is-invalid').removeClass('is-valid');
            $('#validationCloseTime').addClass('is-invalid').removeClass('is-valid');
        }

        if(!/(^(\+88|0088)?(01){1}[56789]{1}(\d){8})$/.test(contact)){
            $('#validationContact').addClass('is-invalid').removeClass('is-valid');
        }
    }
});

$('#cancle').on('click', function(){
    window.location.href = '/';
});