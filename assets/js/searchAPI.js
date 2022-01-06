// Handle search function

var urlSearch = 'https://www.googleapis.com/youtube/v3/search';

function searchVid(searchVal){
  var optionsSearch = {
    part: 'snippet',
    key: key,
    maxResults: 10,
    q: searchVal,
    // type: 'video',
    // videoEmbeddable: 'true'
  }
  
  $.getJSON(urlSearch, optionsSearch, function (data) {
    // console.log(data);
    // console.log(data.items[0].snippet);
    // var id = data.items[0].id.videoId;
    // console.log(id);
    searchResultsLoop(data)
  });

 mainImgSearch(searchVal);
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
    try{
    // var id = data.items[0].snippet.thumbnails.high.url;
    // mainImgSearch(id);
    }catch(err){
      console.log('someerror');
      if (err === TypeError){
        randomVid();
        console.log('retry');
      }
    }
    // function mainImgSearch(id) {
    //   $('#preview').html($('<img>',{id: 'image', src: id, width:'560', height: '315'}  
    //   ));
    // }
    // function mainImgSearch(id) {
    //   $('#preview').html(`
    //   <iframe width="560" height="315" src="https://www.youtube.com/embed/${id}" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
    // `);
    //   console.log(id);
    // }

  }

  function mainImgSearch(id) {
    $('#preview').html(`
    <iframe width="560" height="315" src="https://www.youtube.com/embed/${id}" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
  `);
  console.log(id);

  }
