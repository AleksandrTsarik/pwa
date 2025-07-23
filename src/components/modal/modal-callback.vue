<template>
  <div class="modal">
    <div class="modal__overlay" @click="$emit('close')"></div>
    <div class="modal__wrap modal-callback">
      <div class="modal__content">
        <div class="modal__form">
          <form>
            <div class="modal-form">form</div>
          </form>
        </div>
        <div class="modal__btns">
          <button @click="goToPassword" label="Отправить" type="button" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Button from "../../components/UI/TheButton.vue";
export default {
  methods: {},
};
</script>

<style lang="scss" scoped></style>
