const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const customError = require("./utils/error.js");
const userRoutes = require("./routes/user.js");
const postRoutes = require("./routes/post.js");
const DB_CONNECTION_URL =
  process.env.DATABASE_CONNECTION_URL || "mongodb://127.0.0.1:27017/memories";
const PORT = process.env.PORT || 5000;

const app = express();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/dist/")));
  app.use(
    cors({
      credentials: true,
    })
  );
} else {
  app.use(
    cors({
      origin: ["http://localhost:3000", "http://localhost:5000"],
      credentials: true,
    })
  );
}

app.use(cookieParser());
app.use(express.json());
app.use("/api/user", userRoutes);
app.use("/api/posts", postRoutes);

// create connection to mongoose
mongoose
  .connect(DB_CONNECTION_URL)
  .then(() => console.log("Database Connected"))
  .catch((error) => {
    console.log("MongoDB Connection Error\n", error);
  });

// Production code
if (process.env.NODE_ENV === "production") {
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/dist/index.html"));
  });
}

// handle request that does not match any routes
app.all("*", (req, res, next) => {
  next(new customError("Not Found", 404));
});

// handle errors
app.use((err, req, res, next) => {
  console.log(`ERROR:\nat:${err.at}\n`, err);
  if (!err.statusCode) err.statusCode = 500;
  if (!err.message) err.message = "Something went wrong";
  res.status(err.statusCode).json({ error: err.message });
});

app.listen(PORT, () => {
  console.log(`Server listening on PORT ${PORT}`);
});
