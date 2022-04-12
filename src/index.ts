
import express from 'express';
const app = express();
app.use(express.json());


const port = 3000;
app.get('/', (req: any, res: any) => {
  res.send("<h1> Prisma API</h1>")
})


app.use('/api/users', require('./routes/user'));
app.use('/api/notes', require('./routes/note'));

app.listen(port, () => {
  console.log(`app live on http://localhost:${port}`)
})
