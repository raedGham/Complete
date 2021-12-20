const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');

// to use all routes in the routes folder
const { readdirSync } = require("fs")


require('dotenv').config();

// import routes

const authRoutes = require("./routes/auth");

const app = express();

// database 

mongoose.connect(process.env.DATABASE, {
  useNewUrlParser: true,
}).then(() => console.log("DB CONNECTED"))
  .catch((error) => console.log("DB CONNECTION FAILED", error))

// middlewares
app.use(morgan("Dev"));
app.use(bodyParser.json({ limit: "2mb" }));
app.use(cors());



// to use all routes in a routes folder applying middleware
readdirSync("./routes").map((r) => app.use("/api", require("./routes/" + r)));

// port

const port = process.env.port || 8000

app.listen(port, () => console.log(`Server started on port ${port}`))