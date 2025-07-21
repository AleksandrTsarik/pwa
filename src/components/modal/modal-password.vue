<template>
  <div class="modal">
    <div class="modal__overlay"></div>
    <div class="modal__wrap modal-password">
      <div class="modal__ico"><Svg type="check"></Svg></div>
      <div class="modal__content">
        <div class="modal__text">
          <h4>Пароль успешно изменён</h4>
          <p>
            Теперь вы можете использовать новый пароль для входа в приложение.
          </p>
        </div>
        <div class="modal__btns">
          <button @click="goToIndex">Закрыть</button>
          <button @click="goToIndex">Ок</button>
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
  methods: {
    goToIndex() {
      this.$router.push("/");
    },
  },
};
</script>

<style lang="scss" scoped></style>
