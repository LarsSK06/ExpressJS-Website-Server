// Packages

import express, {Express, Request, Response, NextFunction} from "express";
import cors from "cors";

import * as fs from "fs";

import * as utils from "./utils.ts";
import * as mw from "./middleware.ts";



// Configuration

const app: Express = express();
app.use(express.json());
app.use(cors());

app.use(mw.repairRequest);



// Endpoints

app.get("/", (req: Request, res: Response, next: NextFunction) => {
    if(fs.existsSync(utils.dirs.frontend + "/index.html")){
        return res.status(200).sendFile(utils.dirs.frontend + "/index.html");
    }
    next();
});

app.get("*", (req: Request, res: Response) => {
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

app.all("*", (req: Request, res: Response) => {
    res.status(401).send("This server does not accept any other methods than GET!");
});



// Hosting

app.listen(4000, "0.0.0.0", () => {
    console.log("Server online!");
});