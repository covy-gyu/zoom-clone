import http from "http";
import WebSocket from "ws";
import express from "express";

const app = express();

app.set('view engine', "pug")
app.set("views",__dirname+"/views");
app.use("/public",express.static(__dirname + "/public"));
app.get("/",(_,res)=> res.render("home"));
app.get("/*",(_,res)=> res.redirect("/"));

const handleListen = () => console.log(`Listening on http://localhost:3000`);

const server = http.createServer(app); //프로토콜이 다른 것을 한 서버에서 사용함
const wss = new WebSocket.Server({server}); // ws를 http서버위에 올림

wss.on("connection",(socket)=>{
    console.log("Connected to Browser ✅");
    socket.on("close", () => console.log("Disconnected from the Browser ❌"));
    socket.on("message", message => {
        socket.send(message);
        console.log(message.toString('utf8'));
    });
    socket.send("hello!!!");
});

server.listen(3000, handleListen);