/**
 * load in environmental variables using dotenv
 * declare environmental variable in config object
 */
import dotenv from "dotenv";
dotenv.config();

interface IEnv {
	port: number;
	environment: string;
	slack: ISlack;
	mongodb: IMongodb;
}

interface ISlack {
	bot_token: string;
	signing_secret: string;
}

interface IMongodb {
	uri: string;
	testUri: string;
	collections: ICollections;
}

interface ICollections {
	interaction: string;
}

const config: IEnv = {
	environment: process.env.NODE_ENV || "development",
	port: Number(process.env.PORT),
	slack: {
		bot_token: process.env.SLACK_BOT_TOKEN!,
		signing_secret: process.env.SLACK_SIGNING_SECRET!,
	},
	mongodb: {
		uri: process.env.MONGO_DB_URI!,
		testUri: process.env.MONGO_DB_TEST!,
		collections: {
			interaction: "interaction",
		},
	},
};

export { config };
