<template>
  <div class="modal">
    <div class="modal__overlay"></div>
    <div class="modal__wrap modal-email">
      <div class="modal__ico"><Svg type="key"></Svg></div>
      <div class="modal__content">
        <div class="modal__text">
          <h4>Новый пароль успешно создан!</h4>
          <p>
            Мы сбросили твой старый пароль. Необходимо войти с новым паролем.
          </p>
        </div>
        <div class="modal__btns">
          <button>Закрыть</button>
          <button>ok</button>
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
