import express from "express";
import mongoose from "mongoose";
import "dotenv/config";
import morgan from "morgan";
import helment from "helmet";
import usersRoutes from "./routes/usersRoutes.js";
import trekkingRoutes from "./routes/trekkingRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import cors from "cors";
import  endpoints from "express-list-endpoints";
import passport from "passport";
import googleStrategy from "./config/passport.config.js";

const port = process.env.PORT || 5000;
const host = process.env.HOST 
const server = express();

passport.use("google", googleStrategy);

await mongoose.connect(process.env.MONGODB_CONNECTION_URI).then(() => {
  console.log("MongoDB connected");
}).catch((err) => {
  console.log(err);
})

server.use(morgan("dev")); //log requests to the console
server.use(helment()); //set security HTTP headers
server.use(express.json()); // parse json request
server.use(cors()); 

server.use("/users", usersRoutes)
server.use("/trekkingRoutes", trekkingRoutes)
server.use("/", authRoutes)

server.listen(port, () =>{
  console.log(`Server running on ${host}:${port}`);
 // console.table(endpoints(server))
})