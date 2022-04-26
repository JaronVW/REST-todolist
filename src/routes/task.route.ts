const router = require("express").Router();
import { controller } from "../controllers/task.controller";

router.post("/", controller.addTaskToUser);

router.put("/edit", controller.editTask);

export { router as taskRouter };
