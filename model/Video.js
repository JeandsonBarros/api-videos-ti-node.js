const mongoose = require("mongoose");

const videoModel = mongoose.model("VideoModel", {
    name: String,
    url: String,
    matter: String,
    type: String,
    channel: String

})

module.exports = videoModel;