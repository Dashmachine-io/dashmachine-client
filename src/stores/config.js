import { defineStore } from "pinia";
import { setCssVar, Dark, colors } from "quasar";

const { brightness } = colors;

export const useConfigStore = defineStore("config", {
  state: () => ({
    theme: {
      primary: "#FF9966",
      accent: "#3399FF",
    },
    dark: "auto",
  }),
  actions: {
    setQuasarColors() {
      Object.keys(this.theme).forEach((k) => {
        setCssVar(k, this.theme[k]);
      });
      const primaryBrightness = brightness(this.theme.primary);
      const darkSecondary = "#1D1D1D";
      const lightSecondary = "#fae4e4";
      setCssVar(
        "secondary",
        primaryBrightness > 128 ? darkSecondary : lightSecondary
      );
      Dark.set(this.dark);
    },
  },
});
