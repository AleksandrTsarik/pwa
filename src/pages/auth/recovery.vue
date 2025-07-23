<template>
  <div class="bg-block--beige recovery">
    <div class="password__haed block-head">
      <div class="recovery__container">
        <router-link to="/log-in" class="recovery__back">
          <Svg type="arrowBack"></Svg>
        </router-link>
        <div class="recovery__info">
          <h2 class="title recovery__title">Восстановление пароля</h2>
          <div class="recovery__subtitle" v-if="!isEmailValid()">
            Напиши свою корпоративную почту, и мы отправим письмо с ссылкой для
            восстановления пароля
          </div>
        </div>
      </div>
    </div>
    <div class="recovery__body bg-block--white block-body">
      <div class="recovery__container">
        <form @submit="onSubmit">
          <div class="recovery-form__inputs">
            <Input v-model="email" name="Email" type="text" />
          </div>
          <div class="recovery-form__btns">
            <Button class="btn btn-primary" label="Продолжить"></Button>
            <router-link to="/log-in" class="btn btn-transparent">
              Назад
            </router-link>
          </div>
        </form>
      </div>
    </div>
  </div>
  <ModalEmail v-if="showModalEmail" @close="showModalEmail = false" />
</template>

<script>
import Svg from "../../components/TheSvg.vue";
import Input from "../../components/UI/TheInput.vue";
import Button from "../../components/UI/TheButton.vue";
import ModalEmail from "../../components/modal/modal-email.vue";
import ModalPhoto from "../../components/modal/modal-photo.vue";
import { useAuthStore } from "../../store/auth";
export default {
  components: {
    Svg,
    Input,
    Button,
    ModalEmail,
    ModalPhoto,
  },
  data() {
    return {
      email: "",
      showModalEmail: false,
      photo: null,
    };
  },
  computed: {
    isPhotoSet() {
      const store = useAuthStore();
      return !!store.profilePhoto;
    },
  },
  methods: {
    isEmailValid() {
      return /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(this.email);
    },
    async onSubmit(e) {
      e.preventDefault();
      if (!this.isEmailValid()) return;
      const store = useAuthStore();
      if (this.photo && !store.profilePhoto) {
        store.setProfilePhoto(this.photo);
      }
      // запрос на сервер
      // await api.recovery(this.email);
      this.showModalEmail = true;
    },
  },
};
</script>

<style lang="scss">
.recovery {
  &__head {
  }
  &__body {
  }
  &__back {
    margin: 0 0 24px;
  }
  &__info {
  }
  &__title {
    margin-bottom: 15px;
  }
}
.recovery-form {
  &__btns {
    display: flex;
    flex-direction: column;
    a {
      width: 100%;

      text-align: center;
    }
  }
}
</style>
