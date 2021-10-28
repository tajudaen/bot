import { app } from "./app";
import { config } from "./config/config";
import { connectDB } from "./database/db";

// Start Server
app.listen(config.port, () => {
	connectDB();
	console.info(`🤖 server listening on port - ${config.port}`);
});
