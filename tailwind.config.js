const colors = require("tailwind/colors");

module.exports = {
    purge: [],
    dareMode: false,
    theme: {
        extend: {
            backgroundImage: theme => ({
                "banner-image": "url(assets/23BE4F19-B513-47D7-8F59-A1E243918395.jpeg)"
            })
        }
       inset: {
           "50": "50px",
           "100": "100px",
           "150": "150px"
       } 
    }
}