$(document).ready(function (e) {
      $('#emp_table').on('submit', '.editForm', function (e) {
        e.preventDefault();
        var id = $(this).attr('id');
      
        var video_title = $("#video_title"+id).val();
        
        if(video_title == '')
        {
             $('.err_video_title').html(' <div class="w3-container w3-white"><span style=";color:red"><small>* Please enter a video title</small></span></div>');
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
                    window.location.href = 'videos.php';
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
