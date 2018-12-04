const Mutations = {
	async createKeyboard(parent, args, ctx, info) {
		// TODO: Check if they are logged in

		const keyboard = await ctx.db.mutation.createKeyboard(
			{
				data: {
					...args
				}
			},
			info
		);

		return keyboard;
	},

	async updateKeyboard(parent, args, ctx, info) {
		const { id, ...updates } = args;

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
	}
};

module.exports = Mutations;
