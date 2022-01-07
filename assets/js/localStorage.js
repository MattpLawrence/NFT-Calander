function searchHistory(id) {
    $('#preview').html($('<img>',{id: 'image', src: id, width:'560', height: '315'}  
    ));

}


// let searchHistory = localStorage.getItem ("search");
// // console.log (searchHistory);

// var searchHistory






// function searchResultsLoop(data) {
//     $('main').empty();
  
//     $.each(data.items, function (i, item) {
  
//         var thumb = item.snippet.thumbnails.medium.url;
//         var title = item.snippet.title;
//         var desc = item.snippet.description.substring(0, 100);
//         var vid = item.snippet.resourceId;
  
        
//         $('main').append(`
//           <article class="item" data-key="${vid}">
  
//             <img src="${thumb}" alt="" class="thumb">
//             <div class="details">
//               <h4>${title}</h4>
//               <p>${desc}</p>
//             </div>
  
//           </article>
//         `);


