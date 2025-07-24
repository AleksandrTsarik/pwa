<template>
  <div class="nav-menu">
    <!-- контент страницы -->
    <div class="nav-menu-content" v-if="selectedTab === 0">
      <Map />
    </div>
    <div class="nav-menu-content" v-else-if="selectedTab === 1">
      <QrCode />
    </div>
    <div class="nav-menu-content" v-else-if="selectedTab === 2">
      <Profile />
    </div>
    <div class="nav-menu-content" v-else-if="selectedTab === 3">
      <Qusetions />
    </div>
    <!-- табы -->
    <TheNav @tab-change="updateTab" />
  </div>
</template>

<script>
import TheNav from "../components/TheNav.vue";
import Map from "../pages/tabs/map.vue";
import QrCode from "../pages/tabs/qr.vue";
import Profile from "../pages/tabs/profile.vue";
import Qusetions from "../pages/tabs/question.vue";

export default {
  components: { TheNav, Map, QrCode, Profile, Qusetions },
  data() {
    return {
      selectedTab: 0,
    };
  },
  methods: {
    updateTab(tab) {
      this.selectedTab = tab;
    },
  },
};
</script>

<style lang="scss">
.nav-menu-content {
  margin-bottom: 60px;
}
</style>
