import { Router } from "express";
import { MessageController } from "../controller/MessageController";

export const MessageRouter = Router();
const messageController = new MessageController;

MessageRouter.post("/send", messageController.sendMessage);
MessageRouter.get("/ping", messageController.healthCheck); 