module.exports = app => {
	const users = require("../controllers/user.controller.js");

	// Create a new Customer
	app.post("/users", users.create);

	app.get("/users/pdf", users.createPdf);
};
