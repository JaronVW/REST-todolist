import { PrismaClient } from "@prisma/client";
const router = require("express").Router();
import { check, validationResult } from "express-validator";
import bcrypt from "bcrypt";
const { user } = new PrismaClient();


router.get("/", async (req: any, res: any) => {
  try {
    const users = await user.findMany({
      select: {
        id: true,
        username: true,
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

router.post(
  "/signup",
  [
    check("username", "username must be at least four characters").isLength({
      min: 4,
    }),
    check("password", "Password must be at least six characters").isLength({
      min: 6,
    }),
  ],
  async (req: any, res: any) => {
    try {
      const errors = validationResult(req);
      const { username, password } = req.body;
      const passwordHashed = await bcrypt.hash(password, 10);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
        });
      }

      const userExists = await user.findUnique({
        where: { username },
        select: {
          id: true,
          username: true,
        },
      });

      if (userExists) {
        res.json({
          response: 400,
          message: "User already exists",
        });
      }

      await user.upsert({
        where: {
          username,
        },
        update: {},
        create: {
          username,
          password: passwordHashed,
        },
      });
      return res.json({
        response: 200,
        message: "User added",
      });
    } catch {
      return res.json({
        response: 400,
        message: "Something went wrong with the request",
      });
    }
  }
);

module.exports = router;
