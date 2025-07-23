<template>
  <div class="navm-menu">
    <!-- контент страницы -->
    <div v-if="selectedTab === 0">
      <Tab1 />
    </div>
    <div v-else-if="selectedTab === 1">
      <Tab2 />
    </div>
    <div v-else-if="selectedTab === 2">
      <Tab3 />
    </div>
    <div v-else-if="selectedTab === 3">
      <Tab4 />
    </div>
    <!-- табы -->
    <TheNav @tab-change="updateTab" />
  </div>
</template>

<script>
import TheNav from "../components/TheNav.vue";
import Tab1 from "../pages/tabs/map.vue";
import Tab2 from "../pages/tabs/qr.vue";
import Tab3 from "../pages/tabs/profile.vue";
import Tab4 from "../pages/tabs/question.vue";

export default {
  components: { TheNav, Tab1, Tab2, Tab3, Tab4 },
  data() {
    return {
      selectedTab: 0,
    };
  },
  methods: {
    updateTab(tab) {
      this.selectedTab = this.tabs.indexOf(tab);
    },
  },
};
</script>

<style lang="scss"></style>
