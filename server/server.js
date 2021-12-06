const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();

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

//route
app.get("/api", (req, res) => {
    res.json({
        data: "You hit json api"
    })
})

// port

const port = process.env.port || 8000

app.listen(port, () => console.log(`Server started on port ${port}`))