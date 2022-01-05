// Handle search function

var urlSearch = 'https://www.googleapis.com/youtube/v3/search';

var optionsSearch = {
  part: 'snippet',
  key: key,
  maxResults: 20,
  
}

function searchVid(searchVal){
  console.log(searchVal + '  other page')
  $.getJSON(urlSearch, options, function (data) {
    var id = data.items[0].snippet.thumbnails.high.url;
    console.log(id);
    console.log(data.items[0].snippet);
    mainVid(id);
    resultsLoop(data);
  });

}