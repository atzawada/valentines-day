import dotenv from 'dotenv';
dotenv.config();

import http from 'http';
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

const PORT = process.env.PORT || "4000";
app.set("port", PORT);

let server = http.createServer(app);

process.on("SIGINT", () => {
	console.log("\nSIGINT signal received.");
	console.log("Closing server.");

	server.close(() => {
		console.log("Server closed.");
		process.exit(0);
	});

});

function onListening(): void {
    const addr = server.address();
    // @ts-ignore
	const bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
	console.log("Listening on " + bind);
}

server.listen(PORT);
server.timeout = 5000;
server.on("listening", onListening);
console.log("Back-end is up and running!");
console.log(`Listening on Port Number ${PORT}!\n`);