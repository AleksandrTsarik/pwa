<template>
  <div class="code bg-block--primary">
    <div class="code__head block-head">
      <div class="code__container">
        <h2 class="title code__title">QR-код</h2>
      </div>
    </div>

    <div class="code__body bg-block--white block-body">
      <div class="code__container" v-if="users.length > 0">
        <Slider
          :options="optionsSlider"
          :slider="users"
          :typeSlider="'code'"
          :class="'slider-code slider-swiper'"
        />
      </div>
      <div class="code__container" v-else>
        <div class="code__body bg-block--white block-body">
          <div class="no-qr-message">
            <p>QR-коды недоступны</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Slider from "../../components/UI/TheSwiper.vue";
import { useAuthStore } from "../../store/auth";
import demoUser from "../../demo/demoUser";

export default {
  components: { Slider },
  data() {
    return {
      optionsSlider: {
        loop: false,
        centeredSlides: true,
        spaceBetween: 20,
        slidesPerView: 1,
        slidesPerGroup: 1,
        autoHeight: false,
        pagination: {
          clickable: true,
          //dynamicBullets: true,
        },
        modules: "modules",
        mousewheel: false,
        navigation: true,
      },
      users: [],
      timers: {},
    };
  },
  mounted() {
    this.auth = useAuthStore();
    this.initializeUsers();
    this.startTimers();
    this.updateMainUserPhoto();

    // Слушаем изменения в localStorage
    window.addEventListener("storage", this.handleStorageChange);
  },
  beforeUnmount() {
    this.clearAllTimers();
    window.removeEventListener("storage", this.handleStorageChange);
  },
  computed: {
    currentUser() {
      return this.auth?.user || demoUser;
    },
  },
  methods: {
    initializeUsers() {
      const user = this.currentUser;
      this.users = [];

      // Добавляем основного пользователя
      if (user.qrCode) {
        // Получаем фото из localStorage, которое было сохранено при входе
        const profilePhoto =
          localStorage.getItem("profilePhoto") ||
          this.auth.profilePhoto ||
          user.photo ||
          "/img/default-avatar.png";

        this.users.push({
          photo: profilePhoto,
          name: user.firstName,
          lastName: user.lastName,
          qrCode: user.qrCode,
          qrCodeTime: user.qrCodeTime,
          isMainUser: true,
        });
      }

      // Добавляем членов семьи, если они есть
      if (user.family && user.family.length > 0) {
        user.family.forEach((member) => {
          if (member.qrCode) {
            this.users.push({
              photo: member.photo,
              name: member.name,
              lastName: member.lastName,
              qrCode: member.qrCode,
              qrCodeTime: member.qrCodeTime,
              isMainUser: false,
            });
          }
        });
      }
    },

    startTimers() {
      this.users.forEach((user, index) => {
        this.startTimer(index, user.qrCodeTime);
      });
    },

    startTimer(userIndex, initialTime) {
      // Парсим время в формате MM:SS
      const [minutes, seconds] = initialTime.split(":").map(Number);
      let totalSeconds = minutes * 60 + seconds;

      // Очищаем предыдущий таймер для этого пользователя
      if (this.timers[userIndex]) {
        clearInterval(this.timers[userIndex]);
      }

      // Создаем новый таймер
      this.timers[userIndex] = setInterval(() => {
        if (totalSeconds > 0) {
          totalSeconds--;
          const newMinutes = Math.floor(totalSeconds / 60);
          const newSeconds = totalSeconds % 60;
          const newTime = `${newMinutes
            .toString()
            .padStart(2, "0")}:${newSeconds.toString().padStart(2, "0")}`;

          // Обновляем время в массиве пользователей
          this.users[userIndex].qrCodeTime = newTime;
        } else {
          // Таймер достиг 0, останавливаем
          clearInterval(this.timers[userIndex]);
          this.users[userIndex].qrCodeTime = "00:00";
        }
      }, 1000);
    },

    clearAllTimers() {
      Object.values(this.timers).forEach((timer) => {
        if (timer) {
          clearInterval(timer);
        }
      });
      this.timers = {};
    },

    updateMainUserPhoto() {
      // Обновляем фото основного пользователя из localStorage или auth store
      const profilePhoto =
        localStorage.getItem("profilePhoto") || this.auth.profilePhoto;
      if (profilePhoto && this.users.length > 0) {
        // Ищем основного пользователя (первый в массиве или с флагом isMainUser)
        const mainUserIndex =
          this.users.findIndex((user) => user.isMainUser === true) || 0;
        if (mainUserIndex >= 0) {
          this.users[mainUserIndex].photo = profilePhoto;
        }
      }
    },

    handleStorageChange(event) {
      // Если изменилось фото профиля, обновляем его в слайдере
      if (event.key === "profilePhoto") {
        this.updateMainUserPhoto();
      }
    },
  },
  watch: {
    // Перезапускаем таймеры при изменении пользователей
    users: {
      handler() {
        this.clearAllTimers();
        this.$nextTick(() => {
          this.startTimers();
        });
      },
      deep: true,
    },
    // Следим за изменением фото в localStorage
    $route() {
      this.updateMainUserPhoto();
    },
  },
};
</script>

<style lang="scss" scoped>
.code {
  overflow: hidden;
  &__container {
  }
  &__title {
    margin-bottom: 50px;
  }
}
.no-qr-message {
  text-align: center;
  padding: 40px 20px;

  p {
    font-size: 16px;
    color: #666;
    font-family: var(--ff);
  }
}
</style>
