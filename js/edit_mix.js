$(document).ready(function (e) {
      $('#emp_table').on('submit', '.editForm', function (e) {
        e.preventDefault();
        var id = $(this).attr('id');
      
        var mix_title = $("#mix_title"+id).val();
        
        if(mix_title == '')
        {
             $('.err_mix_title').html(' <div class="w3-container w3-white"><span style=";color:red"><small>* Mix title is required</small></span></div>');
        }
        else
        {
        $.ajax({
            type: 'POST',
            url: 'upload_file.php',
            data: new FormData(this),
            contentType: false,
            cache: false,
            processData: false,
            beforeSend: function () {

               // $('.submitPost').attr("disabled", "disabled");
                $('#editForm').css("opacity", ". 5");
            },
            success: function (msg) {
                $('.statusMsg').html('');
                
                if ($.trim(msg) === 'ok')
                {
                    //$('#editForm')[0].reset();
                    $('.statusMsg').html(' <div class="alert alert-success "><strong>Success!&nbsp&nbsp</strong> File has been updated.</div>');
                    window.location.href = 'mixes.php';
                }
                else
                {
                    $('.statusMsg').html('<div class="alert alert-danger ">Failed!</strong>&nbsp&nbspFile was not updated.</div>');
                }
                $('#editForm').css("opacity", " ");
                $('.submitPost').removeAttr("disabled");
            }
        });

    }
    });

    
});
