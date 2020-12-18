const sql = require("./db.connection.js");

// constructor
const UserModel = function(user) {
	this.email = user.email;
	this.name = user.name;
	this.active = user.active;
};

UserModel.create = (newUser, result) => {
	sql.query("INSERT INTO users SET ?", newUser, (err, res) => {
		if (err) {
			console.log("Something went wrong", err);
			result(err, null);
			return;
		}
		console.log("created user: ", { id: res.insertId, ...newUser });
		result(null, { id: res.insertId, ...newUser });
	});
};

module.exports = UserModel;
