//handle random function
var spinnerEl = $("#spinner");
var randomBtnEl = $("#randomBtn");

function randomVid() {
  spinnerEl.css("display", "inline-block"); //start spinner
  fetch("https://kareoke.p.rapidapi.com/v1/song/random", {
    method: "GET",
    headers: {
      "x-rapidapi-host": "kareoke.p.rapidapi.com",
      "x-rapidapi-key": "4358a3ae45msh1ef514db96f084bp1426f0jsn143dce70b436",
    },
  })
    .then(function (response) {
      if (!response.ok) {
        throw response.json();
      }
      spinnerEl.css("display", "none"); //stop spinner
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      var searchVal = data.youtube.id;
      console.log(data.youtube.id);
      searchVid(searchVal);
      var randomUrl = data.youtube.url;
      console.log(randomUrl);
      var randomTitle = data.youtube.title;
      console.log(randomTitle);
      var randomImage = data.youtube.image;
      console.log(randomImage);
      savePlayHistory(randomUrl, randomTitle, randomImage);
    })
    .catch((err) => {
      console.error(err);
      console.log("oops");
    });
}

$(randomBtnEl).on("click", function () {
  randomVid();
});
