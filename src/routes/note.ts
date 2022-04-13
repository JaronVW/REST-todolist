import { PrismaClient } from "@prisma/client";
const router = require("express").Router();
// import { check, validationResult } from "express-validator";
const { note } = new PrismaClient();

router.post("/", async (req: any, res: any) => {

  try {

    const { userId, title, text } = req.body;

    const createNote = await note.create({
      data: {
        userId,
        title,
        text,
      },
    });
    return res.json({
      response: 200,
      message: "Note added",
    });

  } catch {
    return res.json({
      response: 400,
      message: "Something went wrong with the request",
    });
  }

});

router.get("/", async (req: any, res: any) => {

  try {

    const userId = +req.query.userid;

    if (!userId) {
      return res.json({
        response: 400,
        message: "Missing id query",
      });
    }

    const users = await note.findMany({
      select: {
        id: true,
        userId: true,
        title: true,
        text: true,
        createdDate: true,
      },
      where: {
        userId,
      },
    });
    res.json(users);

  } catch {
    return res.json({
      response: 400,
      message: "Something went wrong with the request",
    });
  }

});

router.put("/edit", async (req: any, res: any) => {

  try {

    const id = +req.query.id;
    const { title, text } = req.body;

    if (!id) {
      return res.json({
        response: 400,
        message: "Missing id query",
      });
    }

    await note.update({
      where: {
        id,
      },
      data: {
        title,
        text,
      },
    });
    return res.json({
      response: 200,
      message: "Note updated",
    });

  } catch {
    return res.json({
      response: 400,
      message: "Something went wrong with the request",
    });
  }

});

module.exports = router;
