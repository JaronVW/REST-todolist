const router = require("express").Router();
import { check, validationResult } from "express-validator";
import { controller } from "../controllers/user.controller";

router.get("/");

router.post("/signup", [
  check("username", "username must be at least four characters").isLength({
    min: 4,
  }),
  check("password", "Password must be at least six characters").isLength({
    min: 6,
  }),
  controller.addUser,
]);

export { router as userRouter };
