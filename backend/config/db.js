/** @format */

import mongoose from "mongoose";
import { ENV_VARS } from "./enVars.js";
export const connectDB = async () => {
	try {
		const conn = await mongoose.connect(ENV_VARS.MONGO_URI);
		console.log("MongoDB connected : " + conn.connection.host);
	} catch (error) {
		console.error("MongoDB connection error:", error);
		process.exit(1);
	}
};
