import { Document, Model, model, Schema } from "mongoose";
import { config } from "../config/config";

export interface InteractionDoc extends Document {
	id: string;
	user: object;
	interaction: object;
}

const interactionSchema = new Schema(
	{
		id: {
			type: String,
			unique: true,
			required: true,
		},
		user: {
			type: Object,
			required: true,
		},
		interaction: {
			question: {
				type: String,
			},
			answer: [
				{
					type: String,
				},
			],
		},

		isDeleted: {
			type: Boolean,
			default: false,
		},
	},
	{
		timestamps: true,
	}
);

interactionSchema.methods.toJSON = function () {
	const obj = this.toObject();
	delete obj._id;
	delete obj.__v;
	return obj;
};

export const InteractionModel: Model<InteractionDoc> = model<InteractionDoc>(
	config.mongodb.collections.interaction,
	interactionSchema
);
