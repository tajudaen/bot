import { Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import crypto from "crypto";
import qs from "qs";
import { config } from "../config/config";

export const verifyRequest = (req: any, res: Response, next: NextFunction) => {
	try {
		const signature = req.headers["x-slack-signature"];
		const timestamp = req.headers["x-slack-request-timestamp"];
		const requestBody = qs.stringify(req.body, { format: "RFC1738" });

		const [version, hash] = signature.split("=");
		const hmac = crypto
			.createHmac("sha256", config.slack.signing_secret)
			.update(`${version}:${timestamp}:${requestBody}`, "utf8")
			.digest("hex");

		if (hmac != hash)
			return res
				.status(StatusCodes.UNAUTHORIZED)
				.send({ message: "access denied" });

		next();
	} catch (error) {
		console.log(error);
		return res
			.status(StatusCodes.INTERNAL_SERVER_ERROR)
			.send({ message: "internal_server_error" });
	}
};
