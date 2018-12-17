// let's go!
require("dotenv").config({ path: "variables.env" });
const createServer = require("./create-server");
const db = require("./db");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");

const server = createServer();

server.express.use(cookieParser());

server.express.use((req, res, next) => {
	const { token } = req.cookies;

	if (token) {
		const { userId } = jwt.verify(token, process.env.APP_SECRET);
		req.userId = userId;
	}

	next();
});

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
