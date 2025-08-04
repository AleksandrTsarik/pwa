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
                <div class="modal-callback-form-info__name">
                  {{ userData.name }}
                </div>
                <div class="modal-callback-form-info__first-name">
                  {{ userData.lastName }}
                </div>
                <div class="modal-callback-form-info__email">
                  {{ userData.email }}
                </div>
              </div>
              <div class="modal-callback-form__inputs">
                <Input
                  v-model="formData.sportObject"
                  placeholder="Спортивный объект"
                  type="text"
                />
                <Select
                  :options="select"
                  :selected="selected"
                  placeholder="Выберите город"
                  @select="optionsSelect"
                />
                <Input
                  v-model="formData.address"
                  placeholder="Адрес"
                  type="text"
                />
                <div class="form-textarea">
                  <textarea
                    v-model="formData.additionalInfo"
                    placeholder="Дополнительная информация"
                  ></textarea>
                </div>
              </div>
              <div class="modal-callback-form__finish">
                <div class="modal-callback-form__send">
                  <button
                    type="button"
                    class="btn btn-primary"
                    @click="submitForm"
                  >
                    Отправить
                  </button>
                </div>
                <div class="modal-callback-form__text">
                  Оставляя контакты, вы соглашаетесь с
                  <a href="#" target="_blank">
                    Политикой обработки персональных данныъ</a
                  >
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Button from "../../components/UI/TheButton.vue";
import Input from "../../components/UI/TheInput.vue";
import Select from "../../components/UI/TheSelect.vue";
import { useAuthStore } from "../../store/auth";
import demoUser from "../../demo/demoUser";

export default {
  components: { Button, Input, Select },
  data() {
    return {
      selected: "",
      select: [
        {
          name: "Москва",
          value: "Москва",
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
      formData: {
        sportObject: "",
        address: "",
        additionalInfo: "",
        city: "",
      },
    };
  },
  computed: {
    userData() {
      const auth = useAuthStore();
      const user = auth?.user || demoUser;

      return {
        fullName: `${user.firstName} ${user.lastName}`,
        firstName: user.firstName,
        lastName: user.lastName,
        name: user.firstName,
        email: user.email,
        phone: user.phone,
        position: user.position,
        company: user.company,
        city: user.city,
      };
    },
  },
  methods: {
    optionsSelect(option) {
      this.selected = option.name;
      this.formData.city = option.name;
      console.log(this.selected);
    },

    submitForm() {
      // Сброс формы
      this.resetForm();

      // Закрытие модального окна
      this.$emit("close");
    },

    resetForm() {
      this.formData = {
        sportObject: "",
        address: "",
        additionalInfo: "",
        city: "",
      };
      this.selected = "";
    },
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
  &__subtitle {
    font-size: 14px;
    font-weight: 400;
    font-family: var(--ff);
    color: #666;
    line-height: 1.5;
    margin-bottom: 20px;
  }
  &__finish {
    display: flex;
    flex-direction: column;
  }
  &__text {
    font-size: 14px;
    a {
      color: var(--darkSecondary);
    }
  }
  &__send {
    margin-right: auto;
    margin-bottom: 10px;
  }
  &__inputs {
    margin-bottom: 20px;
    input {
      border-radius: 50px;
    }
  }
  &__finish {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  &__send {
    .btn {
      padding: 12px 24px;
      font-size: 14px;
    }
  }
}

:deep(.input-field) {
  input {
    &:focus,
    &.is-focused,
    &.not-empty {
      background: #fff !important;
      border-color: var(--darkSecondary) !important;
      padding: 15px 20px !important;
    }

    &::placeholder {
      color: #888 !important;
      font-family: var(--ff) !important;
    }
  }

  .input-field__name {
    display: none !important;
  }
}
.modal-callback-form-info {
  div {
    font-size: 20px;
    font-weight: 500;
    font-family: var(--ff);
    margin-bottom: 5px;
    &:last-child {
      margin-bottom: 10px;
    }
  }
}
.form-textarea {
  textarea {
    width: 100%;
    min-height: 100px;
    font-size: 16px;
    border: solid 1px transparent;
    border-radius: 12px;
    background: #e5f0ff;
    outline: none;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    padding: 15px 20px;
    font-family: var(--ff);
    resize: none;

    &:focus {
      background: #fff;
      border-color: var(--darkSecondary);
    }

    &::placeholder {
      color: #888;
      font-family: var(--ff);
    }
  }
}
</style>
