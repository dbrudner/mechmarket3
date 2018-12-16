const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Mutations = {
	async createKeyboard(parent, args, ctx, info) {
		// TODO: Check if they are logged in

		const { images, ...keyboardData } = args;

		const keyboard = await ctx.db.mutation.createKeyboard(
			{
				data: {
					...keyboardData,
					images: { set: images }
				}
			},
			info
		);

		return keyboard;
	},

	async updateKeyboard(parent, args, ctx, info) {
		const where = { id: args.id };

		return ctx.db.mutation.updateKeyboard(
			{
				data: {
					...updates
				},
				where: {
					id
				}
			},
			info
		);
	},
	async deleteKeyboard(parent, args, ctx, info) {
		const { id } = args;

		const keyboard = await ctx.db.query.keyboard({ id }, `{id name}`);

		return ctx.db.mutation.deleteKeyboard(
			{
				where: {
					id
				}
			},
			info
		);
	},

	async signup(parent, args, ctx, info) {
		args.email = args.email.toLowerCase();

		const password = await bcrypt.hash(args.password, 10);

		const user = await ctx.db.mutation.createUser(
			{
				data: {
					...args,
					password,
					permissions: {
						set: ["USER"]
					}
				}
			},
			info
		);
		const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);
		ctx.response.cookie("token", token, {
			httpOnly: true,
			maxAge: 1000 * 60 * 60 * 24 * 365
		});
		return user;
	}
};

module.exports = Mutations;
