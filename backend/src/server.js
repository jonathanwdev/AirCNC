import express from "express";
import routes from "./routes";
import mongoose from "mongoose";
import cors from "cors";
import path from "path";

import socketio from 'socket.io';
import http from 'http';

const app = express();
const server = http.Server(app);
const io = socketio(server);


mongoose.connect(
  "mongodb+srv://root:root@cluster0-quzgd.mongodb.net/aircnc?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);

const connectedUsers = {};

io.on('connection', socket => {
  const { user_id } = socket.handshake.query;

  connectedUsers[user_id] = socket.id;
});

app.use((req,res, next)=>{
  req.io = io;
  req.connectedUsers = connectedUsers;
  return next();
});


app.use(cors());
app.use(express.json());
app.use(
  "/files",
  express.static(path.resolve(__dirname, "..", "tmp", "uploads"))
);
app.use(routes);
server.listen(3333);



   

