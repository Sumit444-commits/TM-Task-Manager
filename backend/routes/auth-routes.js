import express from "express";
import { loginSchema, registerSchema } from "../validate/auth-validate.js";
import validate from "../middleware/validate-middleware.js";
import { login, register, user } from "../controllers/auth-controller.js";
import authMiddleware from "../middleware/auth-middleware.js";

const router = express.Router()

router.route("/register").post(validate(registerSchema),register);
router.route("/login").post(validate(loginSchema),login);
router.route("/user").get(authMiddleware,user);

export default router