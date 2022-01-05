// https://rapidapi.com/novus-api-novus-api-default/api/top-nft-sales/
// fetch("https://top-nft-sales.p.rapidapi.com/sales/30d", {
// 	"method": "GET",
// 	"headers": {
// 		"x-rapidapi-host": "top-nft-sales.p.rapidapi.com",
// 		"x-rapidapi-key": "4358a3ae45msh1ef514db96f084bp1426f0jsn143dce70b436"
// 	}
// })


https://rapidapi.com/tomerdad/api/nft-stats/
fetch("https://nft-stats.p.rapidapi.com/NFT/topNFTs/?Filter=%3CREQUIRED%3E", {
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "nft-stats.p.rapidapi.com",
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
  console.log(data)
})
.catch(err => {
	console.error(err);
});