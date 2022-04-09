import { PrismaClient } from "@prisma/client";
const router = require("express").Router();

const { user } = new PrismaClient()

router.get('/', async(req: any,res: any)=>{
    const users = await user.findMany({
        select: {
            id: true,
            username: true
        }
    })
    res.json(users)
});

module.exports = router;