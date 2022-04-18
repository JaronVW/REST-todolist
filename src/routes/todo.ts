import { PrismaClient } from "@prisma/client";
const router = require("express").Router();
import { check, validationResult } from "express-validator";
const { todo } = new PrismaClient();

router.get("/", async (req: any, res: any) => {
  try {
    const userId = +req.query.id;

    if (!userId) {
      return res.json({
        response: 400,
        message: "Missing id query",
      });
    }

    const todos = await todo.findMany({
      select: {
        id: true,
        userId: true,
        completed: true,
        title: true,
        description: true,
        tasks: true,
        dueDate: true,
        createdDate: true,
      },
      where: {
        userId,
      },
    });
    res.json(todos);
  } catch {
    return res.json({
      response: 400,
      message: "Something went wrong with the request",
    });
  }
});

router.post("/", async (req: any, res: any) => {
  try {
    const { userId, completed, title, description, dueDate, createdDate } =
      req.body;

    await todo.create({
      data: {
        userId,
        completed,
        title,
        description,
        dueDate,
        createdDate,
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

router.put("/edit", async (req: any, res: any) => {
  try {
    const id = +req.query.id;
    const { completed, title, description, dueDate, createdDate } = req.body;

    if (!id) {
      return res.status(400).send({
        message: "Missing id query",
      });
    }

    await todo.update({
      where: {
        id,
      },
      data: {
        completed,
        title,
        description,
        dueDate,
        createdDate,
      },
    });
    return res.status(200).send({
      message: "note edited",
    });
  } catch {
    return res.status(400).send({
      message: "Something went wrong",
    });
  }
});

router.delete("/delete", async (req: any, res: any) => {
  try {
    const id = +req.query.id;

    if (!id) {
      return res.status(400).send({
        message: "Missing id query",
      });
    }

    await todo.delete({
      where: {
        id,
      },
    });
    return res.status(200).send({
      message: "Todo deleted",
    });
  } catch {
    return res.status(400).send({
      message: "Something went wrong",
    });
  }
});

module.exports = router;
