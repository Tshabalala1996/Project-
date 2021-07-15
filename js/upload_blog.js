$(document).ready(function (e) {
    $("#PostForm").on('submit', function (e) {
        e.preventDefault();
        var blog_title = $("#blog_title").val();
        var categories = $("#blog_categories").val();
        alert(categories);
        var blog_content = $("#blog_content").val();
        var image_length = $("#blog_image")[0].files.length;

        if(blog_content == '')
        {
             $('.err_blog_content').html(' <div class="w3-container w3-white"><span style=";color:red"><small>* Please enter blog content.</small></span></div>');
            
        }
        if(image_length == 0)
        {
             $('.err_image').html(' <div class="w3-container w3-white"><span style=";color:red"><small>* Please select image file.</small></span></div>');
            
        }
        if(blog_title == '')
        {
             $('.err_blog_title').html(' <div class="w3-container w3-white"><span style=";color:red"><small>* Please enter a blog title</small></span></div>');
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

                $('.submitPost').attr("disabled", "disabled");
                $('#PostForm').css("opacity", ". 5");
            },
            success: function (msg) {
                $('.statusMsg').html('');
                
                if ($.trim(msg) === 'ok')
                {
                    $('#PostForm')[0].reset();
                    $('.statusMsg').html(' <div class="alert alert-success "><strong>Success!&nbsp&nbsp</strong> File has been saved.</div>');
                }
                else
                {
                    $('.statusMsg').html('<div class="alert alert-danger ">Failed!</strong>&nbsp&nbspFile was not save.</div>');
                }
                $('#PostForm').css("opacity", " ");
                $('.submitPost').removeAttr("disabled");
            }
        });

    }
    });

    $("#blog_image").change(function () {
        var file = this.files[0];
        var imagefile = file.type;
        var match = ["image/jpeg", "image/png", "image/jpg"];
        if (!((imagefile == match[0]) || (imagefile == match[1]) || (imagefile == match[2]))) {
            $('.err_image').html(' <div class="w3-container w3-white"><span style=";color:red"><small>* Please select a valid image file.</small></span></div>');         
            $("#file").val('');
            return false;
        }
    });
});