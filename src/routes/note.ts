import { PrismaClient, User } from "@prisma/client";
const router = require("express").Router();
import { check, validationResult } from "express-validator";
const { note } = new PrismaClient();


router.post("/", async (req: any, res: any) => {
  const { userId, title, text } = req.body;

  const createNote = await note.create({
    data: {
      userId,
      title,
      text,
    },
  });
  res.json(createNote);
});

module.exports = router;
