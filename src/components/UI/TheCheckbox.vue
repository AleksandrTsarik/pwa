<template>
  <label class="default-checkbox" v-if="inputType === 'checkbox'">
    <input
      v-model.lazy="isCheck"
      :value="value"
      type="checkbox"
      class="default-checkbox__input"
    />
    <span class="default-checkbox__cheked"></span>
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
    <span class="default-radio__cheked"></span>
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

<style lang="scss">
.default-checkbox {
  display: flex;
  align-items: flex-start;
  gap: 5px;
  margin-bottom: 15px;
  cursor: pointer;
  &:last-child {
    margin-bottom: 0;
  }
  &__input {
    opacity: 0;
    position: absolute;
    width: 1px;
    height: 1px;
    overflow: hidden;
    clip: rect(0 0 0 0);
  }
  &__cheked {
    display: block;
    transition: 0.3s;
    width: 18px;
    height: 18px;
    flex: 0 0 18px;
    background-color: var(--lightSecondary);
    border-radius: 4px;
    margin-bottom: -2px;
    margin-top: 2px;
    position: relative;
    &::after {
      content: "";
      display: block;
      width: 10px;
      height: 5px;
      border-left: solid 2px #fff;
      border-bottom: solid 2px #fff;
      position: absolute;
      left: 50%;
      top: 45%;
      transform: translate(-50%, -50%) rotate(-45deg);
      opacity: 0;
      transition: 0.3s;
    }
  }
  &__input:checked + &__cheked {
    background-color: var(--darkSecondary);
    &::after {
      opacity: 1;
    }
  }
}

.default-radio {
  display: flex;
  align-items: flex-start;
  gap: 5px;
  margin-bottom: 15px;
  cursor: pointer;
  &:last-child {
    margin-bottom: 0;
  }
  &__input {
    opacity: 0;
    position: absolute;
    width: 1px;
    height: 1px;
    overflow: hidden;
    clip: rect(0 0 0 0);
  }
  &__cheked {
    display: block;
    transition: 0.3s;
    width: 18px;
    height: 18px;
    flex: 0 0 18px;
    background-color: var(--lightSecondary);
    border-radius: 4px;
    margin-bottom: -2px;
    margin-top: 2px;
    position: relative;
    border-radius: 50%;
    &::after {
      content: "";
      display: block;
      width: 0.6em;
      height: 0.6em;
      background-color: var(--darkSecondary);
      border-radius: 50%;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      opacity: 0;
      transition: 0.3s;
    }
  }
  &__input:checked + &__cheked {
    &::after {
      opacity: 1;
    }
  }
}
</style>
