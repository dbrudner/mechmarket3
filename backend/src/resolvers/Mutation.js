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
	}
};

module.exports = Mutations;
