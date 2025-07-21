<template>
  <div class="bg-block--beige password">
    <div class="password__head">
      <div class="password__container">
        <div class="password__info">
          <h2 class="title password__title">Создание пароля</h2>
          <div class="password-check">
            <div class="password-check__title">
              <p>Пароль должен содержать</p>
              <span v-if="isPasswordValid">Сильный</span>
            </div>
            <div class="password-check__list">
              <div class="password-check__item">
                <div class="password-check__ico">
                  <Svg v-if="!passwordChecks.length" type="atention"></Svg>
                  <Svg v-else type="check"></Svg>
                </div>
                <div class="password-check__name">Минимум 8 символов</div>
              </div>
              <div class="password-check__item">
                <div class="password-check__ico">
                  <Svg v-if="!passwordChecks.letter" type="atention"></Svg>
                  <Svg v-else type="check"></Svg>
                </div>
                <div class="password-check__name">Минимум 1 буква</div>
              </div>
              <div class="password-check__item">
                <div class="password-check__ico">
                  <Svg v-if="!passwordChecks.digit" type="atention"></Svg>
                  <Svg v-else type="check"></Svg>
                </div>
                <div class="password-check__name">Минимум 1 цифра</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="password__body bg-block--white">
      <div class="password__container">
        <form @submit="onSubmit" class="password-form">
          <div class="password-form__inputs">
            <Input v-model="password" name="Новый пароль" type="password" />
            <Input
              v-model="password2"
              name="Подтвердить пароль"
              type="password"
              :disabled="!isPasswordValid"
              :class="{ 'input-error': password2 && !isPasswordsMatch }"
            />
            <div v-if="password2 && !isPasswordsMatch" class="password-error">
              Пароли не совпадают
            </div>
          </div>
          <div class="password-form__btns">
            <Button
              class="btn btn-primary"
              label="Продолжить"
              :disabled="!isPasswordValid || !isPasswordsMatch"
            />
          </div>
        </form>
      </div>
    </div>
  </div>
  <ModalPassword v-if="showModalPassword" @close="showModalPassword = false" />
</template>

<script>
import Svg from "../../components/TheSvg.vue";
import Input from "../../components/UI/TheInput.vue";
import Button from "../../components/UI/TheButton.vue";
import ModalPassword from "../../components/modal/modal-password.vue";
export default {
  components: {
    Svg,
    Input,
    Button,
    ModalPassword,
  },
  data() {
    return {
      password: "",
      password2: "",
      showModalPassword: false,
    };
  },
  computed: {
    passwordChecks() {
      const pass = this.password;
      return {
        length: pass.length >= 8,
        letter: /[A-Za-z]/.test(pass),
        digit: /[0-9]/.test(pass),
      };
    },
    isPasswordValid() {
      const c = this.passwordChecks;
      return c.length && c.letter && c.digit;
    },
    isPasswordsMatch() {
      return (
        this.password && this.password2 && this.password === this.password2
      );
    },
  },
  methods: {
    isEmailValid() {
      return /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(this.email);
    },
    async onSubmit(e) {
      e.preventDefault();
      if (!this.isPasswordValid || !this.isPasswordsMatch) return;
      // запрос на сервер
      // await api.password(this.password);
      this.showModalPassword = true;
    },
  },
};
</script>

<style lang="scss">
.password {
  &__head {
    padding-bottom: 30px;
  }
  &__body {
    padding: 30px 0;
  }
  &__title {
    padding: 30px 0 20px;
  }
}
.password-form {
  input {
    &.input-error {
      border-color: red !important;
    }
  }
}
.password-check {
  &__item {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 5px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  &__title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;
    p {
      font-size: 14px;
      font-weight: 700;
    }
    span {
      display: block;
      font-size: 12px;
      font-weight: 400;
      color: var(--darkSecondary);
    }
  }
}
.password-error {
  color: #d32f2f;
  font-size: 13px;
  margin: 8px 0;
}
</style>
