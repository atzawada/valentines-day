import { Request, Response } from "express";
import AWS from 'aws-sdk';
import fs from 'fs';

export class MessageController {
    private messages: Array<string>;

    constructor() {
        this.messages = fs.readFileSync(process.env.MESSAGE_LIST_LOCATION || "").toString().split("\n");

        this.sendMessage = this.sendMessage.bind(this);
        this.healthCheck = this.healthCheck.bind(this);
    }

    async sendMessage(request: Request, response: Response) {
        if (request.body.password !== process.env.SUPER_SECRET_PASSWORD) {
            response.status(401).send();
            return;
        }

        console.log("Sending message to " + process.env.MESSAGE_DESTINATION);
        
        let index = Math.floor(Math.random() * this.messages.length);
        let msg = this.messages[index];
        console.log("Sending selected message at index " + index + ": " + msg);

        if (!msg) {
            msg = this.messages[0];
        }

        var params = {
            Message: this.messages[index], /* required */
            PhoneNumber: process.env.MESSAGE_DESTINATION
        };
        
        try {
            await new AWS.SNS({apiVersion: '2010-03-31'}).publish(params).promise();
            response.status(200).send();
        } catch (e) {
            console.log(e);
            response.status(500).send();
        }
    }

    healthCheck(request: Request, response: Response) {
        response.status(200).send();
    }
}