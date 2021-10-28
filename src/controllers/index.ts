import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { v4 as uuid_v4 } from "uuid";
import InteractionService from "../services/interaction";

export const slackBotMessage = async (req: Request, res: Response) => {
	try {
		let { channel_id, team_id, command, payload } = req.body;

		let response;
		if (command) {
			const id = uuid_v4();
			await InteractionService.createInteraction({
				id,
				user: {
					id: req.body.user_id,
					channel: channel_id,
					team: team_id,
					username: req.body.user_name,
				},
				interaction: { question: "How are you doing?" },
			});
			response = {
				channel: channel_id,
				text: "Welcome. How are you doing?",
				attachments: [
					{
						attachment_type: "default",
						callback_id: id,
						actions: [
							{
								name: "response_select_menu",
								text: "select a response",
								type: "select",
								options: [
									{
										text: "Doing Well",
										value: "doing_well",
									},
									{
										text: "Neutral",
										value: "neutral",
									},
									{
										text: "Feeling Lucky",
										value: "feeling_lucky",
									},
								],
							},
						],
					},
				],
			};
		}

		if ("payload" in req.body) payload = JSON.parse(payload);

		if (!command && payload?.callback_id) {
			InteractionService.updateInteraction(
				{ id: payload.callback_id },
				{
					"interaction.answer": payload?.actions[0]?.selected_options[0].value,
				}
			);

			const id = uuid_v4();
			await InteractionService.createInteraction({
				id,
				user: {
					id: payload.user.id,
					channel: payload.channel.id,
					team: payload.user.team_id,
					username: payload.user.username,
				},
				interaction: { question: "What are your hobbies" },
			});
			response = {
				channel: payload.channel.id,
				attachments: [
					{
						color: "#f2c744",
						blocks: [
							{
								type: "section",
								text: {
									type: "mrkdwn",
									text: "What are your hobbies",
								},
							},
							{
								block_id: id,
								type: "actions",
								elements: [
									{
										type: "checkboxes",
										action_id: id,
										options: [
											{
												text: {
													type: "plain_text",
													text: "Football",
												},
												value: "football",
											},
											{
												text: {
													type: "plain_text",
													text: "Music",
												},
												value: "music",
											},
											{
												text: {
													type: "plain_text",
													text: "Sleep",
												},
												value: "sleep",
											},
											{
												text: {
													type: "plain_text",
													text: "Movies",
												},
												value: "movies",
											},
											{
												text: {
													type: "plain_text",
													text: "Basketball",
												},
												value: "basketball",
											},
										],
									},
									{
										type: "button",
										text: {
											type: "plain_text",
											emoji: true,
											text: "Submit",
										},
										confirm: {
											title: {
												type: "plain_text",
												text: "Are you sure?",
											},
											confirm: {
												type: "plain_text",
												text: "Submit",
											},
											deny: {
												type: "plain_text",
												text: "Stop, I've changed my mind!",
											},
										},
										style: "primary",
										value: "submit_hobbies",
									},
								],
							},
						],
					},
				],
			};
		}

		if (payload?.actions[0].block_id && payload?.actions[0].action_id) {
			InteractionService.updateInteraction(
				{ id: payload.callback_id },
				{
					"interaction.answer": [],
				}
			);
			response = {
				channel: payload.channel.id,
				text: "thank you",
			};
		}

		return res.send(response);
	} catch (error) {
		console.error(error);
		return res
			.status(StatusCodes.INTERNAL_SERVER_ERROR)
			.send({ message: "internal_server_error" });
	}
};

export const getInteractions = async (req: Request, res: Response) => {
	try {
		const interactions = await InteractionService.getInteractions();
		return res.send(interactions);
	} catch (error) {
		console.error(error);
		return res
			.status(StatusCodes.INTERNAL_SERVER_ERROR)
			.send({ message: "internal_server_error" });
	}
};
