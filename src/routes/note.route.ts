const router = require("express").Router();
import { controller } from "../controllers/note.controller";

router.post("/", controller.addUser);

router.get("/", controller.getUser);

router.put("/edit", controller.editUser);

router.delete("/delete", controller.deleteUser);

export { router as noteRouter } 
