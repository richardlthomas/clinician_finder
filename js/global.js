/*globals document, jQuery, console, alert, google, geo_position_js */

function listPosts(data) {

    console.log(data);

    var output = '<form class="ui-filterable"><input id="searchposts" data-type="search"></form>';

    output += '<ul data-role="listview" data-filter="true" data-input="#searchposts">';

    $.each(data.posts, function(key, val) {
        if (val.title !== '') {

            output += '<li>';
            // output += '<a href="#blogpost" onclick="showPost(' + val.id + ')">';
            output += '<a href="' + val.url + '" target="_blank">';
                output += (val.thumbnail) ?
                    '<img src="' + val.thumbnail + '" alt="' + val.title + '" width="150" height="150">':
                    '<img src="./images/default.png" alt="Default Featured Image" width="150" height="150">';
                output += '<h3>' + val.title + '</h3>';
            output += '</a>';
            output += '</li>';

        }
    });

    output += '</ul>';

    $('#postlist').html(output);
}

// function showPost(id) {
//     $.getJSON('http://www.newstringsdesign.com/?json=get_posts&post_id=' + id + '&callback=?', function(data) {

//         console.log(data);
//         console.log(id);

//         var output = '<h3>' + data.posts[0].title + '</h3>';

//         output += '<p>' + data.posts[0].content + '</p>';

//         $('#mypost').html(output);
//     });
// }

(function($) {
    'use strict';

    function drawMap(p) {
        //get the data from the position object
        var nsdLat = p.coords.latitude.toFixed(2),
            nsdLng = p.coords.longitude.toFixed(2),
            mapOptions = {
                center: new google.maps.LatLng(nsdLat, nsdLng),
                zoom: 14,
                zoomControl: false,
                scrollwheel: false,
                mapTypeControl: true,
                mapTypeControlOptions: {style: google.maps.MapTypeControlStyle.DROPDOWN_MENU}
                // navigationControl: true,
                // navigationControlOptions: {style: google.maps.NavigationControlStyle.SMALL},
                // mapTypeId: google.maps.MapTypeId.ROADMAP
            },
            map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);

        console.log('Latitude is: ' + nsdLat);
        console.log('Longitude is: ' + nsdLng);


        //resize the map after loading the page
        $(document).on('pagechange', function() {
            google.maps.event.trigger(map, 'resize');
        });
    }

    function error_callback() {
        console.log('Was not able to get your current position.');
    }

    function locationInit() {
        //determine if the handset has client side geo location capabilities
        if (geo_position_js.init()) {

            geo_position_js.getCurrentPosition(drawMap, error_callback, {enableHighAccuracy: true});

        } else {
            alert("Functionality not available");
        }
    }

    $(document).ready(function() {
        locationInit();

        // var optionsHash = {
        //     animate: false,
        //     dismissible: true
        // };

        // $('#contactPanel').panel('open', optionsHash);
    });

}(jQuery));
