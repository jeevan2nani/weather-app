import { Injectable } from "@nestjs/common";

@Injectable()
export class AdminSessionService{

    private adminSession = [];

    addAdminSession(userId:Number, email:string){
        this.adminSession.push({userId,email});
    }
    findAdminSession(userId:Number){
        return this.adminSession.find(admin => admin.userId===userId);
    }
    deleteAdminSession(userId:Number){
        const index = this.adminSession.findIndex(admin => admin.userId === userId);
        if(index !== -1){
            this.adminSession.splice(index,1);
        }
    }
}