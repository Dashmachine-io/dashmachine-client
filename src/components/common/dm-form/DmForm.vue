<!--   Field params:     -->
<!--   label     -->
<!--   model     -->
<!--   size     -->
<!--   type     -->
<!--   hint     -->
<!--   rules     -->
<!--   autogrow     -->
<!--   maxlength     -->
<!--   counter     -->
<!--   autofocus     -->

<template>
  <q-form
    @submit="onSubmit"
    class="row col-12 fit q-col-gutter-sm justify-center"
  >
    <div
      v-for="(field, index) in fields"
      :key="`model-form-input-${index}-${field.model}`"
      :class="field.size ? field.size : 'col-12'"
    >
      <!--  text type    -->
      <template v-if="!field.type">
        <q-input
          :model-value="formData.modelData[field.model]"
          @update:model-value="(val) => updateModel(field.model, val)"
          :label="field.label"
          :hint="field.hint ? field.hint : ''"
          :rules="rules(field)"
          :autogrow="field.autogrow"
          :maxlength="field.maxlength"
          :counter="field.counter"
          :autofocus="field.autofocus"
          :type="field.inputType"
          outlined
        />
      </template>

      <!--  password type    -->
      <template v-if="field.type === 'password'">
        <q-input
          :model-value="formData.modelData[field.model]"
          @update:model-value="(val) => updateModel(field.model, val)"
          :label="field.label"
          :hint="field.hint ? field.hint : ''"
          :rules="rules(field)"
          :type="formData.showPassword ? null : 'password'"
          outlined
        >
          <template v-slot:append>
            <q-btn
              @click="formData.showPassword = !formData.showPassword"
              :icon="formData.showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"
              flat
              dense
            />
          </template>
        </q-input>
      </template>

      <!--  color type    -->
      <template v-if="field.type === 'color'">
        <q-input
          :model-value="formData.modelData[field.model]"
          @update:model-value="(val) => updateModel(field.model, val)"
          :label="field.label"
          :hint="field.hint ? field.hint : ''"
          :rules="rules(field)"
          outlined
          readonly
        >
          <template v-slot:append>
            <q-btn icon="fas fa-palette" flat dense>
              <ColorPicker @picked="(val) => updateModel(field.model, val)" />
            </q-btn>
          </template>
        </q-input>
      </template>

      <!--  switch type    -->
      <template v-if="field.type === 'switch'">
        <q-list bordered class="rounded-borders q-mb-sm">
          <q-item>
            <q-item-section>
              <q-item-label class="text-body1">
                {{ field.label }}
              </q-item-label>
              <q-item-label v-if="field.hint" caption>
                {{ field.hint }}
              </q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-toggle
                :model-value="formData.modelData[field.model]"
                @update:model-value="(val) => updateModel(field.model, val)"
              />
            </q-item-section>
          </q-item>
        </q-list>
      </template>

      <!--  date type  -->
      <template v-if="field.type === 'date'">
        <q-input
          :model-value="formData.modelData[field.model]"
          :label="field.label"
          :hint="field.hint"
          :rules="rules(field)"
          outlined
          readonly
        >
          <template v-slot:append>
            <q-btn
              @click="updateModel(field.model, '')"
              v-if="formData.modelData[field.model]"
              icon="fas fa-times"
              flat
              dense
            >
              <q-tooltip> Clear </q-tooltip>
            </q-btn>
            <q-btn icon="fas fa-calendar" flat dense>
              <q-popup-proxy transition-show="scale" transition-hide="scale">
                <q-date
                  :model-value="formData.modelData[field.model]"
                  @update:model-value="(val) => updateModel(field.model, val)"
                  :title="
                    field.label.length > 14
                      ? field.label.slice(0, 14) + '...'
                      : field.label
                  "
                  :default-year-month="`${new Date().getFullYear() - 18}/01`"
                  mask="MM/DD/YYYY"
                  minimal
                >
                  <div class="row items-center justify-end">
                    <q-btn v-close-popup label="Close" color="primary" flat />
                  </div>
                </q-date>
              </q-popup-proxy>
              <q-tooltip> Select Date </q-tooltip>
            </q-btn>
          </template>
        </q-input>
      </template>

      <!--  datetime type    -->
      <template v-if="field.type === 'datetime'">
        <q-input
          :model-value="formData.modelData[field.model]"
          :label="field.label"
          :hint="field.hint"
          :rules="rules(field)"
          outlined
          readonly
        >
          <template v-slot:prepend>
            <q-btn icon="fas fa-calendar" flat dense>
              <q-popup-proxy
                cover
                transition-show="scale"
                transition-hide="scale"
              >
                <q-date
                  :model-value="formData.modelData[field.model]"
                  @update:model-value="(val) => updateModel(field.model, val)"
                  :title="
                    field.label.length > 14
                      ? field.label.slice(0, 14) + '...'
                      : field.label
                  "
                  mask="MM/DD/YYYY hh:mmA"
                  minimal
                >
                  <div class="row items-center justify-end">
                    <q-btn v-close-popup label="Close" color="primary" flat />
                  </div>
                </q-date>
              </q-popup-proxy>
            </q-btn>
          </template>

          <template v-slot:append>
            <q-btn icon="fas fa-clock" flat dense>
              <q-popup-proxy
                cover
                transition-show="scale"
                transition-hide="scale"
              >
                <q-time
                  :model-value="formData.modelData[field.model]"
                  @update:model-value="(val) => updateModel(field.model, val)"
                  mask="MM/DD/YYYY hh:mmA"
                >
                  <div class="row items-center justify-end">
                    <q-btn v-close-popup label="Close" color="primary" flat />
                  </div>
                </q-time>
              </q-popup-proxy>
            </q-btn>
            <q-btn
              @click="updateModel(field.model, '')"
              v-if="formData.modelData[field.model]"
              icon="fas fa-times"
              flat
              dense
            >
              <q-tooltip> Clear </q-tooltip>
            </q-btn>
          </template>
        </q-input>
      </template>

      <!--   options type   -->
      <template v-if="field.type === 'options'">
        <div class="q-gutter-sm q-mb-md text-center">
          <div
            v-if="field.label"
            class="text-center text-bold text-body1 text-accent"
          >
            {{ field.label }}
          </div>
          <div
            v-if="field.hint"
            class="text-center text-caption q-mb-md text-muted"
          >
            {{ field.hint }}
          </div>
          <template v-if="field.multiple">
            <OptionsMultipleField
              :field="field"
              :index="index"
              :model-value="formData.modelData[field.model]"
              @option-clicked="(s) => updateModel(field.model, s)"
            />
          </template>
          <template v-else>
            <q-btn
              v-for="(opt, ii) in field.options"
              :key="`input-opt-${index}-${ii}`"
              @click="updateModel(field.model, opt)"
              :label="opt"
              :color="
                formData.modelData[field.model] === opt ? 'primary' : 'muted'
              "
              flat
              no-caps
            >
            </q-btn>
          </template>
        </div>
      </template>
    </div>

    <!-- submit button   -->
    <div v-if="!autosave" class="col-12 text-center q-mt-md">
      <q-btn
        :label="submitButtonText ? submitButtonText : 'save'"
        :icon="submitButtonIcon ? submitButtonIcon : 'fas fa-save'"
        :color="submitButtonColor ? submitButtonColor : 'accent'"
        type="submit"
        outline
      />
    </div>
  </q-form>
</template>

<script>
import { onMounted, reactive, ref, watch } from "vue";
import { useQuasar } from "quasar";
import { dates } from "boot/dates";
import OptionsMultipleField from "components/common/dm-form/OptionsMultipleField.vue";
import ColorPicker from "components/common/dm-form/ColorPicker.vue";

export default {
  name: "DmForm",
  components: { ColorPicker, OptionsMultipleField },
  props: {
    fields: Array,
    modelData: Object,
    submitButtonText: String,
    submitButtonIcon: String,
    submitButtonColor: String,
    autosave: Boolean,
    doneMsg: String,
  },
  emits: ["submitted", "model-update"],
  setup(props, { emit, expose }) {
    const quasar = useQuasar();
    const formData = reactive({
      modelData: {},
      showPassword: false,
    });
    function validateFields() {
      let isValid = true;
      props.fields.forEach((field) => {
        if (
          (field.required && !formData.modelData[field.model]) ||
          (field.required &&
            field.multiple &&
            formData.modelData[field.model].length === 0)
        ) {
          quasar.notify({
            type: "negative",
            message: `${field.label} is required`,
          });
          isValid = false;
        }
      });
      return isValid;
    }
    function onSubmit() {
      const isValid = validateFields();
      if (!isValid) {
        return;
      }

      // convert list of objects to list of strings for
      // options multiple field type
      props.fields
        .filter((o) => o.type === "options" && o.multiple)
        .forEach((field) => {
          if (
            formData.modelData[field.model] &&
            formData.modelData[field.model].length > 0
          ) {
            formData.modelData[field.model] = formData.modelData[
              field.model
            ].map((o) => o.name);
          }
        });

      // convert model data keys from camel case to snake case
      let serverReadyData = {};
      Object.keys(formData.modelData).forEach((key) => {
        const snakeCasedKey = key.replace(
          /[A-Z]/g,
          (letter) => `_${letter.toLowerCase()}`
        );
        serverReadyData[snakeCasedKey] = formData.modelData[key];
      });
      emit("submitted", serverReadyData);
      if (props.doneMsg) {
        quasar.notify({
          type: "positive",
          message: props.doneMsg,
        });
      }
    }

    function reset() {
      if (props.modelData) {
        Object.keys(props.modelData).forEach((k) => {
          if (props.fields.find((f) => f.model === k) && props.modelData[k]) {
            formData.modelData[k] = JSON.parse(
              JSON.stringify(props.modelData[k])
            );
          }
        });
      }
      props.fields.forEach((field) => {
        if (field.type === "switch" && !formData.modelData[field.model]) {
          formData.modelData[field.model] = false;
        }
        if (field.type === "datetime" && formData.modelData[field.model]) {
          formData.modelData[field.model] = toDatetimeMask(
            formData.modelData[field.model]
          );
        }
      });
    }

    function rules(field) {
      return [
        ...(field.required
          ? [(val) => !!val || `${field.label} is required.`]
          : []),
        ...(field.rules ? field.rules : []),
      ];
    }

    function toDatetimeMask(modelValue) {
      return dates.formatDate({
        timestamp: modelValue,
        formatString: "MM/DD/YYYY hh:mmA",
      });
    }

    const locationSelector = ref(null);

    function updateModel(model, value) {
      formData.modelData[model] = value;
      emit("model-update", { model: model, value: value });
      if (props.autosave) {
        onSubmit();
      }
    }

    onMounted(() => {
      reset();
    });

    watch(
      () => props.modelData,
      () => {
        reset();
      }
    );

    expose({
      reset,
    });

    return {
      onSubmit,
      formData,
      rules,
      locationSelector,
      updateModel,
    };
  },
};
</script>

<style scoped></style>
