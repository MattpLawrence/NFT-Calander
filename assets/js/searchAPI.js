// Handle search function

var urlSearch = 'https://www.googleapis.com/youtube/v3/search';

function searchVid(searchVal){
  var optionsSearch = {
    part: 'snippet',
    key: key,
    maxResults: 10,
    q: searchVal,
    type: 'video',
    videoEmbeddable: 'true'
  }

  console.log(searchVal + '  other page')
  $.getJSON(urlSearch, optionsSearch, function (data) {
    
    console.log(data);
  
    console.log(data.items[0].snippet);
    var id = data.items[0].id.videoId;
    console.log(id);
    searchResultsLoop(data)
  });

}

function searchResultsLoop(data) {
  $('main').empty();

  $.each(data.items, function (i, item) {

      var thumb = item.snippet.thumbnails.medium.url;
      var title = item.snippet.title;
      var desc = item.snippet.description.substring(0, 100);
      var vid = item.snippet.resourceId;

      
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
  var id = data.items[0].snippet.thumbnails.high.url;
  mainImgSearch(id);
  
  function mainImgSearch(id) {
    $('#preview').html($('<img>',{id: 'image', src: id, width:'560', height: '315'}  
    ));
  }

    }




