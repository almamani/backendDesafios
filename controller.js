import mongoose from "mongoose";

export function DBConnect(cb) {
  mongoose.connect(
    "mongodb+srv://almamani:nodejs2022@cluster0.fl6igxt.mongodb.net/ecommerce?retryWrites=true&w=majority",
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
  email: String,
});
