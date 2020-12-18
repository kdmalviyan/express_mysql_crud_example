const UserModel = require("../models/user.model.js");
var pdf = require("pdf-creator-node");
var fs = require('fs');

// Create and Save a new User
exports.create = (req, res) => {
	// Validate request
	if (!req.body) {
		res.status(400).send({
			message: "Content can not be empty!"
		});
	}

	// Create a User
	const user = new UserModel({
		email: req.body.email,
		name: req.body.name,
		active: req.body.active
	});

	// Save User in the database
	UserModel.create(user, (err, data) => {
		if (err)
			res.status(500).send({
				message:
					err.message || "Some error occurred while creating the User."
			});
		else res.send(data);
	});
};

exports.createPdf = (req, res) => {
	// Read HTML Template
	var html = fs.readFileSync('template.html', 'utf8');

	var options = {
		format: "A3",
		orientation: "portrait",
		border: "10mm",
		header: {
			height: "45mm",
			contents: '<div style="text-align: center;">Author: Shyam Hajare</div>'
		},
		"footer": {
			"height": "28mm",
			"contents": {
				first: 'Cover page',
				2: 'Second page', // Any page number is working. 1-based index
				default: '<span style="color: #444;">{{page}}</span>/<span>{{pages}}</span>', // fallback value
				last: 'Last Page'
			}
		}
	}
	var users = [
		{
			name: "Shyam",
			age: "26"
		},
		{
			name: "Navjot",
			age: "26"
		},
		{
			name: "Vitthal",
			age: "26"
		}
	]
	var document = {
		html: html,
		data: {
			users: users
		},
		path: "./output.pdf"
	};

	pdf.create(document, options)
		.then(res => {
			console.log(res)
		})
		.catch(error => {
			console.error(error)
		});
		res.send({"message": "Request Submitted"});
}
