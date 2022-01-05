// https://rapidapi.com/novus-api-novus-api-default/api/top-nft-sales/
// fetch("https://top-nft-sales.p.rapidapi.com/sales/30d", {
// 	"method": "GET",
// 	"headers": {
// 		"x-rapidapi-host": "top-nft-sales.p.rapidapi.com",
// 		"x-rapidapi-key": "4358a3ae45msh1ef514db96f084bp1426f0jsn143dce70b436"
// 	}
// })


// https://rapidapi.com/tomerdad/api/nft-stats/
// fetch("https://nft-stats.p.rapidapi.com/NFT/topNFTs/?Filter=%3CREQUIRED%3E", {
// 	"method": "GET",
// 	"headers": {
// 		"x-rapidapi-host": "nft-stats.p.rapidapi.com",
// 		"x-rapidapi-key": "4358a3ae45msh1ef514db96f084bp1426f0jsn143dce70b436"
// 	}
// })

// fetch("https://deezerdevs-deezer.p.rapidapi.com/search?q=jimi%20hendrix", {
// 	"method": "GET",
// 	"headers": {
// 		"x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
// 		"x-rapidapi-key": "4358a3ae45msh1ef514db96f084bp1426f0jsn143dce70b436"
// 	}
// })
// fetch("https://youtube-search-results.p.rapidapi.com/youtube-search/?q=jimi%20hendrix%20all%20along", {
// 	"method": "GET",
// 	"headers": {
// 		"x-rapidapi-host": "youtube-search-results.p.rapidapi.com",
// 		"x-rapidapi-key": "4358a3ae45msh1ef514db96f084bp1426f0jsn143dce70b436"
// 	}
// })
// .then(function (response) {
//   if (!response.ok) {
//     throw response.json();
//   }
//   console.log(response)
//   return response.json();
// })
// .then(function (data){
//   console.log(data)
// })
// .catch(err => {
// 	console.error(err);
// });
// $(document).ready(function(){
//   var key = 'AIzaSyC7u-65-16e0JB7PPDDpUM8j1wFyDprLzo';



// });

// YOU WILL NEED TO ADD YOUR OWN API KEY IN QUOTES ON LINE 5, EVEN FOR THE PREVIEW TO WORK.
// 
// GET YOUR API HERE https://console.developers.google.com/apis/api


// https://developers.google.com/youtube/v3/docs/playlistItems/list

// https://console.developers.google.com/apis/api/youtube.googleapis.com/overview?project=webtut-195115&duration=PT1H

// <iframe width="560" height="315" src="https://www.youtube.com/embed/qxWrnhZEuRU" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>

// https://i.ytimg.com/vi/qxWrnhZEuRU/mqdefault.jpg


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
          var id = data.items[0].snippet.resourceId.videoId;
          mainVid(id);
          resultsLoop(data);
      });
  }

  function mainVid(id) {
      $('#video').html(`
        <iframe width="560" height="315" src="https://www.youtube.com/embed/${id}" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
      `);
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
      var id = $(this).attr('data-key');
      mainVid(id);
  });


});