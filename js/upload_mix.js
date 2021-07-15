$(document).ready(function (e) {
    $("#PostForm").on('submit', function (e) {
        e.preventDefault();
        var mix_title = $("#mix_title").val();
        var mix_length = $("#mix")[0].files.length;

        if(mix_length == 0)
        {
             $('.err_mix').html(' <div class="w3-container w3-white"><span style=";color:red"><small>* Mix track file is required..</small></span></div>');
            
        }
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

    $("#mix").change(function () {
        var file = this.files[0];
        var videofile = file.type;
        var match = ["audio/mp3", "audio/wav", "audio/acc", "audio/ogg"];
        if (!((videofile == match[0]) || (videofile == match[1]) || (videofile == match[2])|| (videofile == match[3]))) {
             $('.err_mix').html(' <div class="w3-container w3-white"><span style=";color:red"><small>* Please select a valid audio file.</small></span></div>');
             $("#mix").val('');
             return false;
        }
    });
});