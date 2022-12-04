import { defineStore } from "pinia";
import { socket } from "boot/socket";

export const useServerStore = defineStore("server", {
  state: () => ({
    server: {
      url: process.env.SERVER_URL,
      socketConnecting: true,
      socketConnected: false,
    },
  }),
  actions: {
    connectToSocket() {
      socket.on("connect", () => {
        console.log("connected!");
        this.server.socketConnecting = false;
        this.server.socketConnected = true;
      });
      socket.on("disconnect", () => {
        console.log("disconnected!");
        this.server.socketConnected = false;
      });
      setTimeout(() => {
        if (this.server.socketConnecting) {
          this.server.socketConnecting = false;
        }
      }, 10000);
    },
  },
});
