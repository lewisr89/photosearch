$(document).ready(function() {

    var min='',
    url='',

    instagram = {                                    
        clientID: '62e29032440f4e8ebf841aeedf190a2e',
        apiHost: 'https://api.instagram.com',
    }

    function loadInstagrams() {                     
        $('.loading').removeClass('hidden');
        $('#backgroundimage').addClass('hidden');
        tag = $('input').val();
        $.ajax({
            type: "GET",
            dataType: "jsonp",
            cache: false,
            url: instagram.apiHost + "/v1/tags/" + tag + "/media/recent/?client_id=" + instagram.clientID + "&count=20",
            data: {'client_id': instagram.clientID, 'max_tag_id': min,},
            success: function(pic) {
                min = pic.pagination.next_max_tag_id;
                url = pic.pagination.next_url;
                $('.loading').addClass('hidden');
                $('.controlbutton').removeClass('hidden');
                console.dir(pic);
                for (var i = 0; i < pic.data.length; i++) {
                    var imageData=pic.data[i];
                    var numberOfLikes=imageData.likes.count;
                    likes = numberOfLikes;
                    console.log(likes);
                    link = imageData.link;
                    urlsrc = imageData.images.thumbnail.url;
                    $("#output").append("<div id='outputpic'><a target='_blank' href='" + link + "'><div id='heartdiv'><div id='likesdiv'>" + likes + "</div></div><img src='" + urlsrc + "'></img></div>");
                }  
            }      

        });
    }

     $('#morepics').on('click', function() {         //load more pictures on button click
        loadInstagrams();
     })

     $('#clearall').on('click', function() {         //clears all pics, restores logo, removes buttons, focuses on input field
        $('#output').empty();
        $('#backgroundimage').removeClass('hidden');
        $('.controlbutton').addClass('hidden');
        $('input').val('');
        $('input').focus();
     })
     
    $('input').on('click focusin', function() {      //removes input value on focus
        this.value = '';
    });

    $('input').on('blur', function() {               //hides loader GIF when focus off of input. 
        $('.loading').addClass('hidden');            //a fix for an undesirable effect. loader gif spins when content of input deleted
    })

    var timerid;                                     //automatically submit input after time delay
    $('input').keyup(function() {
        clearTimeout(timerid);
        timerid = setTimeout(function() { loadInstagrams(); }, 500);
    });


});