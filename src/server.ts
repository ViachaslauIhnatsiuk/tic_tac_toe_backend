require('dotenv').config();
import express from 'express';
import http from 'http';
import cors from 'cors';

const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(express.json());

server.listen(process.env.PORT || 4000, () => {
  console.log('Server is runnind on port 4000');
});
