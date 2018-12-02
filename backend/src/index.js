// let's go!
require("dotenv").config({ path: "variables.env" });
const createServer = require("./create-server");
const db = require("./db");

const server = createServer();

server.start(
	{
		cors: {
			credentials: true,
			origin: process.env.FRONTEND_URL
		}
	},
	({ port }) => {
		console.log(`running on ${port}`);
	}
);
