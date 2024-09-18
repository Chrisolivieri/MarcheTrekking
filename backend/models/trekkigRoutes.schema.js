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
    position: {
      type: [Number, Number], // [longitude, latitude]
    },
  },
  {
    collection: "trekkigRoutes",
  }
);

const TrekkigRoutes = model("TrekkigRoutes", trekkigRoutesSchema);

export default TrekkigRoutes;
