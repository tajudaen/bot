/**
 * InteractionService object.
 */
import { InteractionModel } from "../models/interaction";

const InteractionService = {
	async createInteraction(data: any) {
		const interaction = new InteractionModel(data);
		await interaction.save();

		return interaction;
	},

	async updateInteraction(query: any, data: any) {
		return InteractionModel.findOneAndUpdate(query, data);
	},

	async getInteractions() {
		return InteractionModel.find();
	},
};

export default InteractionService;
