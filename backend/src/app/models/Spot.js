import mongoose from "mongoose";

const SpotSchema = mongoose.Schema(
  {
    thumbnail: String,
    company: String,
    price: Number,
    techs: [String],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  },
  {
    toJSON: {
      virtuals: true
    }
  }
);
SpotSchema.virtual("thumbnail_url").get(function() {
  return `http://localhost:3333/files/${this.thumbnail}`;
});
SpotSchema.virtual("thumbnail_mobile").get(function() {
  return `http://192.168.0.12:3333/files/${this.thumbnail}`;
});

export default mongoose.model("Spot", SpotSchema);
