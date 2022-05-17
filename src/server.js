import http from "http";
import SocketIO from "socket.io";
//import WebSocket from "ws";
import express from "express";

const app = express();

app.set('view engine', "pug")
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname + "/public"));
app.get("/", (_, res) => res.render("home"));
app.get("/*", (_, res) => res.redirect("/"));

const handleListen = () => console.log(`Listening on http://localhost:3000`);

const httpServer = http.createServer(app); //프로토콜이 다른 것을 한 서버에서 사용함
const wsServer = SocketIO(httpServer);

wsServer.on("connection", socket => {
    socket.onAny((event) => {
        console.log(`Socket Event: ${event}`);
    });

    socket.on("enter_room", (roomName, done) => {
        socket.join(roomName);
        done();
    });
});



// const wss = new WebSocket.Server({server}); // ws를 http서버위에 올림
// const sockets = [];

// wss.on("connection",(socket)=>{
//     sockets.push(socket);
//     socket["nickname"] = "Anon"
//     console.log("Connected to Browser ✅");
//     socket.on("close", onSocketClose);
//     socket.on("message", (msg) => {
//         const message= JSON.parse(msg);
//         switch (message.type) {
//             case "new_message":
//                 sockets.forEach((aSocket) => aSocket.send(`${socket.nickname}: ${message.payload}`));
//             case "nickname":
//                 socket["nickname"] = message.payload;
//         }

//     });
// });
// function onSocketClose() {
//     console.log("Disconnected from the Browser ❌");
// }
httpServer.listen(3000, handleListen);






