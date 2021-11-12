require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const port = 5000;
const noteRouter = require('./routes/note');
const userRouter = require('./routes/user');
const verifyToken = require('../backend/middleware/verifytoken').verifyToken;

//cors
app.use(
    cors({
        origin: ["http://localhost:3000"],
        methods: ["GET", "POST"],
        credentials: true
    })
);

// parsing the incoming data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//serving public file
app.use(express.static(__dirname));
app.use('/note', noteRouter);
app.use('/user', userRouter);
app.use(verifyToken);


//mongo
const uri = "mongodb+srv://mor15:1515@nitzandb.46v9b.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true});
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully.");
});
//port
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});