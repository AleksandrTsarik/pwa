<template>
  <div class="v-select">
    <div
      class="v-select__field"
      @click="optionsVisible = !optionsVisible"
      :class="optionsVisible === true ? 'active' : ''"
    >
      <span
        v-if="selected && selected !== placeholder"
        class="v-select__selected"
      >
        {{ selected }}
      </span>
      <span v-else class="v-select__placeholder">
        {{ placeholder }}
      </span>
    </div>
    <div class="v-select__options" v-if="optionsVisible">
      <span
        v-for="(option, i) in options"
        :key="i"
        @click="selectOption(option)"
        :class="{ selected: option.name === selected }"
        >{{ option.name }}</span
      >
    </div>
  </div>
</template>

<script>
export default {
  props: {
    options: {
      type: Array,
      default: [],
    },
    selected: {
      type: String,
      default: "",
    },
    placeholder: {
      type: String,
      default: "Выберите опцию",
    },
  },
  data() {
    return {
      optionsVisible: false,
    };
  },
  methods: {
    selectOption(option) {
      this.$emit("select", option);
      this.optionsVisible = false;
    },
    hideSelect() {
      this.optionsVisible = false;
    },
  },
  mounted() {
    document.addEventListener("click", this.hideSelect.bind(this), true);
  },
  beforeDestroy() {
    document.removeEventListener("click", this.hideSelect);
  },
};
</script>

<style lang="scss">
.v-select {
  position: relative;
  max-width: 100%;
  &__field {
    border-radius: 50px;
    background: #e5f0ff;
    height: 56px;
    line-height: 56px;
    padding: 15px 20px;
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

    &:hover {
      background: #d5e5ff;
    }

    &::after {
      content: "";
      display: flex;
      width: 15px;
      height: 15px;
      transition: 0.3s;
      background-image: url("@/assets/img/icon-select.svg");
      background-repeat: no-repeat;
      text-align: center;
      background-size: cover;
    }

    &.active {
      background: #fff;
      border: 1px solid var(--darkSecondary);

      &::after {
        transform: rotate(180deg);
      }
    }
  }

  &__selected {
    color: #333;
    font-weight: 500;
  }

  &__placeholder {
    color: #888;
    font-weight: 400;
  }

  &__options {
    position: absolute;
    width: 100%;
    top: 100%;
    left: 0;
    background-color: #fff;
    z-index: 50;
    padding: 10px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    border-radius: 12px;
    margin-top: 5px;

    span {
      display: block;
      padding: 10px 15px;
      margin-bottom: 2px;
      border-radius: 8px;
      transition: 0.3s;
      cursor: pointer;
      font-size: 14px;

      &:hover {
        background-color: #f5f5f5;
      }

      &.selected {
        background-color: var(--primary);
        color: #fff;

        &:hover {
          background-color: var(--primary);
        }
      }

      &:last-child {
        margin-bottom: 0;
      }
    }
  }
}
</style>
