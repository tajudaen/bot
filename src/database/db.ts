/**
 * Setup mongodb connection using mongoose.
 */
import mongoose from "mongoose";
import { config } from "../config/config";

const URI =
	config.environment === "test" ? config.mongodb.testUri : config.mongodb.uri;

export const connectDB = async () => {
	try {
		await mongoose.connect(URI);

		console.info("MongoDB Connected...");
	} catch (err) {
		console.error(err);
		// Exit process with failure
		process.exit(1);
	}
};
