const { default: mongoose, Schema } = require("mongoose");
const BannerSchema = new Schema(
  {
    image: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Banner", BannerSchema);
