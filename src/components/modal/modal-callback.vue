<template>
  <div class="modal modal-callback">
    <div class="modal__overlay" @click="$emit('close')"></div>
    <div class="modal__wrap modal-callback__wrap">
      <div
        class="modal__close modal-callback__close"
        @click="$emit('close')"
      ></div>
      <div class="modal__content">
        <div class="modal__form">
          <form>
            <div class="modal-callback-form">
              <div class="modal-callback-form__title">
                Рекомендовать спортивный объект
              </div>
              <div class="modal-callback-form__subtitle">
                Если вы хотите видеть определённый спортивный объект в нашей
                партнёрской сети — просто заполните эту форму. Мы рассмотрим
                вашу рекомендацию и свяжемся с клубом. Будем рады, если вы
                оставите свои контакты, мы сможем сообщить результат заявки.
              </div>
              <div class="modal-callback-form-info">
                <div class="modal-callback-form-info__name"></div>
                <div class="modal-callback-form-info__first-name"></div>
                <div class="modal-callback-form-info__email"></div>
              </div>
              <div class="modal-callback-form__inputs">
                <Input placeholder="Спортивный объект" type="text" />
                <Select
                  :options="select"
                  :selected="selected"
                  @select="optionsSelect"
                />
                <Input placeholder="Адрес" type="text" />
              </div>
            </div>
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
import Input from "../../components/UI/TheInput.vue";
import Select from "../../components/UI/TheSelect.vue";
export default {
  components: { Button, Input, Select },
  methods: {
    optionsSelect(option) {
      this.selected = option.name;
      console.log(this.selected);
    },
  },
  data() {
    return {
      selected: "Город",
      select: [
        {
          name: "Мосвка",
          value: "Мосвка",
        },
        {
          name: "Санкт-Петербург",
          value: "Санкт-Петербург",
        },
        {
          name: "Владивосток",
          value: "Владивосток",
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.modal-callback {
  padding: 24px;
  &__wrap {
    max-width: 480px;
  }
  &__close {
    display: flex;
    flex: 0 0 40px;
    height: 40px;
    width: 40px;
    border: solid 1px var(--gray);
    border-radius: 50%;
    background-color: #fff;
    position: absolute;
    top: 24px;
    right: 24px;
    z-index: 10;
    cursor: pointer;
    &:after,
    &:before {
      content: "";
      display: block;
      width: 50%;
      height: 1px;
      background-color: var(--text);
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
    &:before {
      transform: translate(-50%, -50%) rotate(45deg);
    }
    &:after {
      transform: translate(-50%, -50%) rotate(-45deg);
    }
  }
}
.modal-callback-form {
  &__title {
    padding-right: 60px;
    font-size: 24px;
    font-weight: 500;
    font-family: var(--static);
    margin-bottom: 14px;
  }
}
</style>
