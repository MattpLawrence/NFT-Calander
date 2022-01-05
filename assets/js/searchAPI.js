// Handle search function

var urlSearch = 'https://www.googleapis.com/youtube/v3/search';



function searchVid(searchVal){
  var optionsSearch = {
    part: 'snippet',
    key: key,
    maxResults: 20,
    q: searchVal
  }

  console.log(searchVal + '  other page')
  $.getJSON(urlSearch, optionsSearch, function (data) {
    
    console.log(data);
    console.log(data.items[0].snippet);
    console.log(data.items[0].snippet);
    var id = data.items[0].id.videoId;
    console.log(id);
  });

}