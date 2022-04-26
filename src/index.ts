import express from "express";
const app = express();
app.use(express.json());

import { userRouter } from "./routes/user.route"
import { noteRouter } from "./routes/note.route"
import { todoRouter } from "./routes/todo.route"
import { taskRouter } from "./routes/task.route"



const port = process.env.PORT || 5000;
app.get("/", (req: any, res: any) => {
  res.send("<h1> Prisma API</h1>");
});

app.use("/api/users", userRouter);
app.use("/api/notes",noteRouter);
app.use("/api/todos",todoRouter);
app.use("/api/tasks", taskRouter);

app.listen(port, () => {
  console.log(`app live on http://localhost:${port}`);
});
