import app from "./app.js";
import connectDB from "./config/db.js";

connectDB(process.env.MONGO_URI);

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server started at port : ${process.env.PORT || 3000}`);
});
