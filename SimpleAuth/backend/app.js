const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
app.use(express.json());

const signup_route = require("./routes/signup-route.js");
const login_route = require("./routes/login-route.js");
app.use(cors());
mongoose.connect(process.env.MONGODB_URI);
app.use("/api/signup", signup_route);
app.use("/api/login", login_route);

app.listen(process.env.PORT);
