/** @format */

import express from "express";
import cookieParser from "cookie-parser";
import authroutes from "./routes/auth.routes.js";
import dotenv from "dotenv";
import { ENV_VARS } from "./config/enVars.js";
import { connectDB } from "./config/db.js";
import movieRoutes from "./routes/movie.routes.js";
import tvRoutes from "./routes/tv.routes.js";
import { protectRoute } from "./middleware/protectRoute.js";
import searchRoutes from "./routes/search.routes.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());
app.use("/api/v1/auth", authroutes);
app.use("/api/v1/movie", protectRoute, movieRoutes);
app.use("/api/v1/tv", protectRoute, tvRoutes);
app.use("api/v1/search", protectRoute, searchRoutes);

app.get("/", (req, res) => {
	res.send("API is running");
});

app.listen(PORT, () => {
	console.log("Server started at http://localhost:" + PORT);
	connectDB();
});
