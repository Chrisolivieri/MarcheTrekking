import { Schema, model } from "mongoose";

const favoritesSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    trekkingRoute: {
      type: Schema.Types.ObjectId,
      ref: "TrekkingRoutes",
      required: true,
    },
  },
  {
    collection: "favorites",
    timestamps: true,
  }
);

favoritesSchema.index({ user: 1, trekkingRoute: 1 }, { unique: true });

const Favorites = model("Favorites", favoritesSchema);

export default Favorites;
