import { io } from "socket.io-client";

const socket = io("https://pdfsync.onrender.com/"); // Connect to the backend server
export default socket;
