// Types

import {Request, Response, NextFunction} from "express";



// Functions

export function repairRequest(req: Request, res: Response, next: NextFunction){
    const split = req.url.split("?");
    req.baseUrl = split[0];
    next();
}