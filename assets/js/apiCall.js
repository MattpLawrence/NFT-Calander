var searchBtnEl = $('#searchBtn');
var searchBarEL = $('#searchBar');


$(document).ready(function () {

  var key = 'AIzaSyC7u-65-16e0JB7PPDDpUM8j1wFyDprLzo';
  var playlistId = 'PLMKA5kzkfqk2GEImRCIqGqWmQvKYygUhG';
  var URL = 'https://www.googleapis.com/youtube/v3/playlistItems';


  var options = {
      part: 'snippet',
      key: key,
      maxResults: 20,
      playlistId: playlistId
  }

  loadVids();

  function loadVids() {
      $.getJSON(URL, options, function (data) {
          var id = data.items[0].snippet.thumbnails.high.url;
          console.log(id);
          console.log(data.items[0].snippet);
          mainVid(id);
          resultsLoop(data);
          function mainVid(id) {
            var thumbNail = data.items[0].snippet.thumbnails.high.url
              $('#preview').prepend($('<img>',{id: 'image', src: thumbNail}  
              ));
              console.log(mainVid);
          }
      });
  }
  function mainVid(id) {
    // var thumbNail = data.items[0].snippet.thumbnails.high.url
      $('#preview').html($('<img>',{id: 'image', src: id, width:'560', height: '315'}  
      ));
      console.log(id);
      console.log(mainVid);
  }

  

  
  function resultsLoop(data) {

      $.each(data.items, function (i, item) {

          var thumb = item.snippet.thumbnails.medium.url;
          var title = item.snippet.title;
          var desc = item.snippet.description.substring(0, 100);
          var vid = item.snippet.resourceId.videoId;


          $('main').append(`
            <article class="item" data-key="${vid}">

              <img src="${thumb}" alt="" class="thumb">
              <div class="details">
                <h4>${title}</h4>
                <p>${desc}</p>
              </div>

            </article>
          `);
      });
  }

  // CLICK EVENT
  $('main').on('click', 'article', function () {
      var id = $(this).children('img').attr('src');
      console.log(this)
      // console.log((this).find("img"));
      console.log(id);
      mainVid(id);
  });


});