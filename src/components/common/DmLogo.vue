<template>
  <q-img
    src="../../assets/images/logo.png"
    :style="`height: ${size}; width: ${size}`"
  />
</template>

<script>
export default {
  name: "DmLogo",
  props: {
    size: String,
  },
};
</script>

<style scoped></style>
