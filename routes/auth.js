import express from "express";
import { createUser, login } from "../controllers/auth.js";
const authRoute = express.Router();

authRoute.post("/register", createUser)

authRoute.post("/login", login)

export default authRoute
