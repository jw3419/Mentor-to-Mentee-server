require("dotenv").config();
const https = require('https');
const fs = require('fs');
const cors = require("cors");
const cookieParser = require("cookie-parser");
//cert.pem랑 key.pem은 배포할 때 경로 맞춰줍시다.
const privateKey = fs.readFileSync(__dirname + "/../../key.pem", "utf8");
const certificate = fs.readFileSync(__dirname + "/../../cert.pem", "utf8");
const credentials = { key: privateKey, cert: certificate };

const express = require('express');
const app = express();

const router = require('./routes/route');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
    cors({
        origin: ["http://localhost:3000"],
        credentials: true,
        methods: ["GET", "POST", "OPTIONS"],
    })
)
app.use(cookieParser());
app.use('/', router)

const HTTPS_PORT = process.env.HTTPS_PORT || 4000;
const httpsServer = https.createServer(credentials, app);

httpsServer.listen(HTTPS_PORT, () => {
    console.log("server runnning ", HTTPS_PORT)
});

module.exports = httpsServer;