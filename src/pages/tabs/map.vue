<template>
  <div class="map">
    <div id="yandexMap" class="map-container"></div>

    <!-- Кнопка для центрирования на Москве -->
    <button
      @click="forceCenterOnMoscow"
      class="moscow-center-btn"
      title="Центрировать на Москве"
    >
      🏛️ Москва
    </button>

    <div
      class="company-swiper"
      v-if="companiesInView.length > 0"
      @touchstart="onTouchStart"
      @touchmove="onTouchMove"
      @touchend="onTouchEnd"
      @mousedown="onMouseDown"
      @mousemove="onMouseMove"
      @mouseup="onMouseUp"
      @mouseleave="onMouseUp"
    >
      <div
        class="company-card"
        v-for="(company, idx) in companiesInView"
        :key="company.id"
        :class="{ active: idx === activeIndex }"
        :style="cardStyle(idx)"
        @click="selectCompany(company)"
      >
        <!-- Отображение изображения в карточке -->
        <img
          :src="company.image || '/img/placeholder.jpg'"
          :alt="company.name"
          class="company-card__image"
          @error="onImageError"
        />
        <div class="company-card__info">
          <h3>{{ company.name }}</h3>
          <p class="company-card__address">{{ company.address }}</p>
          <div class="company-card__meta">
            <span v-if="company.price" class="company-card__price">{{
              company.price
            }}</span>
            <span v-if="company.rating" class="company-card__rating"
              >★ {{ company.rating }}</span
            >
          </div>
        </div>
      </div>
      <slider
        :options="optionsSlider"
        :slider="cards"
        :typeSlider="'map'"
        :class="'slider-map slider-swiper'"
      />
    </div>
  </div>
</template>

<script>
import { ref, onMounted, shallowRef } from "vue";
import demoCompany from "../../demo/demoCompany";
import Slider from "../../components/UI/TheSwiper.vue";

export default {
  components: {
    Slider,
  },
  data() {
    return {
      optionsSlider: {
        loop: true,
        centeredSlides: false,
        spaceBetween: 20,
        pagination: false,
        modules: "modules",
        mousewheel: false,
        breakpoints: {
          1023: {
            slidesPerView: 4,
          },
          575: {
            slidesPerView: 2,
          },
          320: {
            slidesPerView: 1,
            slidesPerGroup: 1,
          },
        },
        navigation: true,
      },
      cards: [
        {
          img: "",
          name: "",
          time: "",
          address: "",
          studio: "",
        },
      ],
    };
  },
  name: "MapDemo",
  setup() {
    // Основные переменные
    const companies = ref(
      demoCompany.cities[0].company.map((c, idx) => ({
        ...c,
        id: idx + 1,
        image: c.logo || null,
        price: c.price || null,
        rating: c.rating || null,
        logo: c.logo || "/img/placeholder.jpg",
        marker: c.marker || "/img/marker.png",
      }))
    );
    const selectedCompany = ref(null);
    const mapInstance = shallowRef(null);
    const userMarker = shallowRef(null);
    const companiesInView = ref([]);
    const activeIndex = ref(0);
    let startX = 0;
    let deltaX = 0;
    let dragging = false;

    // Координаты Москвы
    const moscowCoords = [55.755819, 37.617644];

    // 1. Проверка устройства и геолокации
    const checkDeviceAndGeolocation = async () => {
      console.log("=== ПРОВЕРКА УСТРОЙСТВА И ГЕОЛОКАЦИИ ===");

      // Проверка на мобильное устройство
      const isMobile =
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        );
      console.log("Мобильное устройство:", isMobile);

      // Проверка поддержки геолокации
      if (!navigator.geolocation) {
        console.log("Геолокация не поддерживается браузером");
        return { hasGeolocation: false, isMobile };
      }

      // Проверка разрешения на геолокацию
      let permission = "prompt";
      if (navigator.permissions) {
        try {
          const permissionResult = await navigator.permissions.query({
            name: "geolocation",
          });
          permission = permissionResult.state;
        } catch (error) {
          console.log("Ошибка проверки разрешения:", error);
        }
      }
      console.log("Разрешение геолокации:", permission);

      return { hasGeolocation: true, permission, isMobile };
    };

    // 2. Запрос геолокации пользователя
    const getUserLocation = () => {
      return new Promise((resolve, reject) => {
        const options = {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 60000,
        };

        navigator.geolocation.getCurrentPosition(
          (position) => {
            const coords = [
              position.coords.longitude,
              position.coords.latitude,
            ];
            console.log("Получены координаты пользователя:", coords);
            resolve(coords);
          },
          (error) => {
            console.log("Ошибка получения геолокации:", error.message);
            reject(error);
          },
          options
        );
      });
    };

    // 3. Проверка совпадения с demoCompany городами
    const checkUserInDemoCities = (userCoords) => {
      console.log("=== ПРОВЕРКА СОВПАДЕНИЯ С DEMO ГОРОДАМИ ===");
      const [userLng, userLat] = userCoords;

      for (const city of demoCompany.cities || []) {
        console.log("Проверяем город:", city.cityName);

        if (city.cityLocaltion && city.cityLocaltion.length === 2) {
          const [cityLat, cityLng] = city.cityLocaltion;
          console.log("Координаты города", city.cityName, ":", [
            cityLat,
            cityLng,
          ]);

          // Проверяем расстояние (примерно 50 км)
          const distance = Math.sqrt(
            Math.pow(userLng - cityLng, 2) + Math.pow(userLat - cityLat, 2)
          );
          console.log("Расстояние до города", city.cityName, ":", distance);

          if (distance < 0.5) {
            console.log("✅ Пользователь находится в городе:", city.cityName);
            return {
              inDemoCity: true,
              city: city,
              coordinates: [cityLng, cityLat],
            };
          }
        }
      }

      console.log("❌ Пользователь не находится в demo городах");
      return {
        inDemoCity: false,
        city: null,
        coordinates: null,
      };
    };

    // 4. Инициализация карты
    const initMap = async () => {
      console.log("=== ИНИЦИАЛИЗАЦИЯ КАРТЫ ===");

      if (!window.ymaps) {
        console.error("Yandex Maps API не загружен");
        return;
      }

      try {
        // Создаем карту с центром на Москве
        mapInstance.value = new window.ymaps.Map("yandexMap", {
          center: moscowCoords,
          zoom: 12,
          controls: ["zoomControl", "fullscreenControl"],
        });

        console.log("Карта создана успешно");

        // Добавляем метки компаний
        addCompanyMarkers();

        // Запускаем проверку геолокации
        await checkAndCenterMap();

        // Добавляем обработчик изменения границ карты
        mapInstance.value.events.add("boundschange", updateCompaniesInView);
      } catch (error) {
        console.error("Ошибка инициализации карты:", error);
      }
    };

    // 5. Основная функция проверки и центрирования
    const checkAndCenterMap = async () => {
      console.log("=== ПРОВЕРКА И ЦЕНТРИРОВАНИЕ КАРТЫ ===");

      // 1. Проверяем устройство и геолокацию
      const deviceInfo = await checkDeviceAndGeolocation();
      console.log("Информация об устройстве:", deviceInfo);

      // Если геолокация не поддерживается, центрируем на Москве
      if (!deviceInfo.hasGeolocation) {
        console.log("Геолокация не поддерживается, центрируем на Москве");
        mapInstance.value.setCenter(moscowCoords, 12);
        return;
      }

      // Если разрешение запрещено
      if (deviceInfo.permission === "denied") {
        console.log("Геолокация запрещена пользователем");

        // На мобильном предлагаем включить
        if (deviceInfo.isMobile) {
          const enableGeolocation = confirm(
            "Для лучшего отображения карты включите геолокацию в настройках. Продолжить без геолокации?"
          );
          if (!enableGeolocation) {
            // Пользователь хочет включить геолокацию
            try {
              const userCoords = await getUserLocation();
              await processUserLocation(userCoords);
            } catch (error) {
              console.log("Не удалось получить геолокацию после разрешения");
              mapInstance.value.setCenter(moscowCoords, 12);
            }
            return;
          }
        }

        // Центрируем на Москве
        mapInstance.value.setCenter(moscowCoords, 12);
        return;
      }

      // Запрашиваем геолокацию
      try {
        const userCoords = await getUserLocation();
        await processUserLocation(userCoords);
      } catch (error) {
        console.log("Ошибка получения геолокации, центрируем на Москве");
        mapInstance.value.setCenter(moscowCoords, 12);
      }
    };

    // 6. Обработка полученной геолокации
    const processUserLocation = async (userCoords) => {
      console.log("=== ОБРАБОТКА ГЕОЛОКАЦИИ ===");

      // Проверяем совпадение с demo городами
      const locationCheck = checkUserInDemoCities(userCoords);

      if (locationCheck.inDemoCity) {
        // Пользователь в demo городе - центрируем на этом городе
        console.log("Центрируем карту на городе:", locationCheck.city.cityName);
        mapInstance.value.setCenter(locationCheck.coordinates, 15);
      } else {
        // Пользователь не в demo городах - центрируем на Москве
        console.log("Пользователь не в demo городах, центрируем на Москве");
        mapInstance.value.setCenter(moscowCoords, 12);
      }

      // Добавляем метку пользователя
      addUserMarker(userCoords);
    };

    // 7. Добавление метки пользователя
    const addUserMarker = (coords) => {
      if (userMarker.value) {
        mapInstance.value.geoObjects.remove(userMarker.value);
      }

      userMarker.value = new window.ymaps.Placemark(
        coords,
        {
          hintContent: "Вы здесь",
          balloonContent: "Ваше текущее местоположение",
        },
        {
          preset: "islands#blueCircleDotIcon",
        }
      );
      mapInstance.value.geoObjects.add(userMarker.value);
    };

    // 8. Добавление меток компаний
    const addCompanyMarkers = () => {
      if (!mapInstance.value) return;

      console.log("Добавляем кастомные метки компаний...");

      companies.value.forEach((company) => {
        try {
          // Создаем кастомный HTML для маркера
          const markerContent = `
            <div class="custom-marker" data-company-id="${company.id}">
              <div class="marker-content">
                <div class="marker-logo">
                  <img src="${company.logo || "/img/placeholder.jpg"}" 
                       alt="${company.name}" 
                       onerror="this.src='/img/logo.png'; this.onerror=null;">
                </div>
                <div class="marker-info">
                  <div class="marker-name">${company.name}</div>
                  <div class="marker-rating">★ ${company.rating || "0"}</div>
                  <div class="marker-price">${company.price || ""}</div>
                </div>
              </div>
            </div>
          `;

          // Создаем кастомный макет для маркера
          const CustomMarkerLayout =
            window.ymaps.templateLayoutFactory.createClass(markerContent, {
              build: function () {
                CustomMarkerLayout.superclass.build.call(this);
                this.getDataElement()
                  .querySelector(".custom-marker")
                  .addEventListener("click", () => {
                    console.log("Клик по кастомному маркеру:", company.name);
                    selectCompany(company);
                    mapInstance.value.setCenter(company.coordinates, 15);
                  });
              },
            });

          // Создаем маркер с кастомным макетом
          const placemark = new window.ymaps.Placemark(
            company.coordinates,
            {
              hintContent: company.name,
              balloonContent: `
                <div class="marker-balloon">
                  <h3>${company.name}</h3>
                  <p>${company.address}</p>
                  <p>Рейтинг: ★ ${company.rating || "0"}</p>
                  <p>Цена: ${company.price || "Не указана"}</p>
                </div>
              `,
            },
            {
              iconLayout: CustomMarkerLayout,
              iconOffset: [-25, -25], // Центрируем маркер
              iconContentOffset: [0, 0],
            }
          );

          mapInstance.value.geoObjects.add(placemark);
        } catch (error) {
          console.error(
            "Ошибка добавления кастомного маркера для компании:",
            company.name,
            error
          );
        }
      });
    };

    // 9. Принудительное центрирование на Москве
    const forceCenterOnMoscow = () => {
      if (mapInstance.value) {
        console.log("Принудительное центрирование на Москве");
        mapInstance.value.setCenter(moscowCoords, 12);
      }
    };

    // Остальные функции для слайдера
    const selectCompany = (company) => {
      selectedCompany.value = company;
      if (mapInstance.value) {
        mapInstance.value.setCenter(company.coordinates, 15);
      }
    };

    const updateCompaniesInView = () => {
      if (!mapInstance.value) return;

      try {
        const bounds = mapInstance.value.getBounds();
        const filtered = companies.value.filter((company) => {
          const [lng, lat] = company.coordinates;
          return (
            lng >= bounds[0][0] &&
            lng <= bounds[1][0] &&
            lat >= bounds[0][1] &&
            lat <= bounds[1][1]
          );
        });

        companiesInView.value = filtered;

        if (activeIndex.value >= filtered.length) {
          activeIndex.value = 0;
        }

        console.log(`Компаний в зоне видимости: ${filtered.length}`);
      } catch (error) {
        console.error("Ошибка обновления компаний в зоне видимости:", error);
      }
    };

    const cardStyle = (idx) => {
      if (idx === activeIndex.value) {
        return {
          transform: "translateX(-50%) scale(1)",
          opacity: 1,
          zIndex: 2,
          pointerEvents: "auto",
        };
      } else {
        return {
          transform: "translateX(-50%) scale(0.8)",
          opacity: 0,
          zIndex: 1,
          pointerEvents: "none",
        };
      }
    };

    const goTo = (idx) => {
      activeIndex.value = idx;
    };

    const onTouchStart = (e) => {
      if (companiesInView.value.length <= 1) return;
      dragging = true;
      startX = e.touches[0].clientX;
    };

    const onTouchMove = (e) => {
      if (!dragging) return;
      deltaX = e.touches[0].clientX - startX;
    };

    const onTouchEnd = () => {
      if (!dragging) return;
      if (deltaX > 50 && activeIndex.value > 0) {
        activeIndex.value--;
      } else if (
        deltaX < -50 &&
        activeIndex.value < companiesInView.value.length - 1
      ) {
        activeIndex.value++;
      }
      dragging = false;
      deltaX = 0;
    };

    const onMouseDown = (e) => {
      if (companiesInView.value.length <= 1) return;
      dragging = true;
      startX = e.clientX;
    };

    const onMouseMove = (e) => {
      if (!dragging) return;
      deltaX = e.clientX - startX;
    };

    const onMouseUp = () => {
      if (!dragging) return;
      if (deltaX > 50 && activeIndex.value > 0) {
        activeIndex.value--;
      } else if (
        deltaX < -50 &&
        activeIndex.value < companiesInView.value.length - 1
      ) {
        activeIndex.value++;
      }
      dragging = false;
      deltaX = 0;
    };

    const onImageError = (event) => {
      event.target.src = "/img/logo.png";
    };

    // Загрузка Yandex Maps API
    const loadYandexMapScript = () => {
      return new Promise((resolve, reject) => {
        console.log("Загрузка Яндекс.Карт API...");

        if (window.ymaps) {
          console.log("API уже загружен");
          resolve(window.ymaps);
          return;
        }

        const script = document.createElement("script");
        script.src =
          "https://api-maps.yandex.ru/2.1/?apikey=3dc07a98-540b-4338-b92a-1e358928cde6&lang=ru_RU";

        script.onload = () => {
          console.log("Скрипт Яндекс.Карт загружен");
          if (window.ymaps) {
            window.ymaps.ready(() => {
              console.log("API Яндекс.Карт готов к использованию");
              resolve(window.ymaps);
            });
          } else {
            console.error("window.ymaps не найден после загрузки скрипта");
            reject(new Error("API не инициализирован"));
          }
        };

        script.onerror = (error) => {
          console.error("Ошибка загрузки скрипта Яндекс.Карт:", error);
          reject(new Error("Ошибка загрузки скрипта"));
        };

        document.head.appendChild(script);
        console.log("Скрипт добавлен в DOM");
      });
    };

    onMounted(async () => {
      try {
        await loadYandexMapScript();
        initMap();
      } catch (error) {
        console.error("Ошибка инициализации карты:", error);
      }
    });

    return {
      companies,
      selectedCompany,
      selectCompany,
      companiesInView,
      activeIndex,
      cardStyle,
      goTo,
      onTouchStart,
      onTouchMove,
      onTouchEnd,
      onMouseDown,
      onMouseMove,
      onMouseUp,
      onImageError,
      forceCenterOnMoscow,
    };
  },
};
</script>

<style scoped lang="scss">
.map {
  overflow: hidden;
  position: relative;
  margin-bottom: -60px;
  width: 100%;
  height: 100vh;
}

.map-container {
  width: 100%;
  height: 100%;
  min-height: 400px;
  background: #f0f0f0;
}

.moscow-center-btn {
  position: absolute;
  top: 20px;
  right: 20px;
  z-index: 1000;
  background: #fff;
  border: 2px solid #007bff;
  border-radius: 8px;
  padding: 8px 16px;
  font-size: 14px;
  font-weight: bold;
  color: #007bff;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.moscow-center-btn:hover {
  background: #007bff;
  color: #fff;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 123, 255, 0.3);
}

.moscow-center-btn:active {
  transform: translateY(0);
}

.company-swiper {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 50px;
  z-index: 1000; /* Увеличиваем z-index */
  display: flex;
  background-color: rgba(222, 222, 222, 0.8); /* Делаем фон полупрозрачным */
  backdrop-filter: blur(5px); /* Добавляем размытие фона */
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  overflow: hidden;
  height: 160px; /* Увеличиваем высоту для изображения */
  padding: 10px 0;
  box-sizing: border-box;
}

.company-card {
  min-width: 280px; /* Увеличиваем ширину */
  max-width: 90vw;
  margin: 0 10px;
  background: #ffffff;
  border-radius: 12px; /* Более закругленные углы */
  padding: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15); /* Более выраженная тень */
  cursor: pointer;
  flex-shrink: 0;
  transition: transform 0.3s, opacity 0.3s, box-shadow 0.3s;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%) scale(1);
  opacity: 0;
  z-index: 1;
  pointer-events: none;
  display: flex; /* Используем flexbox для расположения изображения и текста */
  align-items: flex-start; /* Выравнивание по верхнему краю */
  &__image {
    width: 80px; /* Фиксированная ширина изображения */
    height: 80px; /* Фиксированная высота изображения */
    object-fit: cover; /* Обрезка изображения до нужного размера */
    border-radius: 8px; /* Закругление углов изображения */
    margin-right: 12px; /* Отступ справа от изображения */
    flex-shrink: 0; /* Изображение не сжимается */
  }
  &__info {
    flex: 1; /* Занимает оставшееся пространство */
    min-width: 0; /* Позволяет тексту обрезаться, если не помещается */
  }
  &__address {
    font-size: 0.9em;
    color: #666;
    margin: 4px 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  &__meta {
    display: flex;
    justify-content: space-between;
    margin-top: 6px;
  }
  &__price {
    font-weight: bold;
    color: #28a745; /* Зеленый цвет для цены */
  }
  &__rating {
    color: #ffc107; /* Желтый цвет для рейтинга */
    font-weight: bold;
  }
  &.active {
    opacity: 1;
    z-index: 2;
    pointer-events: auto;
  }
}

.company-pagination {
  display: flex;
  justify-content: center;
  margin-top: 12px;
  gap: 8px;
  z-index: 3; /* Убедимся, что точки пагинации поверх карточек */
  .dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: #ccc;
    display: inline-block;
    transition: background 0.2s;
    cursor: pointer;
  }
}

.company-pagination .company-pagination .dot.active {
  background: #007bff;
}
</style>

<!-- Добавляем стили для кастомной метки вне scoped стилей -->
<style lang="scss">
/* Стили для кастомной метки на карте */
.marker {
  position: relative;
  display: block;
  background: white;
  border: solid 1px;
  border-radius: 6px;
  width: 150px;
  cursor: pointer;
  z-index: 100; /* Высокий z-index для метки */
  display: grid;
  grid-template-columns: 20px auto;
  gap: 10px;
  &__image-container {
    position: relative;
    width: 100%;
    display: block;
    background: white;
    border: solid 1px;
  }
  &__image {
  }
  &__price {
  }
  &__info {
  }
  &__name {
    display: flex;
    align-items: center;
    gap: 5px;
  }
  &__rating {
    white-space: nowrap;
  }
  &__tail {
    position: absolute;
    bottom: -6px;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 0;
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    border-top: 6px solid white;
  }
}

/* Стили для кастомных маркеров */
.custom-marker {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  padding: 8px;
  min-width: 120px;
  max-width: 150px;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 2px solid #007bff;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    border-color: #0056b3;
  }

  .marker-content {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .marker-logo {
    width: 32px;
    height: 32px;
    flex-shrink: 0;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 4px;
    }
  }

  .marker-info {
    flex: 1;
    min-width: 0;
  }

  .marker-name {
    font-size: 12px;
    font-weight: bold;
    color: #333;
    margin-bottom: 2px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .marker-rating {
    font-size: 10px;
    color: #ffc107;
    font-weight: bold;
    margin-bottom: 2px;
  }

  .marker-price {
    font-size: 10px;
    color: #28a745;
    font-weight: bold;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}

/* Стили для балуна маркера */
.marker-balloon {
  padding: 10px;

  h3 {
    margin: 0 0 8px 0;
    color: #333;
    font-size: 16px;
  }

  p {
    margin: 4px 0;
    color: #666;
    font-size: 14px;
  }
}
</style>
