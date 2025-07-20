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
          <div class="reg-form-wrap">
            <form>
              <div class="reg-form">
                <div class="reg-form__switch">
                  <div class="switch-bg" :class="{ right: !isLogin }"></div>
                  <button
                    :class="{ active: isLogin }"
                    @click.prevent="isLogin = true"
                    type="button"
                  >
                    Вход
                  </button>
                  <button
                    :class="{ active: !isLogin }"
                    @click.prevent="isLogin = false"
                    type="button"
                  >
                    Регистрация
                  </button>
                </div>

                <div
                  v-if="isLogin"
                  class="reg-form__log-in reg-form-logIn reg-form-grow"
                >
                  <div class="reg-form-logIn__inputs">
                    <Input type="text" placeholder="Email" />
                    <Input type="text" placeholder="Пароль" />
                  </div>
                  <div class="reg-form-logIn__btns">
                    <Button label="Войти" class="btn-primary" />
                    <router-link to="/recovery" class="btn btn-transparent"
                      >Забыли пароль?</router-link
                    >
                  </div>
                </div>

                <div v-else class="reg-form__sign-in reg-form-grow">
                  <p>
                    К сожалению, самостоятельно зарегистрироваться нельзя.
                    Только работодатель может купить абонемент для своих
                    сотрудников.
                  </p>
                  <div class="reg-form-logIn__btns">
                    <Button label="Войти" class="btn-primary" />
                    <router-link to="/recovery" class="btn btn-transparent"
                      >Забыли пароль?</router-link
                    >
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Svg from "../../components/TheSvg.vue";
import Input from "../../components/UI/TheInput.vue";
import Button from "../../components/UI/TheButton.vue";

export default {
  components: {
    Svg,
    Input,
    Button,
  },
  data() {
    return {
      isLogin: true,
    };
  },
};
</script>

<style lang="scss" scoped>
.reg {
  height: 100vh;
}
.reg-entrance {
  display: flex;
  flex-direction: column;
  height: 100%;
  &__head {
  }
  &__body {
    flex-grow: 1;
    .reg-entrance__container {
      height: 100%;
      display: flex;
      flex-direction: column;
    }
    form {
      height: 100%;
    }
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
.reg-form-wrap {
  flex-grow: 1;
}
.reg-form {
  //min-height: 80vh;
  height: 100%;
  display: flex;
  flex-direction: column;
  &__sign-in {
    p {
      font-size: 14px;
    }
  }
  &__log-in {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
  }
  &__switch {
    position: relative;
    display: inline-flex;
    margin-bottom: 24px;
    background: var(--lightSecondary);
    padding: 4px;
    border-radius: 50px;
    height: 40px;
    width: 180px;
    line-height: 40px;

    .switch-bg {
      position: absolute;
      top: 4px;
      left: 4px;
      min-width: 86px;
      height: 32px;
      background: #ffd37e;
      border-radius: 50px;
      transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      z-index: 1;
      will-change: transform;
    }
    .switch-bg.right {
      transform: translateX(100%);
    }
    button {
      position: relative;
      z-index: 2;
      flex: 0 0 86px;
      border-radius: 16px;
      font-size: 12px;
      text-align: center;
      cursor: pointer;
      transition: color 0.2s, font-weight 0.2s;
      &.active {
      }
    }
  }
}
.reg-form-logIn {
  &__btns {
    margin-top: auto;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
}
.reg-form-grow {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}
</style>
