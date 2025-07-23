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
            <ModalPhoto v-model="avatarUrl" />
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
  methods: {
    continueWithPhoto() {
      if (this.avatarUrl) {
        console.log("Фото выбрано:", this.avatarUrl);
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
