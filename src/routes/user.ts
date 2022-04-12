import { PrismaClient } from "@prisma/client";
const router = require("express").Router();
import { check, validationResult } from "express-validator";
import bcrypt from "bcrypt";
const { user } = new PrismaClient();

router.get("/", async (req: any, res: any) => {
  const users = await user.findMany({
    select: {
      id: true,
      username: true,
    },
  });
  res.json(users);
});


router.post("/signup",
  [
    check("username", "username must be at least four characters").isLength({
      min: 4,
    }),
    check("password", "Password must be at least six characters").isLength({
      min: 6,
    }),
  ],
  async (req: any, res: any) => {
    const errors = validationResult(req);
    const { username, password } = req.body;
    const passwordHashed = await bcrypt.hash(password,10);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    const addUserIfNotExists = await user.upsert({
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
  }
);

module.exports = router;
