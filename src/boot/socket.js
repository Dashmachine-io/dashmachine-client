import { io } from "socket.io-client";
import { api } from "boot/api";

const socket = io(api.baseUrl, { path: "/ws/socket.io" });

export { socket };
