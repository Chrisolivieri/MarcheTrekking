import { Schema, model } from "mongoose";

const favoritesSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "Users",
    },
    trekkingRoute: {
      type: Schema.Types.ObjectId,
      ref: "TrekkingRoutes",
    },
  },
  {
    collection: "favorites",
    timestamps: true,
  }
);

favoritesSchema.index({ user: 1, route: 1 }, { unique: true });

const Favorites = model("Favorites", favoritesSchema);

export default Favorites;
