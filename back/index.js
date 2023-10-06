const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const signupController = require("./controller/Signup.js");
const signinController = require("./controller/Signin.js");
const todo = require("./controller/todo.js");
// const authenticateToken = require("./authenticateToken");

const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://localhost:27017/todo", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

// Routes
app.use("/api/auth", signupController);
app.use("/api/auth", signinController);
app.use("/api", todo);

// Protected route example using authentication middleware
// app.get("/api/protected", authenticateToken, (req, res) => {
//   // This route is protected and can only be accessed with a valid token
//   res.json({ message: "This is a protected route", user: req.user });
// });

app.listen(4000, () => {
  console.log(`Server is running on port 4000`);
});
