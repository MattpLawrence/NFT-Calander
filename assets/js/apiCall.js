var searchBtnEl = $('#searchBtn');
var searchBarEL = $('#searchBar');
var previewEl = $('preview');
// APi key for all googleAPi searches on this project
var key = 'AIzaSyC7u-65-16e0JB7PPDDpUM8j1wFyDprLzo'; 
var maxNumber = 10;


$(document).ready(function () {


  var playlistId = 'PLMKA5kzkfqk2GEImRCIqGqWmQvKYygUhG';
  var urlPlay = 'https://www.googleapis.com/youtube/v3/playlistItems';
  

  var optionsPlay = {
      part: 'snippet',
      key: key,
      maxResults: maxNumber,
      playlistId: playlistId
  }

  loadVids();

  function loadVids() {
      $.getJSON(urlPlay, optionsPlay, function (data) {
          var id = data.items[0].snippet.thumbnails.high.url;
          mainImg(id);
          resultsLoop(data);
      });
  }
  function mainImg(id) {
      $('#preview').html($('<img>',{id: 'image', src: id, width:'560', height: '315'}  
      ));

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

  // on dblClick follow to youtube page
  function followPath(path){
    console.log('followed')
    window.open('https://www.youtube.com/watch?v='+ path , "_blank");
  }




  // Click on list item
  $('main').on('click', 'article', function () {
      var id = $(this).children('img').attr('src');
      mainImg(id);
      var idThis = $(this);
      console.log(idThis); 
  });

  //double click
  $('main').on('dblclick', 'article', function () {
    //get id from splitting apart the thumbnail src URL
    var path = $(this).children('img').attr('src');
    console.log(path);
    var splitPath = path.split('/');
    console.log(splitPath);
    var pathFinal = splitPath[4];
    console.log(pathFinal);
    followPath(pathFinal);
});
  // Click on search bar button
  $(searchBtnEl).on('click', function(){
    console.log('hewwo?')
    var searchVal = searchBar.value;
    searchVid(searchVal);

  })
});

$(window).on('load', function () {
  $('#loading').hide();
}) 