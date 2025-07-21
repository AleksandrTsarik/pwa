<template>
  <div class="modal">
    <div class="modal__overlay"></div>
    <div class="modal__wrap modal-email">
      <div class="modal__ico"><Svg type="email"></Svg></div>
      <div class="modal__content">
        <div class="modal__text">
          <h4>Письмо отправлено</h4>
          <p>
            Мы сбросили твой старый пароль. Для создания нового следуй согласно
            инструкции на почте. Если ты не получил письмо, проверь папку «Спам»
          </p>
        </div>
        <div class="modal__btns">
          <button @click="goToPassword">Закрыть</button>
          <button @click="goToPassword">ok</button>
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
    goToPassword() {
      this.$router.push("/password");
    },
  },
};
</script>

<style lang="scss" scoped></style>
