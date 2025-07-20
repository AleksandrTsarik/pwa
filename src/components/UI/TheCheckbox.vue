<template>
  <label class="default-checkbox">
    <input
      v-model="isCheck"
      type="checkbox"
      class="default-checkbox__input"
      ref="checkbox"
    />
    <span class="default-checkbox__container"></span>
    <span
      v-if="!hiddenLabel"
      class="default-checkbox__text"
      v-html="label"
    ></span>
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
    size: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      isCheck: true,
    };
  },
  watch: {
    isCheck(val) {
      this.$emit("input", val);
    },
  },
};
</script>

<style lang="scss"></style>
