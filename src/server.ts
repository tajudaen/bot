import { app } from "./app";
import { config } from "./config/config";

// Start Server
app.listen(config.port, () =>
	console.info(`🤖 server listening on port - ${config.port}`)
);
