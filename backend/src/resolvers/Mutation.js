const mutations = {
	async createItem(parent, args, tx, info) {
		const item = await ctx.db.mutation.createItem(
			{ data: { ...args } },
			info
		);
		return item;
	}
};

module.exports = mutations;
