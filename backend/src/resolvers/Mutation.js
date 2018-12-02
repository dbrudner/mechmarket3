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

		console.log(keyboard);

		return keyboard;
	}
};

module.exports = Mutations;
