import express, { Application, Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";
import { StatusCodes } from "http-status-codes";

// Init express
const app: Application = express();

app.disable("x-powered-by");

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
	return res.status(StatusCodes.OK).send({});
});

// handle errors
app.all("/*", (req: Request, res: Response) => {
	return res.send(StatusCodes.NOT_FOUND).send({
		message: "not_found",
	});
});

app.use((err: any, req: Request, res: Response) => {
	return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
		message: err.message,
	});
});

export { app };
