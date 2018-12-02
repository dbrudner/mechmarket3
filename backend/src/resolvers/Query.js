const { forwardTo } = require("prisma-binding");

const Query = {
	items: forwardTo("db")
	// async items(parent, arts, ctx, info) {
	// 	return await ctx.db.query.item();
	// }
};

module.exports = Query;
