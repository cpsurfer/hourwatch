/** @format */

import jwt from "jsonwebtoken";
import { ENV_VARS } from "../config/enVars.js";
export const generateTokenAndSetCookie = (userId, res) => {
	const token = jwt.sign({ id: userId }, ENV_VARS.JWT_SECRET, {
		expiresIn: "30d",
	});
	res.cookie("jwt-netflix", token, {
		httpOnly: true, // prevents xss attacks cross-site scripting attacks
		sameSite: "strict", // prevents CSRF attacks cross-site request forgery attacks
		maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
		secure: ENV_VARS.NODE_ENV !== "development", // set to true if using https
	});
	return token;
};
