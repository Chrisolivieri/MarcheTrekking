import express from "express";
import mongoose from "mongoose";
import "dotenv/config";
import morgan from "morgan";
import helment from "helmet";

const port = process.env.PORT || 5000;
const host = process.env.HOST 
const server = express();

await mongoose.connect(process.env.MONGODB_CONNECTION_URI).then(() => {
  console.log("MongoDB connected");
}).catch((err) => {
  console.log(err);
})

server.use(morgan("dev")); //log requests to the console
server.use(helment()); //set security HTTP headers
server.use(express.json()); // parse json request

server.listen(port, () =>{
  console.log(`Server running on ${host}:${port}`);
})