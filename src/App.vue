<template>
  <div
    v-if="serverStore.server.socketConnecting"
    class="flex flex-center q-pt-lg"
  >
    <DmSpinner size="128px" />
  </div>
  <router-view v-else />
</template>

<script>
import { defineComponent, onBeforeMount, onMounted } from "vue";
import { useConfigStore } from "stores/config";
import { useServerStore } from "stores/server";
import DmSpinner from "components/common/DmSpinner.vue";
import { useUserStore } from "stores/user";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "App",
  components: { DmSpinner },
  setup() {
    const router = useRouter();
    const serverStore = useServerStore();
    const configStore = useConfigStore();
    const userStore = useUserStore();

    onBeforeMount(() => {
      serverStore.connectToSocket();
      configStore.setQuasarColors();
    });

    onMounted(() => {
      if (userStore.token) {
        // get user data
        userStore
          .getUserData()
          .then(() => {
            router.push("/app");
          })
          .catch((error) => {
            // if token is invalid, delete it, redirect to login
            if (error.status === 401) {
              userStore.clearToken();
              router.push("/login");
            }
          });
      } else {
        // forward to log in
        router.push("/login");
      }
    });

    return {
      serverStore,
    };
  },
});
</script>
