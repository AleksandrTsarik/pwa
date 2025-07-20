<template>
  <div class="reg">
    <div class="reg-entrance">
      <div class="reg-entrance__head bg-block--beige">
        <div class="reg-entrance__container">
          <router-link to="/log-in">
            <Svg type="arrow-back"></Svg>
          </router-link>
        </div>
      </div>
      <div class="reg-entrance__body bg-block--white">
        <div class="reg-entrance__container">
          <h2 class="title reg-entrance__title">Вход в приложение</h2>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Svg from "../../components/TheSvg.vue";
export default {
  components: {
    Svg,
  },
};
</script>

<style lang="scss" scoped></style>
