<template>
  <div class="nav">
    <ul>
      <li
        v-for="(tab, index) in tabs"
        :key="index"
        @click="selectTab(index)"
        :class="{ active: index === selectedTab }"
      >
        {{ tab.name }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tabs: [
        { name: "Таб 1", content: "tab1" },
        { name: "Таб 2", content: "tab2" },
        { name: "Таб 3", content: "tab3" },
        { name: "Таб 4", content: "tab4" },
      ],
      selectedTab: 0,
    };
  },
  methods: {
    selectTab(index) {
      this.selectedTab = index;
      this.$emit("tab-change", this.tabs[index].content);
    },
  },
};
</script>

<style lang="scss" scoped>
.nav {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  background-color: var(--lightSecondary);
  padding: 15px;
}
</style>
