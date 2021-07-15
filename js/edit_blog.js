$(document).ready(function (e) {
      $('#emp_table').on('submit', '.editForm', function (e) {
        e.preventDefault();
        var id = $(this).attr('id');
      
        var blog_title = $("#blog_title"+id).val();
        var blog_content = $("#blog_content"+id).val();
        
        if(blog_title == '')
        {
             $('.err_blog_title').html(' <div class="w3-container w3-white"><span style=";color:red"><small>* Blog Title is required</small></span></div>');
        }
        if(blog_content == '')
        {
             $('.err_blog_content').html(' <div class="w3-container w3-white"><span style=";color:red"><small>* Blog Content is required.</small></span></div>');
            
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
                    window.location.href = 'blog.php';
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
