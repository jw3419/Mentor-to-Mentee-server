require("dotenv").config();
const fs = require('fs');
const https = require('https');
const cors = require("cors");
const cookieParser = require("cookie-parser");
const privateKey = fs.readFileSync(__dirname + "/key.pem", "utf8");
const certificate = fs.readFileSync(__dirname + "/cert.pem", "utf8");
const credentials = { key: privateKey, cert: certificate };

const express = require('express');
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
        origin: ["https://localhost:3000"],
        credentials: true,
        methods: ["GET", "POST", "OPTIONS"],
    })
);

const router = require('./routes/route');
app.use('/', router)



const HTTPS_PORT = process.env.HTTPS_PORT || 4000;
const httpsServer = https.createServer(credentials, app);
httpsServer.listen(HTTPS_PORT, () => { console.log("server runnning ", HTTPS_PORT) });
module.exports = httpsServer;