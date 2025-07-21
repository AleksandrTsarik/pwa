<template>
  <div class="bg-block--beige recovery">
    <div class="">
      <div class="bg-block--beige">
        <div class="recovery__container">
          <router-link to="/log-in">
            <Svg type="arrowBack"></Svg>
            <h2 class="title recovery__title">Восстановление пароля</h2>
            <div class="recovery__subtitle">
              Напиши свою корпоративную почту, и мы отправим письмо с ссылкой
              для восстановления пароля
            </div>
          </router-link>
        </div>
      </div>
      <div class="recovery__body bg-block--white">
        <div class="recovery__container">
          <form>
            <div class="reg-form-logIn__inputs">
              <Input type="text" :name="'Email'" />
            </div>
            <div class="reg-form-logIn__btns">
              <Button label="Войти" class="btn-primary" />
              <router-link to="/recovery" class="btn btn-transparent"
                >Забыли пароль?</router-link
              >
            </div>
          </form>
        </div>
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
};
</script>

<style lang="scss" scoped></style>
