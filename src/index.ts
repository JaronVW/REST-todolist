
import express from 'express';
const app = express();
app.use(express.json());


const port = 3000;
app.get('/', (req: any, res: any) => {
  res.send("<h1> Prisma API</h1>")
})


app.use('/api/user', require('./routes/user'));

app.listen(port, () => {
  console.log(`app live on http://localhost:${port}`)
})
