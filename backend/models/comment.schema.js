import { Schema, model } from "mongoose";

const commentSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "Users",
    },
    content: {
      type: String,
      minLenght: 1,
      maxLenght: 300,
      trim: true,
    },
    trekkingRoutes: {
      type: Schema.Types.ObjectId,
      ref: "TrekkingRoutes",
    },
  },
  {
    collection: "comments",
    timestamps: true, // add createdAt and updatedAt
  }
);

const Comments = model("Comments", commentSchema);

export default Comments;
