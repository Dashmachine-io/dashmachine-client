<template>
  <div class="fit">
    <q-list separator>
      <q-item
        v-for="(menuItem, index) in menuItems"
        :key="`menu-item-${index}`"
        @click="menuItem.click()"
        clickable
        v-ripple
      >
        <q-item-section avatar>
          <q-avatar
            :icon="menuItem.icon"
            color="primary"
            text-color="secondary"
          />
        </q-item-section>
        <q-item-section>
          <q-item-label class="text-body1">
            {{ menuItem.label }}
          </q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </div>
</template>

<script>
import { useUserStore } from "stores/user";
import { useRouter } from "vue-router";

export default {
  name: "DashboardDrawer",
  setup() {
    const router = useRouter();
    const userStore = useUserStore();
    const menuItems = [
      {
        label: "Settings",
        icon: "fas fa-gears",
        click: () => {
          router.push("/app/settings");
        },
      },
      {
        label: "Plugins",
        icon: "fas fa-puzzle-piece",
        click: () => {},
      },
      {
        label: "Dashboard Settings",
        icon: "fas fa-table-columns",
        click: () => {},
      },
      {
        label: "Server",
        icon: "fas fa-server",
        click: () => {},
      },
      {
        label: "Logout",
        icon: "fas fa-right-from-bracket",
        click: () => {
          userStore.clearToken();
          router.push("/login");
        },
      },
    ];

    return {
      menuItems,
    };
  },
};
</script>

<style scoped></style>
