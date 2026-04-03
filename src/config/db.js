import mongoose from "mongoose";

export default function connectDB(url) {
  mongoose
    .connect(url)
    .then(() => console.log("Database connected"))
    .catch((err) => console.log("Database connection error.\n", err));
}
