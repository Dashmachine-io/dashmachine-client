<template>
  <q-page class="row q-pa-sm">
    <div class="col-12 col-md-6 col-lg-5 col-xl-4">
      <DmCard>
        <q-card-section class="text-h5 text-primary q-pa-sm">
          Settings
        </q-card-section>

        <q-separator />

        <q-card-section>
          <DmForm :fields="fields" />
        </q-card-section>
      </DmCard>
    </div>
  </q-page>
</template>

<script>
import DmCard from "components/common/DmCard.vue";
import DmForm from "components/common/dm-form/DmForm.vue";

export default {
  name: "SettingsPage",
  components: { DmForm, DmCard },
  setup() {
    const fields = [
      {
        label: "Primary Color",
        model: "primary",
        type: "color",
        required: true,
      },
      {
        label: "Dark Mode",
        model: "dark_mode",
        type: "options",
        options: ["On", "Off", "Auto"],
        required: true,
      },
    ];
    return {
      fields,
    };
  },
};
</script>

<style scoped></style>
