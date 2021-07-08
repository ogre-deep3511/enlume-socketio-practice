const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const server = require('http').createServer(app);
const io = require('socket.io')(server, { cors: { origin: "*" }})
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const routesUrls = require('./routes/routes');
const cors = require('cors');
dotenv.config();



mongoose.connect(process.env.DATABASE,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    }).then(() => {
        console.log("Database connected successfully!!!");
});

app.use(express.json());
app.use(cors());
app.use('/app', routesUrls);

io.on('connection', (socket) => {
    socket.on('data', ({fullName, username, email, password}) => {
        io.emit('data', {fullName, username, email, password});
    })
});

app.listen(4000, () => console.log("Server is up and running!!!"));