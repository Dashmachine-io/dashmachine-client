const routes = [
  {
    path: "/",
    component: () => import("layouts/BlankLayout.vue"),
    children: [
      { path: "", component: () => import("pages/IndexPage.vue") },
      { path: "login", component: () => import("pages/LoginPage.vue") },
    ],
  },
  {
    path: "/app",
    component: () => import("layouts/DashboardLayout.vue"),
    children: [
      {
        path: "",
        components: {
          default: () => import("pages/DashboardPage.vue"),
          drawer: () => import("components/DashboardDrawer.vue"),
        },
      },
      {
        path: "settings",
        components: {
          default: () => import("pages/SettingsPage.vue"),
          drawer: () => import("components/DashboardDrawer.vue"),
        },
      },
    ],
  },

  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
