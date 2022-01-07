var searchBtnEl = $("#searchBtn");
var searchBarEL = $("#searchBar");
var previewEL = $("#preview");
var subMenuEL = $("#subMenu");
var randomListEL = $("#randomList");
var store = window.localStorage;
// APi key for all googleAPi searches on this project
var key = "AIzaSyBwMqbMarkc2HTA4cfma3Qbj6cD8yxzItU";
var maxNumber = 10;

$(document).ready(function () {
  var playlistId = "PLMKA5kzkfqk2GEImRCIqGqWmQvKYygUhG";
  var urlPlay = "https://www.googleapis.com/youtube/v3/playlistItems";
  var optionsPlay = {
    part: "snippet",
    key: key,
    maxResults: maxNumber,
    playlistId: playlistId,
  };

  loadVids();
  function loadVids() {
    $.getJSON(urlPlay, optionsPlay, function (data) {
      var id = data.items[0].snippet.thumbnails.high.url;
      mainImg(id);
      resultsLoop(data);
    });
  }
  function mainImg(id) {
    $("#preview").html(
      $("<img>", { id: "image", src: id, width: "280", height: "157" })
    );
  }
  // loop through to show landing page results
  function resultsLoop(data) {
    $.each(data.items, function (i, item) {
      var thumb = item.snippet.thumbnails.medium.url;
      var title = item.snippet.title;
      var desc = item.snippet.description.substring(0, 100);
      var vid = item.snippet.resourceId.videoId;

      $("main").append(`
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

  //*******************************************history bar*** */
  var pastSearches = [];

  function saveSearchHistory(searchVal) {
    if (localStorage["pastSearches"]) {
      pastSearches = JSON.parse(localStorage["pastSearches"]);
    }
    if (pastSearches.indexOf(searchVal) == -1) {
      pastSearches.unshift(searchVal);
      if (pastSearches.length > 5) {
        pastSearches.pop();
      }
      localStorage["pastSearches"] = JSON.stringify(pastSearches);
    }
    searchBar.value = ""; //clear search bar
  }

  function drawPastSearches() {
    pastSearches = JSON.parse(localStorage["pastSearches"]); //retrieve from local storage

    if (pastSearches.length) {
      console.log(pastSearches);
      $.each(pastSearches, function (i, val) {
        var subMenuLI = $(`<button>`).text(val).attr("class", "historyBtn");
        subMenuEL.append(subMenuLI);
      });
    }
  }

  //on search bar focus
  $(searchBarEL).on("focus", function (e) {
    if ($(subMenuEL).children().length === 0) {
      e.preventDefault();
      var search = $(this).text();
      drawPastSearches(search);
    }
  });

  //stop from closing sub menu when clicked
  $(searchBarEL).on("click", function (e) {
    e.stopPropagation();
  });

  $(document).on("click", function () {
    subMenuEL.empty();
  });

  $(subMenuEL).on("click", function (e) {
    var textValue = e.target.innerText;
    searchBar.value = textValue;
    searchVid(textValue);
  });

  //********************************************** */

  // on dblClick follow to youtube page
  function followPath(path) {
    console.log("followed");
    window.open("https://www.youtube.com/watch?v=" + path, "_blank");
  }
  // Click on list item
  $("main").on("click", "article", function () {
    var id = $(this).children("img").attr("src");
    mainImg(id);
    var idThis = $(this);
    console.log(idThis);
  });
  //double click
  $("main").on("dblclick", "article", function () {
    //get id from splitting apart the thumbnail src URL
    var path = $(this).children("img").attr("src");
    console.log(path);
    var splitPath = path.split("/");
    console.log(splitPath);
    var pathFinal = splitPath[4];
    console.log(pathFinal);
    followPath(pathFinal);
  });
  // **************************** search for enter key press
  $(searchBarEL).on("keyup", function (e) {
    if (e.which == 13) {
      var searchVal = searchBar.value;
      searchVid(searchVal);
      saveSearchHistory(searchVal);
      subMenuEL.empty();
    }
  });

  // *****************live update search bar, not using because of API key******

  // $(searchBarEL).on("keyup", function (e) {
  //   //check for null value and cancel if null
  //   console.log("input");
  //   if (searchBar.value) {
  //     var searchVal = searchBar.value;
  //     searchVid(searchVal);
  //   } else {
  //     return;
  //   }
  // });

  // Click on search bar button
  $(searchBtnEl).on("click", function () {
    //check for null value and cancel if null
    if (searchBar.value) {
      var searchVal = searchBar.value;
      searchVid(searchVal);
      saveSearchHistory(searchVal);
    } else {
      return;
    }
  });
});

// ******************************************past play history********************

var pastRandom = [];
// pull in and save random search data to local storage
function savePlayHistory(randomUrl, randomTitle, randomImage) {
  randomListEL.empty();
  console.log(randomUrl);
  console.log(randomTitle);
  console.log(randomImage);
  if (localStorage["pastRandom"]) {
    pastRandom = JSON.parse(localStorage["pastRandom"]);
  }
  if (pastRandom.indexOf(randomTitle) == -1) {
    pastRandom.unshift(randomTitle);
    if (pastRandom.length > 10) {
      pastRandom.pop();
    }
    localStorage["pastRandom"] = JSON.stringify(pastRandom);
  }
  drawPastRandom();
}
// generate sidebar values to show last 10 random searches
function drawPastRandom() {
  pastRandom = JSON.parse(localStorage["pastRandom"]); //retrieve from local storage

  if (pastRandom.length) {
    console.log(pastRandom);
    $.each(pastRandom, function (i, val) {
      var randomListLI = $(`<button>`).text(val).attr("class", "historyBtn");
      randomListEL.append(randomListLI);
    });
  }
}
historyOnLoad();

function historyOnLoad(e) {
  try {
    drawPastRandom();
    // if ($(subMenuEL).children().length === 0) {
    //   console.log("yes");
    //   // var search = $(this).text();
    //   // drawPastSearches(search);
    // }
  } catch {
    $("#randomHistory").css("display", "none");
    console.log("catch");
  }
}

// when random history is clicked, search the video again
$(randomListEL).on("click", function (e) {
  var textValue = e.target.innerText;
  console.log(textValue);
  searchBar.value = textValue;
  searchVid(textValue);
});
