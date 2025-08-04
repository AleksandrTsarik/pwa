<template>
  <label class="input-field">
    <input
      v-if="type === 'file'"
      type="file"
      @change="onFileChange"
      @focus="isFocused = true"
      @blur="isFocused = false"
      :id="id"
      :placeholder="placeholder"
      multiple
    />
    <template v-else>
      <input
        :type="type === 'password' && showPassword ? 'text' : type"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        @focus="isFocused = true"
        @blur="isFocused = false"
        :id="id"
        :placeholder="placeholder"
        :disabled="disabled"
        :class="{
          'not-empty': modelValue && modelValue.length > 0,
          'is-focused': isFocused,
        }"
        v-bind="$attrs"
        :style="type === 'password' ? 'padding-right: 48px' : ''"
      />
      <span
        v-if="type === 'password'"
        class="input-field__icon"
        @click="togglePassword"
      >
        <svg
          v-if="!showPassword"
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clip-path="url(#clip0_1055_30072)">
            <g clip-path="url(#clip1_1055_30072)">
              <path
                d="M6.63985 7.47461C6.15957 8.11116 5.85545 8.88637 5.80294 9.72559C5.64338 12.2662 7.73805 14.3568 10.2746 14.1973C11.1121 14.1431 11.8855 13.837 12.5217 13.3564L14.2346 15.0693C12.8971 15.6474 11.4756 15.9609 10.0002 15.9609C6.179 15.9609 2.71347 13.8705 0.156451 10.4707C-0.0521762 10.1925 -0.0521243 9.80359 0.156451 9.52539C1.44633 7.81243 2.96742 6.43132 4.64864 5.4834L6.63985 7.47461ZM10.0002 4.03906C13.8214 4.03906 17.2869 6.12949 19.844 9.5293C20.0526 9.80747 20.0525 10.1964 19.844 10.4746C18.7408 11.9396 17.4674 13.1601 16.0705 14.0762L13.7961 11.8018C14.0212 11.3326 14.1624 10.817 14.1975 10.2744C14.357 7.73376 12.2624 5.64318 9.72579 5.80273C9.18176 5.83678 8.66452 5.97624 8.19454 6.20117L6.60079 4.60742C7.68993 4.23673 8.82815 4.03906 10.0002 4.03906ZM11.1262 11.9609C10.8335 12.13 10.5013 12.2369 10.1477 12.2588C8.78119 12.3447 7.6514 11.219 7.74141 9.85254C7.76327 9.49809 7.86818 9.16455 8.03731 8.87207L11.1262 11.9609ZM9.85665 7.7373C11.2231 7.65139 12.3529 8.77708 12.2629 10.1436C12.2604 10.1813 12.2545 10.2186 12.2502 10.2559L9.74337 7.74902C9.78092 7.74465 9.81859 7.73979 9.85665 7.7373Z"
                fill="#1D1F76"
              />
              <line
                x1="3.41421"
                y1="4"
                x2="15.3333"
                y2="15.9191"
                stroke="#1D1F76"
                stroke-width="2"
                stroke-linecap="round"
              />
            </g>
          </g>
          <defs>
            <clipPath id="clip0_1055_30072">
              <rect width="20" height="20" fill="white" />
            </clipPath>
            <clipPath id="clip1_1055_30072">
              <rect width="20" height="20" fill="white" />
            </clipPath>
          </defs>
        </svg>
        <svg
          v-else
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 4.03906C6.17879 4.03906 2.71351 6.12968 0.15649 9.52541C-0.0521632 9.80361 -0.0521632 10.1923 0.15649 10.4705C2.71351 13.8703 6.17879 15.9609 10 15.9609C13.8212 15.9609 17.2865 13.8703 19.8435 10.4746C20.0522 10.1964 20.0522 9.8077 19.8435 9.5295C17.2865 6.12968 13.8212 4.03906 10 4.03906ZM10.2741 14.1976C7.73755 14.3572 5.64284 12.2665 5.80239 9.72588C5.93331 7.63117 7.63118 5.9333 9.72589 5.80238C12.2625 5.64283 14.3572 7.73345 14.1976 10.2741C14.0626 12.3647 12.3647 14.0626 10.2741 14.1976ZM10.1473 12.2584C8.78081 12.3443 7.65163 11.2192 7.74164 9.85271C7.81119 8.72353 8.72763 7.81118 9.85681 7.73754C11.2233 7.65162 12.3525 8.77671 12.2625 10.1432C12.1888 11.2765 11.2724 12.1888 10.1473 12.2584Z"
            fill="#1D1F76"
          />
        </svg>
      </span>
    </template>
    <span
      v-if="name"
      class="input-field__name"
      :class="{
        active: isFocused || (modelValue && modelValue.length > 0) || fileName,
      }"
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
    disabled: Boolean,
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
      showPassword: false,
    };
  },
  methods: {
    onFileChange(e) {
      const files = Array.from(e.target.files);
      this.fileName = files.map((f) => f.name).join(", ");
      this.$emit("update:modelValue", files);
    },
    togglePassword() {
      this.showPassword = !this.showPassword;
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
  margin-bottom: 10px;

  input {
    width: 100%;
    font-size: 16px;
    border: solid 1px transparent;
    border-radius: 50px;
    background: #e5f0ff;
    outline: none;
    height: 56px;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    padding: 15px 20px;

    &.is-focused,
    &.not-empty {
      background: #fff;
      border-color: var(--darkSecondary);
      padding: 15px 20px 5px;
    }

    &:disabled {
      background-color: var(--gray);
      & + .input-field__name {
        background: red;
      }
    }
  }

  .input-field__icon {
    position: absolute;
    right: 20px;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
    z-index: 2;
    svg {
      display: block;
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
    transform: translateY(0);

    &.active {
      top: 4px;
      font-size: 12px;
      color: rgba(78, 94, 107, 1);
      background: none;
      transform: translateY(0);
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
.input-field:has(input:disabled) .input-field__name {
  background-color: var(--gray);
}
</style>
