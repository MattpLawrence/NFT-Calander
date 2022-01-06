var searchBtnEl = $('#searchBtn');
var searchBarEL = $('#searchBar');
var previewEL = $('#preview');
var subMenuEL = $('#subMenu');
// var formOutlineEL = $('form-outline');
var store = window.localStorage;
// APi key for all googleAPi searches on this project
var key = 'AIzaSyCiyPkfNWAkg0-7BgKKX3bxxPzDH0Fop9w'; 
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
 // loop through to show landing page results
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

  //********************************************** */
  var pastSearches =[];

  function saveSearchHistory(searchVal){
    console.log('save try');
    if(localStorage['pastSearches']){
      pastSearches = JSON.parse(localStorage['pastSearches']);
    }
    
    if(pastSearches.indexOf(searchVal) == -1) {
      pastSearches.unshift(searchVal);
      if(pastSearches.length > 5) { 
        pastSearches.pop();
      }
      localStorage["pastSearches"] = JSON.stringify(pastSearches);
    }
    searchBar.value = ''; //clear search bar
  }

  function drawPastSearches() {
    pastSearches = JSON.parse(localStorage['pastSearches']); //retrieve from local storage

    if(pastSearches.length) {
      console.log(pastSearches);
      $.each(pastSearches,function(i,val){
        console.log( i + '  ' + val);
        var subMenuLI = $(`<li>${val}<li>`);
        // subMenuLI = val;
        subMenuEL.append(subMenuLI)

      })
      
    }
    
  }


  //on search bar focus
  $(searchBarEL).on("focus", function(e) {
      e.preventDefault();
      console.log('first focus');
      var search = $(this).text();
      drawPastSearches(search);
  });
  //on lost focus of search bar
  $(searchBarEL).on("focusout", function(e) {
    subMenuEL.empty();
  });
  //********************************************** */


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
    var searchVal = searchBar.value;
    searchVid(searchVal);
    saveSearchHistory(searchVal);
  })



});

// var subMenuLI = $('<li>')
// // subMenuLI.text = 'val';
// subMenuEL.append(subMenuLI)
