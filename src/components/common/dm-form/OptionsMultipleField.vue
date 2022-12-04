<template>
  <q-btn
    v-for="(opt, ii) in field.options"
    :key="`input-opt-${index}-${ii}`"
    @click="onClick(opt)"
    :label="opt"
    :color="isActive(opt) ? 'primary' : 'muted'"
    flat
    no-caps
  />
</template>

<script>
export default {
  name: "OptionsMultipleField",
  props: {
    index: Number,
    field: Object,
    modelValue: Array,
  },
  emits: ["option-clicked"],
  setup(props, { emit }) {
    function isActive(option) {
      return props.modelValue
        ? props.modelValue.find((o) => o.name === option)
        : false;
    }
    function onClick(option) {
      let selected = [...props.modelValue];
      if (isActive(option)) {
        selected = selected.filter((o) => o.name !== option);
      } else {
        if (props.field.limit > selected.length || !props.field.limit) {
          selected.push({ name: option });
        }
      }
      emit("option-clicked", selected);
    }

    return {
      isActive,
      onClick,
    };
  },
};
</script>

<style scoped></style>
