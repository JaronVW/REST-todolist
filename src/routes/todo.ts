import { PrismaClient } from "@prisma/client";
const router = require("express").Router();
import { check, validationResult } from "express-validator";
const { todo } = new PrismaClient();


module.exports = router;
