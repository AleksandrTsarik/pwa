<template>
  <div class="profile bg-block--primary">
    <div class="profile__head block-head">
      <div class="profile__container-small">
        <h2 class="title profile__title">Профиль</h2>
        <div class="profile__photo">
          <span class="profile__photo-fix" @click="openPhotoModal">
            <svg
              width="19"
              height="18"
              viewBox="0 0 19 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.9492 3.95156L14.5492 7.55155M1.94922 16.5516L6.3152 15.6718C6.54698 15.6251 6.7598 15.511 6.92693 15.3438L16.7006 5.56474C17.1692 5.09588 17.1689 4.33589 16.6999 3.86743L14.6295 1.79936C14.1607 1.33109 13.4011 1.33141 12.9327 1.80007L3.15798 11.5801C2.99117 11.747 2.87727 11.9594 2.83052 12.1907L1.94922 16.5516Z"
                stroke="black"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </span>
          <img v-if="profilePhoto" :src="profilePhoto" alt="photo" />
        </div>
      </div>
    </div>
    <ModalPhoto
      v-if="showPhotoModal"
      ref="modalPhoto"
      @update:modelValue="onPhotoSelected"
      @close="showPhotoModal = false"
    />
    <div class="profile__body bg-block--white block-body">
      <div class="profile__container-small">
        <div class="profile-info">
          <div class="profile-info__user">
            <div class="profile-info__name">
              {{ user.firstName }} {{ user.lastName }}
            </div>
            <div class="profile-info__position">{{ user.position }}</div>
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

          <div class="profile-info-user">
            <div class="profile-info-user__item">
              <div class="profile-info-user__title">Общая информация</div>
              <div class="profile-info-user__row">
                <p>Почта</p>
                <p>{{ user.email }}</p>
              </div>
              <div class="profile-info-user__row">
                <p>Телефон</p>
                <p>{{ user.phone }}</p>
              </div>
            </div>

            <div class="profile-info-user__item">
              <div class="profile-info-user__title">Место работы</div>
              <div class="profile-info-user__row">
                <p>Название компании</p>
                <p>{{ user.company }}</p>
              </div>
              <div class="profile-info-user__row">
                <p>Город</p>
                <p>{{ user.city }}</p>
              </div>
            </div>
          </div>
        </div>
        <div class="profile-exit">
          <button class="" @click="logout">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.6471 5.80001V3.70001C12.6471 3.14305 12.424 2.60891 12.0268 2.21508C11.6297 1.82126 11.091 1.60001 10.5294 1.60001H3.11765C2.55601 1.60001 2.01738 1.82126 1.62024 2.21508C1.22311 2.60891 1 3.14305 1 3.70001V16.3C1 16.857 1.22311 17.3911 1.62024 17.7849C2.01738 18.1788 2.55601 18.4 3.11765 18.4H10.5294C11.091 18.4 11.6297 18.1788 12.0268 17.7849C12.424 17.3911 12.6471 16.857 12.6471 16.3V14.2M6.29412 10H19M19 10L15.8235 6.85001M19 10L15.8235 13.15"
                stroke="#2D2D2D"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>

            <p>Выйти</p>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Card from "../../components/TheCard.vue";
import ModalPhoto from "../../components/modal/modal-photo.vue";
import { useAuthStore } from "../../store/auth";
import demoUser from "../../demo/demoUser";
export default {
  components: { Card, ModalPhoto },
  data() {
    return {
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
      showPhotoModal: false,
    };
  },
  mounted() {
    this.auth = useAuthStore();
    this.profilePhoto =
      this.auth.profilePhoto || localStorage.getItem("profilePhoto");
  },
  computed: {
    user() {
      return this.auth?.user || demoUser;
    },
    cardInfo() {
      // cardTtariff и tariff из user, если есть, иначе из demoUser
      const u = this.user;
      return {
        cardTtariff: u.cardTtariff || demoUser.cardTtariff,
        tariff: u.tariff || demoUser.tariff,
        company: u.company,
        city: u.city,
      };
    },
  },
  watch: {
    $route() {
      this.profilePhoto = localStorage.getItem("profilePhoto");
    },
  },
  methods: {
    logout() {
      this.auth.logout();
      localStorage.clear();
      this.$router.replace({ path: "/log-in" });
    },
    openPhotoModal() {
      this.showPhotoModal = true;
      this.$nextTick(() => {
        if (this.$refs.modalPhoto && this.$refs.modalPhoto.openFileDialog) {
          this.$refs.modalPhoto.openFileDialog();
        }
      });
    },
    onPhotoSelected(photo) {
      if (photo) {
        this.auth.setProfilePhoto(photo);
        this.profilePhoto = photo;
      }
      this.showPhotoModal = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.profile {
  .photo-wrap {
    .photo-selector {
      display: none !important;
    }
  }
  &__photo-fix {
    display: flex;
    width: 56px;
    height: 56px;
    flex: 0 0 56px;
    border-radius: 50%;
    border: solid 3px #fff;
    position: absolute;
    right: 0;
    bottom: 0;
    background-color: var(--primary);
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }
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
    //overflow: hidden;
    border-radius: 50%;
    border: solid 3px #fff;
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
    padding: 20px 24px;

    margin-top: 10px;
    @media (max-width: 575px) {
      padding: 15px 15px;
    }
  }
  &__visit-title {
    font-size: 14px;
    font-weight: 400;
    font-family: var(--ff);
  }
  &__visit-list {
    margin: 20px auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    @media (max-width: 575px) {
      margin: 10px auto;
    }
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

.profile-info-user {
  margin-top: 40px;
  width: 100%;
  // max-width: 330px;
  &__item {
    margin-bottom: 40px;
  }
  &__title {
    font-size: 16px;
    font-weight: 500;
    font-family: var(--stetica);
    margin-bottom: 20px;
  }
  &__row {
    border-bottom: solid 1px var(--gray);
    padding-bottom: 14px;
    margin-bottom: 14px;
    &:last-child {
      border-bottom: none;
    }
    p {
      font-family: var(--ff);
      color: #4e5e6b;
      &:first-child {
        font-size: 12px;
        margin-bottom: 5px;
      }
      &:last-child {
        font-size: 16px;
      }
    }
  }
}
.profile-exit {
  width: 100%;
  // max-width: 330px;
  margin: 0 auto;
  button {
    padding: 0;
    display: flex;
    align-items: center;
    gap: 5px;
  }
}
</style>
