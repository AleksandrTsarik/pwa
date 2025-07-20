<template>
  <div class="reg">
    <div class="reg-entrance">
      <div class="reg-entrance__head bg-block--beige">
        <div class="reg-entrance__container">
          <div class="reg-entrance__logo">
            <Svg type="logo"></Svg>
          </div>
        </div>
      </div>
      <div class="reg-entrance__body bg-block--white">
        <div class="reg-entrance__container">
          <h2 class="title reg-entrance__title">Вход в приложение</h2>

          <form>
            <div class="reg-form">
              <div class="reg-form__choice"></div>
            </div>
          </form>
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

<style lang="scss" scoped>
.reg {
}
.reg-entrance {
  &__head {
  }
  &__body {
  }
  &__logo {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 60px 0 20px;
  }
  &__title {
    padding: 30px 0 20px;
  }
}
</style>
