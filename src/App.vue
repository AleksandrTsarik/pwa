<template>
  <!-- <TheHeader /> -->
  <main>
    <router-view />
  </main>
  <TheFooter />
  <div class="desktop-blocker">
    Приложение доступно только на мобильных устройствах (ширина экрана до
    1200px)
  </div>
</template>

<script setup>
import TheHeader from "./components/TheHeader.vue";
import TheFooter from "./components/TheFooter.vue";
</script>

<style lang="scss"></style>
