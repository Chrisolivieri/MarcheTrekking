import { Schema, model } from "mongoose";

const trekkingRoutesSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    images: {
      type: [String],
      required: true,
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
    coordinates: {
      type: [[Number]],
      required: true,
    },
    start: {
      type: [Number],
      required: true,
    },
    end: {
      type: [Number],
      required: true,
    },
  },
  {
    collection: "trekkingRoutes",
  }
);

const TrekkingRoutes = model("TrekkingRoutes", trekkingRoutesSchema);

export default TrekkingRoutes;
