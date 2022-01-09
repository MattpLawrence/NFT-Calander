// Handle search function

var urlSearch = "https://www.googleapis.com/youtube/v3/search";

function searchVid(searchVal) {
  var optionsSearch = {
    part: "snippet",
    key: key,
    maxResults: 1,
    q: searchVal,
    type: "video",
    videoEmbeddable: "true",
  };

  $.getJSON(urlSearch, optionsSearch, function (data) {
    searchResultsLoop(data);
  });
  //  mainImgSearch(searchVal); //*****************Comment in to display Embedded video */
}

function searchResultsLoop(data) {
  $("main").empty();

  // $.each(data.items, function (i, item) {
  //   var thumb = item.snippet.thumbnails.medium.url;
  //   var title = item.snippet.title;
  //   var desc = item.snippet.description.substring(0, 100);
  //   var vid = item.snippet.resourceId;

  //   $("main").append(`
  //   <article class="item" data-key="${vid}">
  //     <img src="${thumb}" alt="" class="thumb">
  //     <div class="details">
  //       <h4>${title}</h4>
  //       <p>${desc}</p>
  //     </div>
  //   </article>
  // `);
  // });

  //****************comment back in to display thumbnail******** */

  try {
    console.log(data);
    var thumb = data.items[0].snippet.thumbnails.high.url;
    var id = data.items[0].id.videoId;
    var title = data.items[0].snippet.title;
    var description = data.items[0].snippet.description;
    var channel = data.items[0].snippet.channelTitle;
    // mainImgSearch(id);
    console.log(id);
    console.log(thumb);
    console.log(title);
    console.log(description);
    console.log(channel);
    $("#preview").html($("<img>", { id: "image", src: thumb }));
  } catch (err) {
    console.log("someerror");
    randomVid();
    console.log("retry");
  }
  function mainImgSearch(id) {
    $("#preview").html($("<img>", { id: "image", src: id }));
  }
  //  width: "280", height: "157"
  //********************************************************************** */
}

//****************Comment in to display embedded video/ also call on line 22**************** */
// function mainImgSearch(id) {
//   $('#preview').html(`
//   <iframe width="560" height="315" src="https://www.youtube.com/embed/${id}" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
// `);
// console.log(id);
// }
//************************************************************************ */
