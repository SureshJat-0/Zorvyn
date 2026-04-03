import app from "./app.js";
import connectDB from "./config/db.js";

connectDB("mongodb://127.0.0.1:27017/zorvyn");

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server started at port : ${process.env.PORT || 3000}`);
});
