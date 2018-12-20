const nodemailer = require("nodemailer");

const transport = nodemailer.createTransport({
	host: process.env.MAIL_HOST,
	port: process.env.MAIL_PORT,
	auth: {
		user: process.env.MAIL_USER,
		pass: process.env.MAIL_PASS
	}
});

const email = text => `
	<p style="color: red">{text}</p>
`;

exports.transport = transport;
exports.email = email;
