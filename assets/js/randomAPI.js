<<<<<<< HEAD
fetch("https://kareoke.p.rapidapi.com/v1/song/search?q=Spotlight&limit=" + maxNumber, {
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "kareoke.p.rapidapi.com",
		"x-rapidapi-key": "4358a3ae45msh1ef514db96f084bp1426f0jsn143dce70b436"
	}
})
.then(function (response) {
  if (!response.ok) {
    throw response.json();
  }
  console.log(response)
  return response.json();
})
.then(function (data){
  var randomID = data.youtube.id;
  console.log(data)
})
.catch(err => {
	console.error(err);


}); 
=======
// fetch("https://kareoke.p.rapidapi.com/v1/song/search?q=Spotlight&limit=" + maxNumber, {
// 	"method": "GET",
// 	"headers": {
// 		"x-rapidapi-host": "kareoke.p.rapidapi.com",
// 		"x-rapidapi-key": "4358a3ae45msh1ef514db96f084bp1426f0jsn143dce70b436"
// 	}
// })

function randomVid (){
  fetch("https://kareoke.p.rapidapi.com/v1/song/random", {
    "method": "GET",
    "headers": {
      "x-rapidapi-host": "kareoke.p.rapidapi.com",
      "x-rapidapi-key": "4358a3ae45msh1ef514db96f084bp1426f0jsn143dce70b436"
    }
  })
  .then(function (response) {
    if (!response.ok) {
      throw response.json();
    }
    console.log(response)
    return response.json();
  })
  .then(function (data){
    console.log(data);
    var searchVal = data.youtube.id;
    console.log(data.youtube.id);
    searchVid(searchVal);

  })
  .catch(err => {
    console.error(err);
  }); 
}
var randomBtnEl = $('#randomBtn');

$(randomBtnEl).on('click', function(){
  randomVid();

})
>>>>>>> origin/feature/rawAPICall
