import { Request, Response, Router } from "express";
import { StatusCodes } from "http-status-codes";
import { getInteractions, slackBotMessage } from "../controllers";
import { verifyRequest } from "../middlewares";

// Init router and path
const router = Router();

router.post("/messages", verifyRequest, slackBotMessage);
router.get("/interactions", getInteractions);

router.get("/", (req: Request, res: Response) => {
	return res.status(StatusCodes.OK).send(true);
});

// Export the base-router
export default router;
