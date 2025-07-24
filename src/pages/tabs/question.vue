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
              <div
                class="questions-item__text"
                v-if="item.text"
                v-html="item.text"
              ></div>
              <div class="questions-item__more">
                <button
                  v-if="item.commend == true"
                  @click.stop="openModalAndCloseAccordion"
                >
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
        <div class="questions__form">
          <form>
            <div class="questions-form">
              <h2 class="questions-form__title title">Форма обратной связи</h2>
              <div class="questions-form__subtitle">
                Не нашли интересующего вопроса? Напишие нам и мы обязательно
                ответим в ближайшее время!
              </div>
              <div class="questions-form__textarea">
                <textarea placeholder="Описание проблемы"></textarea>
              </div>
              <div class="questions-form__btn">
                <Button label="Отправить" type="submit" class="btn-primary" />
              </div>
              <div class="questions-form__finish">
                Оставляя контакты, вы соглашаетесь с
                <a href="#"> Политкой обработки персональных данных</a>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
  <ModalCallback v-if="showModalCallback" @close="showModalCallback = false" />
</template>

<script>
import ModalCallback from "../../components/modal/modal-callback.vue";
import Button from "../../components/UI/TheButton.vue";
export default {
  components: {
    ModalCallback,
    Button,
  },
  data() {
    return {
      showModalCallback: false,
      questions: [
        {
          title: "Что такое СпортКлюч?",
          text: "<p>СпортКлюч — это сервис для сотрудников, созданный для поддержки более здорового и активного образа жизни.</p><p>С ним ты получаешь доступ к сотням спортивных площадок по всей России — от тренажёрных залов и бассейнов до фитнес-студий и теннисных кортов.</p><p>Доступ зависит от твоей подписки: Серебряной, Золотой или Премиум — каждая открывает свои возможности в партнёрской сети.</p>",
        },
        {
          title: "Как работает СпортКлюч?",
          text: "<p>СпортКлюч работает по ежемесячной подписке. Оформить доступ можно только через своего работодателя — это корпоративная льгота.</p>После подключения ты получаешь доступ в Личный кабинет и сразу можешь начинать тренироваться.<p></p><p>Выбирай заведение из тех, что доступны по твоей подписке, находи то, что тебе по душе, надевай форму — и вперёд, на тренировку!</p>",
        },
        {
          title: "Как часто я могу использовать свою карту?",
          text: "<p>Ты можешь выбирать любую одну активность каждый день. Это значит, что за месяц ты можешь посетить до 31 занятие!</p>",
        },
        {
          title: "Кто входит в список партнёров СпортКлюч?",
          text: "<p>В числе наших партнёров — тренажёрные залы, бассейны, спортивные школы, теннисные корты и многие другие. </p><p>Мы постоянно расширяем сеть партнёрских заведений, чтобы ты мог выбрать то, что тебе по душе.Важно: доступ к заведениям зависит от твоей подписки (Серебряная, Золотая или Премиум).Полный список и фильтрацию по уровням подписки можно посмотреть здесь: Сеть партнёров СпортКлюч.</p>",
        },
        {
          title: "Где можно пользоваться картой СпортКлюч?",
          text: "<p>Ты можешь посещать любые заведения из партнёрской сети, которые подходят для твоего типа подписки.</p><p>Актуальную географию посещений и доступные для тебя объекты <a href='#'>смотри здесь</a></p>",
        },
        {
          title: "Когда начинается моя подписка СпортКлюч?",
          text: "<p>Твоя подписка станет активной с 1 числа следующего месяца. После входа в Личный кабинет загрузи фотографию и проверь, что твой профиль верифицирован — и можно начинать!</p>",
        },
        {
          title: "Что мне нужно знать перед первой тренировкой со СпортКлюч?",
          text: "<p>Твой Личный кабинет — это твой пропуск. На входе в зал просто покажи виртуальную карту с QR-кодом и фотографией. Ну и, конечно, не забудь взять с собой энергию и страсть к спорту!</p>",
        },
        {
          title:
            "Сколько спортивных мероприятий я могу посещать с картой СпортКлюч?",
          text: "<p>Ты можешь ходить на одно занятие в день. Каждый день — новая активность! Сегодня — тренажёрный зал, завтра — йога, а в выходные — бассейн. Загляни в каталог партнёров и выбери, что тебе по душе.</p>",
        },
        {
          title: "Как часто я могу использовать свою карту?",
          text: "<p>Ты можешь заниматься каждый день! Это до 31 тренировки в месяц — всё зависит только от твоего настроя.</p>",
        },
        {
          title:
            "Можно ли использовать цифровую карту СпортКлюч на нескольких устройствах?",
          text: "<p>Нет, приложение работает только на одном устройстве. Если нужно — ты можешь сменить устройство, но учти: сделать это можно не чаще 1 раза в месяц.</p>",
        },
        {
          title: "Можно ли изменить фото в приложении СпортКлюч?",
          text: "<p>Да, ты можешь изменить фото в приложении, но это можно сделать ограниченное количество раз. Если возникнут сложности — напиши нам на team@SportsKey.ru, поможем!</p>",
        },
        {
          title:
            "Как я могу порекомендовать спортивное заведение для включения в программу СпортКлюч?",
          text: "<p>Есть любимый зал, студия или бассейн, которых у нас ещё нет? Напиши нам через форму обратной связи или на почту partners@sportskey.ru — мы свяжемся с заведением и постараемся добавить его в список партнёров.  </p>",
          commend: true,
        },
        {
          title: "Могу ли я получить карту для члена семьи или друга?",
          text: "<p>Да, ты можешь оформить до четырех дополнительных карт (две взрослые и две детские). Узнай все детали у HR или в отделе кадров своей компании.</p>",
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
    openModalAndCloseAccordion() {
      this.isOpen = null;
      this.showModalCallback = true;
    },
  },
};
</script>

<style lang="scss">
.questions {
  margin-bottom: 100px;

  &__list {
    counter-reset: num;
    margin-bottom: 60px;
  }

  &__item {
    counter-increment: num;
    border-bottom: solid 1px rgba(229, 229, 229, 1);
    position: relative;
    padding-left: 55px;
    padding-top: 20px;
    margin: 10px 0 10px;
    padding-bottom: 30px;
    @media (max-width: 575px) {
      margin: 0;
      padding-bottom: 20px;
    }
    &:before {
      content: counter(num);
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
    max-height: 0;
    overflow: hidden;
    transition: 0.2s;

    &.active {
      opacity: 1;
      visibility: visible;
      max-height: 500px;

      .questions-item__text {
        padding-top: 20px;
        animation: fadeInUp 0.3s ease-out;
      }
    }
  }

  &__text {
    font-size: 16px;
    font-weight: 400;
    font-family: var(--ff);

    p {
      display: block;
      margin-bottom: 0.3em;
      &:last-child {
        margin-bottom: 0;
      }
    }
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
}

.questions-form {
  background-color: var(--primary);
  border-radius: 16px;
  padding: 24px 14px;

  &__title {
    margin: 15px;
  }

  &__subtitle {
    font-family: var(--ff);
    font-size: 16px;
    font-weight: 400;
    margin-bottom: 20px;
  }

  &__textarea {
    textarea {
      resize: none;
      width: 100%;
      height: 100%;
      border-radius: 16px;
      border: none;
      outline: none;
      min-height: 140px;
      padding: 10px 20px;
      margin-bottom: 20px;
      &::placeholder {
        color: var(--text);
      }
    }
  }
  &__btn {
    margin-bottom: 10px;
  }
  &__finish {
    font-family: var(--ff);
    font-size: 12px;
    font-weight: 400;
    color: var(--text);
    a {
      color: var(--darkSecondary);
      border-bottom: solid 1px var(--darkSecondary);
    }
  }
}
</style>
