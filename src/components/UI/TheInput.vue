<template>
  <label class="input-field">
    <input
      v-if="type !== 'file'"
      :type="type"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      @focus="isFocused = true"
      @blur="isFocused = false"
      :id="id"
      :placeholder="placeholder"
    />
    <input
      v-else
      type="file"
      @change="onFileChange"
      @focus="isFocused = true"
      @blur="isFocused = false"
      :id="id"
      :placeholder="placeholder"
      multiple
    />
    <span
      v-if="name"
      class="input-field__name"
      :class="{ active: isFocused || modelValue || fileName }"
    >
      {{ name }}
    </span>
    <span v-if="type === 'file' && fileName" class="input-field__file-name">{{
      fileName
    }}</span>
  </label>
</template>

<script>
export default {
  name: "TheInput",
  props: {
    modelValue: String,
    name: String,
    type: {
      type: String,
      default: "text",
    },
    id: String,
    placeholder: String,
  },
  data() {
    return {
      isFocused: false,
      fileName: "",
    };
  },
  methods: {
    onFileChange(e) {
      const files = Array.from(e.target.files);
      this.fileName = files.map((f) => f.name).join(", ");
      this.$emit("update:modelValue", files);
    },
  },
};
</script>

<style lang="scss" scoped>
.input-field {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;

  input {
    width: 100%;
    font-size: 16px;

    border: solid 1px transparent;
    border-radius: 50px;
    background: #e5f0ff;
    outline: none;
    height: 56px;
    transition: background 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    padding: 12px 20px;
    &:focus {
      background: rgb(var(--white));
      border: 1px solid var(--darkSecondary);
    }
  }

  .input-field__name {
    position: absolute;
    left: 12px;
    top: 18px;
    font-size: 16px;
    color: #888;
    pointer-events: none;
    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    background: #e5f0ff;
    padding: 0 4px;

    &.active {
      top: 4px;
      font-size: 12px;
      color: rgba(78, 94, 107, 1);
      background: none;
    }
  }

  .input-field__file-name {
    display: block;
    margin-top: 4px;
    font-size: 12px;
    color: #888;
    word-break: break-all;
  }
}
</style>
