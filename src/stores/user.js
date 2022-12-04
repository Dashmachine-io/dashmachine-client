import { defineStore } from "pinia";
import { api } from "boot/api";
import { LocalStorage } from "quasar";

export const useUserStore = defineStore("user", {
  state: () => ({
    token: LocalStorage.getItem("token"),
    user: null,
  }),
  actions: {
    async getToken(username, password) {
      let resp = await api.xFormPost({
        endpoint: "users/token",
        data: { username: username, password: password },
      });
      this.token = resp.access_token;
      LocalStorage.set("token", this.token);
    },
    clearToken() {
      this.token = null;
      LocalStorage.remove("token");
    },
    async getUserData() {
      this.user = await api.get({
        endpoint: "users/me",
        token: this.token,
      });
    },
  },
});
