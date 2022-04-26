import express from "express";
const app = express();
app.use(express.json());

const port = 5000;
app.get("/", (req: any, res: any) => {
  res.send("<h1> Prisma API</h1>");
});

app.use("/api/users", require("./routes/user.route"));
app.use("/api/notes", require("./routes/note.route"));
app.use("/api/todos", require("./routes/todo.route"));
app.use("/api/tasks", require("./routes/task.route"));

app.listen(port, () => {
  console.log(`app live on http://localhost:${port}`);
});
