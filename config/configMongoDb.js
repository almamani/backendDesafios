import mongoose from "mongoose";

import * as dotenv from "dotenv";
dotenv.config();

const db_user = process.env.DB_USER_MONGO;
const db_pass = process.env.DB_PASS_MONGO;
const db_name = process.env.DB_NAME_MONGO;

export function DBConnect(cb) {
  mongoose.connect(
    "mongodb://127.0.0.1:27017/ecommerce",
    { useNewUrlParser: true },
    (err) => {
      console.log("conectados!");
      if (err) {
        console.log(err);
      }
      cb();
    }
  );
}

export const Users = mongoose.model("users", {
  username: String,
  password: String,
  name: String,
  address: String,
  age: String,
  imgUrl: String,
  phone: String,
});
