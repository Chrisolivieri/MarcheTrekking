import { Schema, model } from "mongoose";

const trekkigRoutesSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    distance: {
      type: Number,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    heightDifference: {
      type: Number,
      required: true,
    },
    difficulty: {
      type: String,
      required: true,
    },
    startLat: {
      type: Number,
    },
    endLat: {
      type: Number,
    },
    startLng: {
      type: Number,
    },
    endLng: {
      type: Number,
    },

  },
  {
    collection: "trekkigRoutes",
  }
);

const TrekkigRoutes = model("TrekkigRoutes", trekkigRoutesSchema);

export default TrekkigRoutes;
