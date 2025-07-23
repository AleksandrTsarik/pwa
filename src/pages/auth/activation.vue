<template>
  <div class="bg-block--beige activation">
    <div class="activation__head block-head">
      <div class="activation__container">
        <div class="activation__info">
          <h2 class="title activation__title">
            Для активации аккаунта добавь свое фото
          </h2>
          <div class="activation__subtitle">
            Данное фото будет использоваться в профиле твоего кабинета. По этому
            фото будет происходить идентификация на ресепшене.
          </div>
        </div>
      </div>
    </div>
    <div class="activation__body bg-block--white block-body">
      <div class="activation__container">
        <form class="activation-form">
          <div class="activation-form__photo">
            <ModalPhoto v-model="avatarUrl" :disabled="isPhotoSet" />
            <div
              v-if="isPhotoSet"
              style="color: #888; font-size: 14px; margin-top: 8px"
            >
              Фото уже выбрано и изменить нельзя
            </div>
          </div>
          <div class="activation-form__more">
            <Button
              label="Продолжить"
              class="btn-primary"
              @click.prevent="continueWithPhoto"
            />
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import Button from "../../components/UI/TheButton.vue";
import ModalPhoto from "../../components/modal/modal-photo.vue";

export default {
  components: { Button, ModalPhoto },
  data() {
    return {
      avatarUrl: null,
    };
  },
  watch: {
    avatarUrl(newVal) {
      if (newVal) {
        localStorage.setItem("profilePhoto", newVal);
        // console.log("Saved to storage:", newVal);
      }
    },
  },
  computed: {
    isPhotoSet() {
      return !!localStorage.getItem("profilePhoto");
    },
  },
  methods: {
    continueWithPhoto() {
      if (this.avatarUrl) {
        console.log("Фото выбрано:");
      } else {
        console.log("Фото не выбрано");
      }
      this.$router.push("/");
    },
  },
};
</script>

<style lang="scss" scoped>
.activation-form {
  display: flex;
  flex-direction: column;
  &__photo {
    margin: 0 auto 40px;
  }
}
</style>
