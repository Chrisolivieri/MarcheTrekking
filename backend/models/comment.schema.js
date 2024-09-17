import { Schema, SchemaType, model } from "mongoose";

const commentSchema = new Schema(
  {
    author: {
      type: Schema.Types.ObjectId,
      ref: "Users",
    },
    content: {
      type: String,
      minLenght: 1,
      maxLenght: 300,
      trim: true,
    },
    trekkigRoutes: {
      type: Schema.Types.ObjectId,
      ref: "TrekkigRoutes",
    },
  },
  {
    collection: "comments",
    timestamps: true, // add createdAt and updatedAt
  }
);

const Comments = model("Comments", commentSchema);

export default Comments;
