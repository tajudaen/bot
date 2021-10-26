/**
 * load in environmental variables using dotenv
 * declare environmental variable in config object
 */
import dotenv from "dotenv";
dotenv.config();

interface IEnv {
	port: number;
	environment: string;
}

const config: IEnv = {
	environment: process.env.NODE_ENV || "development",
	port: Number(process.env.PORT),
};

export { config };
