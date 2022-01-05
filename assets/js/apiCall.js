var searchBtnEl = $('#searchBtn');
var searchBarEL = $('#searchBar');
// APi key for all googleAPi searches on this project
var key = 'AIzaSyC7u-65-16e0JB7PPDDpUM8j1wFyDprLzo'; 

$(document).ready(function () {


  var playlistId = 'PLMKA5kzkfqk2GEImRCIqGqWmQvKYygUhG';
  var urlPlay = 'https://www.googleapis.com/youtube/v3/playlistItems';


  var optionsPlay = {
      part: 'snippet',
      key: key,
      maxResults: 20,
      playlistId: playlistId
  }

  loadVids();

  function loadVids() {
      $.getJSON(urlPlay, optionsPlay, function (data) {
          var id = data.items[0].snippet.thumbnails.high.url;
          console.log(id);
          console.log(data.items[0].snippet);
          mainVid(id);
          resultsLoop(data);
      });
  }
  function mainVid(id) {
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

  // Click on list item
  $('main').on('click', 'article', function () {
      var id = $(this).children('img').attr('src');
      console.log(this)
      // console.log((this).find("img"));
      console.log(id);
      mainVid(id);
  });
  // Click on search bar button
  $(searchBtnEl).on('click', function(){
    var searchVal = searchBar.value;
    console.log(searchVal);
    searchVid(searchVal);
  })


});