<template>
  <q-page class="row q-pa-sm justify-center">
    <div class="col-12 col-md-6 col-lg-5 col-xl-4 q-pt-lg">
      <DmCard>
        <q-card-section class="text-center">
          <DmLogo size="128px" />
        </q-card-section>

        <q-separator />

        <q-card-section>
          <div class="text-center text-h5 text-primary">Login</div>
        </q-card-section>

        <q-separator />

        <q-card-section>
          <DmForm
            @submitted="loginUser"
            :fields="fields"
            :model-data="data.loginData"
            submit-button-text="login"
            submit-button-icon="fas fa-unlock"
          />
        </q-card-section>
      </DmCard>
    </div>
  </q-page>
</template>

<script>
import DmCard from "components/common/DmCard.vue";
import DmLogo from "components/common/DmLogo.vue";
import DmForm from "components/common/dm-form/DmForm.vue";
import { onMounted, reactive } from "vue";
import { useUserStore } from "stores/user";
import { useRouter } from "vue-router";
import { useQuasar } from "quasar";

export default {
  name: "LoginPage",
  components: { DmForm, DmLogo, DmCard },
  setup() {
    const router = useRouter();
    const quasar = useQuasar();
    const userStore = useUserStore();
    const fields = [
      {
        label: "Username",
        model: "username",
        required: true,
      },
      {
        label: "Password",
        model: "password",
        type: "password",
        required: true,
      },
    ];

    const data = reactive({
      loginData: {
        username: "",
        password: "",
      },
    });

    function loginUser(formData) {
      userStore
        .getToken(formData.username, formData.password)
        .then(() => {
          router.push("/app");
        })
        .catch(() => {
          quasar.notify({
            type: "negative",
            message: "Wrong password",
          });
        });
    }

    onMounted(() => {
      if (userStore.token) {
        router.push("/app");
      }
    });

    return {
      data,
      fields,
      loginUser,
    };
  },
};
</script>

<style scoped></style>
