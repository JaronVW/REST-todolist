import { PrismaClient } from "@prisma/client";
const router = require("express").Router();
const { task } = new PrismaClient();

router.post("/", async (req: any, res: any) => {
  try {
    const todoID = +req.query.id;

    if (!todoID) {
      return res.json({
        response: 400,
        message: "Missing id query",
      });
    }

    const { text } = req.body;

    await task.create({
      data: {
        todoID,
        text,
      },
    });
    return res.json({
      response: 200,
      message: "Task added to Todo",
    });
  } catch {
    return res.json({
      response: 400,
      message: "Something went wrong with the request",
    });
  }
});

router.put("/edit", async (req: any, res: any) => {
  try {
    const taskID = +req.query.id;
    const { text } = req.body;

    if (!taskID) {
      return res.json({
        response: 400,
        message: "Missing id query",
      });
    }

    await task.update({
      where: {
        id: taskID,
      },
      data: {
        text,
      },
    });
    return res.json({
      response: 200,
      message: "task updated",
    });
  } catch {
    return res.json({
      response: 400,
      message: "Something went wrong with the request",
    });
  }
});

module.exports = router;
