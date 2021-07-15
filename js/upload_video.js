$(document).ready(function (e) {
    $("#PostForm").on('submit', function (e) {
        e.preventDefault();
        var video_title = $("#video_title").val();
        var video_length = $("#video")[0].files.length;
        var image_length = $("#video_image")[0].files.length;

        if(video_length == 0)
        {
             $('.err_video').html(' <div class="w3-container w3-white"><span style=";color:red"><small>* Please select video file.</small></span></div>');
            
        }
        if(image_length == 0)
        {
             $('.err_image').html(' <div class="w3-container w3-white"><span style=";color:red"><small>* Please select image file.</small></span></div>');
            
        }
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

                $('.submitPost').attr("disabled", "disabled");
                $('#PostForm').css("opacity", ". 5");
            },
            success: function (msg) {
                $('.statusMsg').html('');
                
                if ($.trim(msg) === 'ok')
                {
                    $('#PostForm')[0].reset();
                    $('.statusMsg').html(' <div class="alert alert-success "><strong>Success!&nbsp&nbsp</strong> File has been saved.</div>');
                    window.location.href = 'videos.php';
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

    $("#video").change(function () {
        var file = this.files[0];
        var videofile = file.type;
        var match = ["video/mp4", "video/mpeg", "video/avi","video/mov"];
        if (!((videofile == match[0]) || (videofile == match[1]) || (videofile == match[2])|| (videofile == match[3]))) {
             $('.err_video').html(' <div class="w3-container w3-white"><span style=";color:red"><small>* Please select a valid video file.</small></span></div>');
             $("#video").val('');
             return false;
        }
    });
    $("#video_image").change(function () {
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