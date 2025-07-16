<template>
  <div>
    <TheHeader />
    <main>
      <div class="container">
        <router-view />
      </div>
    </main>
    <TheFooter />
    <div class="desktop-blocker">
      Приложение доступно только на мобильных устройствах (ширина экрана до
      1200px)
    </div>
  </div>
</template>

<script setup>
import TheHeader from "./components/TheHeader.vue";
import TheFooter from "./components/TheFooter.vue";
</script>

<style lang="scss">
.container {
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  min-height: 70vh;
  box-sizing: border-box;
  padding: 0 16px;
}

@media (min-width: 1201px) {
  #app > *:not(.desktop-blocker) {
    display: none !important;
  }
  .desktop-blocker {
    display: flex !important;
  }
}
.desktop-blocker {
  display: none;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  text-align: center;
  background: #fff;
  color: #222;
  font-size: 1.5rem;
  padding: 2rem;
}
</style>
