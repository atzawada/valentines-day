import express from "express";
import cors from 'cors';
import morgan from 'morgan';
import { MessageRouter } from './router/MessageRouter'

export const app = express();

app.use(cors({
    credentials: true,
    origin: process.env.FRONTEND_URL
  }));

app.use(express.json());

app.use(morgan("dev"));

app.use((err, req, res, next) => {
  res.status(500).send(err);
});

app.use('/', MessageRouter);