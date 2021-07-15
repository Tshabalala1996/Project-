$(document).ready(function (e) {
      $('#emp_table').on('submit', '.deleteForm', function (e) {
        e.preventDefault();
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
                    $('.statusMsg').html(' <div class="alert alert-success "><strong>Success!&nbsp&nbsp</strong> File has been deleted.</div>');
                    window.location.href = 'blog.php';
                }
                else
                {
                    $('.statusMsg').html('<div class="alert alert-danger ">Failed!</strong>&nbsp&nbspFile was not deleted.</div>');
                }
                $('#editForm').css("opacity", " ");
                $('.submitPost').removeAttr("disabled");
            }
        });

    });

    
});
