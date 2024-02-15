// Packages

const express = require("express");
const cors = require("cors");
const fs = require("fs");

const utils = require("./utils.js");
const mw = require("./middleware.js");



// Configuration

const app = express();
app.use(express.json());
app.use(cors());

app.use(mw.repairRequest);



// Endpoints

app.get("/", (req, res, next) => {
    if(fs.existsSync(utils.dirs.frontend + "/index.html")){
        return res.status(200).sendFile(utils.dirs.frontend + "/index.html");
    }
    next();
});

app.get("*", (req, res) => {
    if(fs.existsSync(utils.dirs.frontend + req.baseUrl + ".html")){
        return res.status(200).sendFile(utils.dirs.frontend + req.baseUrl + ".html");
    }
    if(fs.existsSync(utils.dirs.frontend + req.baseUrl)){
        return res.status(200).sendFile(utils.dirs.frontend + req.baseUrl);
    }
    if(fs.existsSync(utils.dirs.frontend + "/not-found.html")){
        return res.status(200).sendFile(utils.dirs.frontend + "/not-found.html");
    }
    res.status(404).send("This page could not be found!");
});

app.all("*", (req, res) => {
    res.status(401).send("This server does not accept any other methods than GET!");
});



// Hosting

app.listen(4000, "0.0.0.0", () => {
    console.log("Server online!");
});