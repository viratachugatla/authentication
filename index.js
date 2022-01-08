const express = require("express");
const app = express();
const mongoose = require("mongoose");

// importing routes
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts")

// connect to db
mongoose.connect("mongodb+srv://viratasn:viratasn@cluster0.8ntux.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", () => {
  console.log("connected to db");
});

// Middleware
app.use(express.json())

// route middlewares
app.use("/api/user", authRoute);
app.use("/api/posts",postRoute)

app.listen(3001, () => console.log("started"));
