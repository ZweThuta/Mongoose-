const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const postSchema = new Schema({
  title: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  imgUrl: {
    type: String,
    require: true,
  },
});
module.exports = model("Post", postSchema);
