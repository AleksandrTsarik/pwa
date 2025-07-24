<template>
  <div class="profile bg-block--primary">
    <div class="profile__head block-head">
      <div class="profile__container">
        <h2 class="title profile__title">Профиль</h2>
        <div class="profile__photo">
          <img v-if="profilePhoto" :src="profilePhoto" alt="photo" />
        </div>
      </div>
    </div>
    <div class="profile__body bg-block--white block-body">
      <div class="profile__container">
        <div class="profile-info">
          <div class="profile-info__user">
            <div class="profile-info__name">Виктор Куликов</div>
            <div class="profile-info__position">Менеджер проектов</div>
          </div>
          <Card :cardOptions="cardInfo" />

          <div class="profile-info__visit">
            <div class="profile-info__visit-title">
              Посещений на этой неделе
            </div>
            <div class="profile-info__visit-list">
              <div
                class="profile-info__visit-item"
                v-for="(item, i) in visitList"
                :key="i"
              >
                <span
                  v-if="item.visibility"
                  :class="{ visit: item.visibility }"
                >
                  <svg
                    width="9"
                    height="6"
                    viewBox="0 0 9 6"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7.58146 0.200722C7.71862 0.0726072 7.90378 0.000504724 8.09691 2.63976e-06C8.29003 -0.000499445 8.47561 0.0706392 8.61352 0.198039C8.75143 0.325439 8.83059 0.498863 8.83388 0.680818C8.83717 0.862773 8.76433 1.03864 8.63111 1.17039L4.71868 5.77863C4.65144 5.84688 4.57029 5.90164 4.48007 5.93966C4.38985 5.97767 4.29242 5.99816 4.19361 5.99988C4.0948 6.00161 3.99664 5.98454 3.90499 5.94969C3.81334 5.91485 3.73009 5.86295 3.66021 5.7971L1.06793 3.35353C0.995717 3.29013 0.937792 3.21366 0.897618 3.1287C0.857443 3.04374 0.83584 2.95202 0.834099 2.85902C0.832357 2.76603 0.850513 2.67365 0.887482 2.58741C0.924451 2.50116 0.979477 2.42282 1.04928 2.35705C1.11907 2.29128 1.20222 2.23943 1.29374 2.20459C1.38527 2.16976 1.48331 2.15265 1.582 2.15429C1.6807 2.15593 1.77803 2.17629 1.8682 2.21414C1.95836 2.252 2.03951 2.30658 2.10681 2.37463L4.15907 4.30751L7.56284 0.221039C7.56891 0.213884 7.57546 0.207098 7.58244 0.200722H7.58146Z"
                      fill="white"
                    />
                  </svg>
                </span>
              </div>
            </div>
            <div class="profile-info__visit-info">
              Ваша карта активна до <span> 25 мая 2026 года</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Card from "../../components/TheCard.vue";
export default {
  components: { Card },
  data() {
    return {
      cardInfo: {
        cardTtariff: "gold",
        tariff: "326 мест",
      },
      visitList: [
        {
          day: "",
          visibility: true,
        },
        {
          day: "",
          visibility: false,
        },
        {
          day: "",
          visibility: true,
        },
        {
          day: "",
          visibility: false,
        },
        {
          day: "",
          visibility: false,
        },
        {
          day: "",
          visibility: true,
        },
        {
          day: "",
          visibility: true,
        },
      ],
      profilePhoto: null,
    };
  },
  mounted() {
    this.profilePhoto = localStorage.getItem("profilePhoto");
  },
  watch: {
    $route() {
      this.profilePhoto = localStorage.getItem("profilePhoto");
    },
  },
};
</script>

<style lang="scss" scoped>
.profile {
  &__head {
    position: relative;
    padding-bottom: 105px;
  }
  &__photo {
    position: absolute;
    left: 50%;
    bottom: -100px;
    transform: translateX(-50%);
    width: 190px;
    height: 190px;
    overflow: hidden;
    border-radius: 50%;
    border: solid 2px #fff;
    background-color: #dedede;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
}
.profile-info {
  margin: 90px auto 0;
  display: flex;
  align-items: center;
  flex-direction: column;
  &__user {
    margin-bottom: 30px;
  }
  &__name {
    font-size: 26px;
    font-weight: 500;
    font-family: var(--stetica);
    margin-bottom: 5px;
  }
  &__position {
    font-size: 22px;
    font-weight: 400;
    font-family: var(--ff);
  }

  &__visit {
    border-radius: 12px;
    background-color: var(--lightSecondary);
    width: 100%;
    max-width: 330px;
    padding: 16px 24px;

    margin-top: 10px;
  }
  &__visit-title {
    font-size: 14px;
    font-weight: 400;
    font-family: var(--ff);
  }
  &__visit-list {
    margin: 10px auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  &__visit-item {
    display: block;
    flex: 0 0 28px;
    width: 28px;
    height: 28px;
    border-radius: 50%;
    background-color: #fff;
    span {
      display: block;
      width: 100%;
      height: 100%;
      border-radius: 50%;
      position: relative;
      svg {
        display: block;
        position: absolute;
        left: 48%;
        top: 52%;
        transform: translate(-50%, -50%);
      }
      &.visit {
        background-color: var(--darkSecondary);
      }
    }
  }
  &__visit-info {
    font-size: 12px;
    font-weight: 500;
    font-family: var(--ff);
    span {
      font-weight: 700;
    }
  }
}
</style>
