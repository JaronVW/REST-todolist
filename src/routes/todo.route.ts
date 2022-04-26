
const router = require("express").Router();

import { controller } from "../controllers/todo.controller";


router.get("/", controller.getTodosById);

router.post("/", controller.addTodo );

router.put("/edit", controller.editTodo );

router.delete("/delete", controller.deleteTodo );

export { router as todoRouter }
