import { Request, Response } from "express";

export class MessageController {
    constructor() {
        this.sendMessage = this.sendMessage.bind(this);
    }

    async sendMessage(request: Request, response: Response) {
        
    }
}