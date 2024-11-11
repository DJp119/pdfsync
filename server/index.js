const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });
app.use(cors({
    origin: "https://pdfsync.onrender.com/",
  }));
let currentPage = 1;
<<<<<<< HEAD
function debounce(func, delay) {
    let timer;
    return function(...args) {
        clearTimeout(timer);
        timer = setTimeout(() => func.apply(this, args), delay);
    };
}
io.on("connection", (socket) => {
    console.log("User connected", socket.id);

    // Send current page to the newly connected client
    socket.emit("pageUpdate", currentPage);

    // Listen for page change requests from the admin
    socket.on("changePage", (page) => {
        currentPage = page;
        // Broadcast the page update to all clients, including the sender
        io.emit("pageUpdate", currentPage);
    });

    // Send a welcome message to the client upon connection (optional)
    socket.emit("welcome", "Welcome to the PDF co-viewer server!");

    socket.on("disconnect", () => {
        console.log("User disconnected", socket.id);
    });

    const debouncedPageChange = debounce((newPage) => {
        socket.emit("changePage", newPage);
    }, 300);
});

server.listen(3001, () => console.log("Server running on port 3001"));
=======

io.on("connection", (socket) => {
    console.log("User connected", socket.id);

    // Send current page to newly connected client
    socket.emit("pageUpdate", currentPage);

    // Listen for page change requests from admin
    socket.on("changePage", (page) => {
        currentPage = page;
        io.emit("pageUpdate", currentPage);
    });

    socket.on("disconnect", () => {
        console.log("User disconnected", socket.id);
    });
});

server.listen(3001, () => console.log("Server running on port 3001"));
>>>>>>> d52a485 (Initial project setup with React and Node)
