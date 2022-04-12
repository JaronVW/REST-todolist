import { PrismaClient } from "@prisma/client";
const router = require("express").Router();
import { check, validationResult } from "express-validator";
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



router.post(
  "/",
  [    
    check("username","username must be at least six characters").isLength({
        min: 6,
    }),
    check("password", "Password must be at least six characters").isLength({
      min: 6,
    }),

  ],
  async (req: any, res: any) => {
    const errors = validationResult(req);
    const { username, password } = req.body;

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
        password,
      },
    });
    return res.json({
        "response": 200,
        "message": "user added"
    });
  }
);

module.exports = router;
