import { Schema, model } from "mongoose";

const usersSchema = new Schema(
  {
    googleId: String,
    name: {
      type: String,
    },
    surname: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true, // removes white spaces
    },
    age: {
      type: Number,
      minLenght: 1,
      maxLenght: 3,
      type: String,
    },
    password: {
      type: String,
      select: false, // the password will not be returned
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    avatar: {
      type: String,
    },
    approved: Boolean,
    verifiedAt: Date,
  },
  {
    collection: "users",
  }
);

const Users = model("Users", usersSchema);

export default Users;