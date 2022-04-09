import express = require('express')
import { start } from 'repl'

const app = express()

const port: number = 3000

app.listen(port,() => {
    console.log(`started on http://localhost:${port}`)
})