import bcrypt from "bcrypt";
import config from "../config";

const password = config.ADMIN_PASSWORD as string;
const hash = bcrypt.hashSync(password, 10);

const Admin = [
	{
		_id: "624eb07a3c2dafd2b3cf43eb",
		email: "admin@stroll.com",
		name: "Admin",
		password: hash,
		role: "admin",
	},
];

export default Admin;
