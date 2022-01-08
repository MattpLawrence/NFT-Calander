const colors = require("tailwind/colors");

module.exports = {
    purge: [],
    dareMode: false,
    theme: {
        extend: {
            backgroundImage: theme => ({
                "banner-image": "url()"
            })
        }
    }
}