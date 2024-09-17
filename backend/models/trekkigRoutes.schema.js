import {Schema, model} from "mongoose";

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
        position : {
            type: [Number], // [longitude, latitude]
            required: true
        }
    },
    {
        collection: "trekkigRoutes",
    }
);

const TrekkigRoutes = model("TrekkigRoutes", trekkigRoutesSchema);

export default TrekkigRoutes