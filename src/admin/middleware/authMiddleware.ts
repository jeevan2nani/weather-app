import { Injectable } from "@nestjs/common";
import { AdminSessionService } from "../admin.sessionService";
import { Request,Response,NextFunction } from "express";

@Injectable()
export class AuthMiddleWare{

    constructor(private readonly adminSessionService:AdminSessionService){}

    use(req:Request,res:Response,next:NextFunction){
        try {
            if(req.session && req.session.user){
                const [userId,email] = req.session.user;
                const actualUser = this.adminSessionService.findAdminSession(userId);
                if(actualUser && actualUser.userId===userId && actualUser.email === email){
                     next();
                }
                else{
                    res.status(401).send('Un-Authorized Session');
                }
            }
            else {
                res.status(401).send('Unauthorized, No Session');
            }
        } catch (error) {
            res.status(401).send('Session error');
        }
    }
}