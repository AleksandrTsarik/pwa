<template>
  <div class="bg-block--beige recovery">
    <div class="bg-block__haed">
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
    <div class="recovery__body bg-block--white">
      <div class="recovery__container">
        <form>
          <div class="recovery-form__inputs">
            <Input v-model="email" name="Email" type="text" />
          </div>
          <div class="recovery-form__btns">
            <router-link to="" class="btn btn-primary">Продолжить</router-link>
            <router-link to="/log-in" class="btn btn-transparent">
              Назад
            </router-link>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import Svg from "../../components/TheSvg.vue";
import Input from "../../components/UI/TheInput.vue";
export default {
  components: {
    Svg,
    Input,
  },
  data() {
    return {
      email: "",
    };
  },
  methods: {
    isEmailValid() {
      return /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(this.email);
    },
  },
};
</script>

<style lang="scss">
.recovery {
  &__head {
  }
  &__body {
    padding: 30px 0;
  }
  &__back {
    margin: 40px 0 24px;
  }
  &__info {
    margin: 0 0 30px;
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
