const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const taskRoutes = require('./routes/task');

const path = require('path');
const {fileURlToPath} = require("url");

// const __filename = fileURlToPath(import.meta.url)
// const __dirname = path.dirname(__filename)
console.log(__dirname);

const app = express();
const PORT = 8000;

app.use(cors());
app.use(bodyParser.json());

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/tasks', taskRoutes);

// use the client app
app.use(express.static(path.join(__dirname, "/client/build")))

// render client for any path
// app.get("*", (req, res) => {
//     res.sendFile(path.join(__dirname, "/client/build/index.html"))
// });

app.listen(PORT, () => {
    mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
        console.log("database connected");
        console.log('server running at port ', PORT);

    }).catch((err) => {
        console.log('error in db connection', err);
    })
})