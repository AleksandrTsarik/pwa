<template>
  <label class="default-checkbox" v-if="inputType === 'checkbox'">
    <input
      v-model.lazy="isCheck"
      :value="value"
      type="checkbox"
      class="default-checkbox__input"
    />
    <span class="default-checkbox__container"></span>
    <span
      v-if="!hiddenLabel"
      class="default-checkbox__text"
      v-html="label"
    ></span>
  </label>

  <label class="default-radio" v-else-if="inputType === 'radio'">
    <input
      v-model.lazy="isCheck"
      :value="value"
      type="radio"
      class="default-radio__input"
      :name="name"
    />
    <span class="default-radio__container"></span>
    <span v-if="!hiddenLabel" class="default-radio__text" v-html="label"></span>
  </label>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      default: "",
    },
    hiddenLabel: {
      type: Boolean,
      default: false,
    },
    // size: { // Не используется в шаблоне, можно удалить или использовать
    //   type: String,
    //   default: "",
    // },
    inputType: {
      type: String,
      required: true,
      validator: (value) => ["checkbox", "radio"].includes(value),
    },
    value: {
      type: [String, Number, Boolean, Object],
      default: null,
    },
    name: {
      type: String,
      default: "",
    },
    modelValue: {
      type: [Boolean, String, Number, Object],
      default: false,
    },
  },
  emits: ["update:modelValue"],
  data() {
    return {
      localChecked: this.modelValue,
    };
  },
  computed: {
    isCheck: {
      get() {
        return this.localChecked;
      },
      set(val) {
        this.localChecked = val;
        this.$emit("update:modelValue", val);
      },
    },
  },
  watch: {
    modelValue(newVal) {
      this.localChecked = newVal;
    },
  },
};
</script>
