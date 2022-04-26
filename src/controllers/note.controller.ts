import { PrismaClient } from "@prisma/client";
const { note } = new PrismaClient();

const controller = {
  addUser: async (req: any, res: any) => {
    try {
      const { userId, title, text } = req.body;

      await note.create({
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
  },

  getUser: async (req: any, res: any) => {
    try {
      const userId = +req.query.id;

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
  },
  editUser: async (req: any, res: any) => {
    try {
      const id = +req.query.id;
      const { title, text } = req.body;
  
      if (!id) {
        return res.status(400).send({
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
      return res.status(200).send({
        message: "note edited",
      });
    } catch {
      return res.status(400).send({
        message: "Something went wrong",
      });
    }
  },
  deleteUser: async (req: any, res: any) => {
    try {
      const id = +req.query.id;
  
      if (!id) {
        return res.status(400).send({
          message: "Missing id query",
        });
      }
  
      await note.delete({
        where: {
          id,
        },
      });
      return res.status(200).send({
        message: "note deleted",
      });
    } catch {
      return res.status(400).send({
        message: "Something went wrong",
      });
    }
  }
};

export { controller };
