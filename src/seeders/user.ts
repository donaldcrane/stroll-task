import bcrypt from "bcrypt";

const password = "password";
const hash = bcrypt.hashSync(password, 10);

const User = [
	{
		_id: "624eb07a3c2dafd2b3cf43ea",
		email: "alabi@stroll.com",
		name: "alabi wale",
		password: hash,
		role: "user",
		region: "624eb07a3c2dafd2b3cf4221",
	},
	{
		_id: "624eb07a3c2dafd2b3cf4321",
		email: "garry@stroll.com",
		name: "garry boy",
		password: hash,
		role: "user",
		region: "624eb07a3c2dafd2b3cf4112",
	},
	{
		_id: "624eb07a3c2dafd2b3cf4322",
		email: "dan@stroll.com",
		name: "dan carly",
		password: hash,
		role: "user",
		region: "624eb07a3c2dafd2b3cf4221",
	},
];

export default User;
