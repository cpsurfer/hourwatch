/** @format */

import jwt from "jsonwebtoken";
import { User } from "../models/user.models.js";
import { ENV_VARS } from "../config/enVars.js";

export const protectRoute = async (req, res, next) => {
	try {
		const token = req.cookies["jwt-netflix"];

		if (!token) {
			return res
				.status(401)
				.json({ success: false, message: "Unauthorized - No Token Provided" });
		}

		const decoded = jwt.verify(token, ENV_VARS.JWT_SECRET);

		if (!decoded || !decoded.id) {
			return res
				.status(401)
				.json({ success: false, message: "Unauthorized - Invalid Token" });
		}

		const user = await User.findById(decoded.id).select("-password");

		if (!user) {
			return res
				.status(404)
				.json({ success: false, message: "User not found" });
		}

		req.user = user;
		next();
	} catch (error) {
		console.log("Error in protectRoute middleware: ", error.message);
		res.status(500).json({ success: false, message: "Internal Server Error" });
	}
};
