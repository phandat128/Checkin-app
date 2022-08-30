import express from "express"
import http from "http"

import { router } from './api/routes.js'

const app = express()

const server = http.createServer(app)

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept'
    );
    next();
  });

app.use(express.json())
app.use(router)

server.listen(8000, () => {
    console.log(`🚀 Server is running on port 8000 ...`);
})

process.on("SIGINT", () => {
    console.log("🤖 Server closed");
});
