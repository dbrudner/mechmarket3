const { forwardTo } = require("prisma-binding");

const Query = {
	keyboards: forwardTo("db"),
	keyboard: forwardTo("db")
	// async items(parent, args, ctx, info) {
	//   console.log('Getting Items!!');
	//   const items = await ctx.db.query.items();
	//   return items;
	// },
};

module.exports = Query;
