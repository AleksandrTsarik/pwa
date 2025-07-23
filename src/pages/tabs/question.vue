<template>
  <div class="questions bg-block--beige">
    <div class="questions__head block-head">
      <div class="questions__container">
        <h2 class="title questions__title">Вопросы и ответы</h2>
      </div>
    </div>
    <div class="questions__body bg-block--white block-body">
      <div class="questions__container">
        <div class="questions__list">
          <div
            class="questions__item questions-item"
            v-for="(item, index) in questions"
            :key="index"
            @click="toggleAccordion(index)"
            :class="{ active: isOpen === index }"
          >
            <span class="questions-item__arrow">
              <svg
                width="12"
                height="8"
                viewBox="0 0 12 8"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0.999999 0.997767L6 6.14062L11 0.997768"
                  stroke="#1D1F76"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </span>
            <div class="questions-item__name">
              {{ item.title }}
            </div>
            <div
              class="questions-item__content"
              :class="{ active: isOpen === index }"
            >
              <div class="questions-item__text" v-if="item.text">
                {{ item.text }}
              </div>
              <div class="questions-item__more">
                <button v-if="item.commend == true">
                  <span>Рекомендовать</span>
                  <span>
                    <svg
                      width="18"
                      height="16"
                      viewBox="0 0 18 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M16.5 8L10.0714 14.25M16.5 8L10.0714 1.75M16.5 8L1.5 8"
                        stroke="#1D1D1D"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      questions: [
        {
          title: "Когда начинается моя подписка СпортКлюч?",
          text: "",
        },
        {
          title: "Что мне нужно знать перед первой тренировкой со СпортКлюч?",
          text: "",
        },
        {
          title:
            "Сколько спортивных мероприятий я могу посещать с картой СпортКлюч?",
          text: "",
        },
        {
          title: "Как часто я могу использовать свою карту?",
          text: "",
        },
        {
          title:
            "Можно ли использовать цифровую карту СпортКлюч на нескольких устройствах?",
          text: "",
        },
        {
          title: "Можно ли изменить фото в приложении СпортКлюч?",
          text: "",
        },
        {
          title:
            "Как я могу порекомендовать спортивное заведение для включения в программу СпортКлюч?",
          text: "Есть любимый зал, студия или бассейн, которых у нас ещё нет? Напиши нам через форму обратной связи или на почту partners@SportsKey.ru — мы свяжемся с заведением и постараемся добавить его в список партнёров.",
          commend: true,
        },
        {
          title: "Могу ли я получить карту для члена семьи или друга?",
          text: "",
        },
      ],
      isOpen: null,
    };
  },
  methods: {
    handleClick(index) {
      this.toggleAccordion(index);
    },
    toggleAccordion(index) {
      if (this.isOpen === index) {
        this.isOpen = null;
      } else {
        this.isOpen = index;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.questions {
  &__list {
    counter-reset: num;
  }
  &__item {
    counter-increment: num;
    border-bottom: solid 1px rgba(229, 229, 229, 1);
    position: relative;
    padding-left: 55px;
    padding-top: 20px;
    padding-bottom: 20px;
    &:before {
      content: ("0") counter(num);
      font-size: 16px;
      color: var(--text);
      display: flex;
      align-items: center;
      justify-content: center;
      flex: 0 0 40px;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      border: solid 1px rgba(229, 229, 229, 1);
      position: absolute;
      left: 0;
      top: 10px;
      @media (max-width: 400px) {
        top: 25px;
      }
    }
  }
}
.questions-item {
  cursor: pointer;
  &__name {
    padding-right: 60px;
    font-size: 16px;
    font-weight: 500;
    font-family: var(--stetica);
  }
  &__content {
    padding-right: 60px;
    opacity: 0;
    visibility: hidden;
    height: 0;
    transition: 0.3s;
    &.active {
      opacity: 1;
      visibility: visible;
      height: auto;
      .questions-item__text {
        padding-top: 20px;
      }
    }
  }
  &__text {
    font-size: 16px;
    font-weight: 400;
    font-family: var(--ff);
  }
  &__arrow {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 10px;
    right: 0;
    width: 40px;
    height: 40px;
    flex: 0 0 40px;
    border-radius: 50%;
    border: solid 1px rgba(229, 229, 229, 1);
    transition: 0.3s;
    @media (max-width: 400px) {
      top: 25px;
    }
  }
  &__more {
    button {
      color: #fff;
      display: flex;
      align-items: center;
      margin-top: 20px;
      margin-left: 0;
      padding-left: 0;
      span {
        &:first-child {
          display: inline-flex;
          background-color: var(--darkSecondary);
          border-radius: 50px;
          padding: 16px 35px;
          height: 50px;
          font-size: 14px;
          font-weight: 700;
          font-family: var(--ff);
        }
        &:last-child {
          display: flex;
          width: 50px;
          height: 50px;
          flex: 0 0 50px;
          border-radius: 50%;
          background-color: var(--primary);
          align-items: center;
          justify-content: center;
          margin-left: -10px;
        }
      }
    }
  }
  &.active {
    .questions-item__arrow {
      transform: rotate(180deg);
    }
  }
}
</style>
