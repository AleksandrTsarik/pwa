<template>
  <div class="map">
    <div id="yandexMap" class="map-container"></div>

    <!-- Слайдер с данными из demoCompany -->
    <slider
      :options="optionsSlider"
      :slider="cards"
      :typeSlider="'map'"
      :class="'slider-map slider-swiper'"
      @slide-click="onSlideClick"
    />

    <!-- Кнопка центрирования на Москве -->
    <button
      class="moscow-center-btn"
      @click="forceCenterOnMoscow"
      title="Центрировать на Москве"
      style="
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
      "
    >
      🏛️ Москва
    </button>

    <!-- Кнопка для тестирования маркеров -->
    <button
      class="test-markers-btn"
      @click="testMarkers"
      title="Тестировать маркеры"
      style="
        position: absolute;
        top: 20px;
        left: 20px;
        z-index: 1000;
        background: #fff;
        border: 2px solid #28a745;
        border-radius: 8px;
        padding: 8px 16px;
        font-size: 14px;
        font-weight: bold;
        color: #28a745;
        cursor: pointer;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      "
    >
      🔍 Тест
    </button>

    <!-- Кнопка для принудительного добавления маркеров -->
    <button
      class="force-markers-btn"
      @click="forceAddMarkers"
      title="Добавить маркеры"
      style="
        position: absolute;
        top: 20px;
        left: 120px;
        z-index: 1000;
        background: #fff;
        border: 2px solid #dc3545;
        border-radius: 8px;
        padding: 8px 16px;
        font-size: 14px;
        font-weight: bold;
        color: #dc3545;
        cursor: pointer;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      "
    >
      📍 Маркеры
    </button>

    <!-- Кнопка для принудительного обновления слайдера -->
    <button
      class="force-slider-btn"
      @click="forceUpdateSlider"
      title="Обновить слайдер"
      style="
        position: absolute;
        top: 20px;
        left: 220px;
        z-index: 1000;
        background: #fff;
        border: 2px solid #ffc107;
        border-radius: 8px;
        padding: 8px 16px;
        font-size: 14px;
        font-weight: bold;
        color: #ffc107;
        cursor: pointer;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      "
    >
      🔄 Слайдер
    </button>
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
        centeredSlides: true,
        spaceBetween: 20,
        slidesPerView: 1,
        slidesPerGroup: 1,
        pagination: {
          clickable: true,
          dynamicBullets: true,
        },

        modules: "modules",
        mousewheel: false,
        navigation: false,
      },
      // cards теперь управляется через setup
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
    const cards = ref([]); // Добавляем ref для cards
    const selectedCompany = ref(null);
    const mapInstance = shallowRef(null);
    const userMarker = shallowRef(null);
    const companiesInView = ref([]);

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

        // Проверяем что маркеры добавились
        setTimeout(() => {
          if (mapInstance.value && mapInstance.value.geoObjects) {
            console.log(
              "Количество объектов на карте:",
              mapInstance.value.geoObjects.getLength()
            );
          }
        }, 1000);

        // Инициализируем данные слайдера
        const initialSliderData = initSliderData();
        cards.value = initialSliderData;
        console.log("Начальные данные слайдера:", initialSliderData);

        // Добавляем обработчик изменения границ карты для синхронизации со слайдером
        mapInstance.value.events.add("boundschange", updateCompaniesInView);

        // Простая проверка геолокации без сложной логики
        try {
          const userCoords = await getUserLocation();
          addUserMarker(userCoords);
        } catch (error) {
          console.log("Геолокация недоступна, используем Москву");
        }
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
      if (!mapInstance.value) {
        console.error("Карта не инициализирована");
        return;
      }

      console.log("Добавляем метки компаний...");
      console.log("Количество компаний:", companies.value.length);
      console.log("Данные компаний:", companies.value);

      if (companies.value.length === 0) {
        console.error("Нет данных компаний для отображения");
        return;
      }

      companies.value.forEach((company, index) => {
        try {
          console.log(
            `Добавляем маркер для компании ${index + 1}:`,
            company.name,
            company.coordinates
          );

          // Проверяем координаты
          if (
            !company.coordinates ||
            !Array.isArray(company.coordinates) ||
            company.coordinates.length !== 2
          ) {
            console.error(
              `Неправильные координаты для компании ${company.name}:`,
              company.coordinates
            );
            return;
          }

          // Создаем простой маркер для тестирования
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
              preset: "islands#blueDotIcon", // Используем стандартный маркер
            }
          );

          // Добавляем обработчик клика
          placemark.events.add("click", () => {
            console.log("Клик по маркеру:", company.name);
            selectCompany(company);
            mapInstance.value.setCenter(company.coordinates, 15);
          });

          mapInstance.value.geoObjects.add(placemark);
          console.log(`Маркер для ${company.name} добавлен успешно`);
        } catch (error) {
          console.error(
            "Ошибка добавления маркера для компании:",
            company.name,
            error
          );
        }
      });

      console.log("Все маркеры добавлены");
    };

    // 9. Принудительное центрирование на Москве
    const forceCenterOnMoscow = () => {
      if (mapInstance.value) {
        console.log("Принудительное центрирование на Москве");
        mapInstance.value.setCenter(moscowCoords, 12);
      }
    };

    // 9.1. Функция для тестирования маркеров
    const testMarkers = () => {
      console.log("=== ТЕСТИРОВАНИЕ МАРКЕРОВ ===");
      console.log("Карта инициализирована:", !!mapInstance.value);
      console.log("Количество компаний:", companies.value.length);
      console.log("Компании:", companies.value);

      if (mapInstance.value && mapInstance.value.geoObjects) {
        console.log(
          "Количество объектов на карте:",
          mapInstance.value.geoObjects.getLength()
        );
      }
    };

    // 9.2. Функция для принудительного добавления маркеров
    const forceAddMarkers = () => {
      console.log("=== ПРИНУДИТЕЛЬНОЕ ДОБАВЛЕНИЕ МАРКЕРОВ ===");
      if (mapInstance.value) {
        addCompanyMarkers();
      } else {
        console.error("Карта не инициализирована");
      }
    };

    // 9.3. Функция для принудительного обновления слайдера
    const forceUpdateSlider = () => {
      console.log("=== ПРИНУДИТЕЛЬНОЕ ОБНОВЛЕНИЕ СЛАЙДЕРА ===");
      if (mapInstance.value) {
        updateCompaniesInView();
      } else {
        console.error("Карта не инициализирована");
      }
    };

    // 10. Инициализация слайдера с данными из demoCompany
    const initSliderData = () => {
      console.log("=== ИНИЦИАЛИЗАЦИЯ ДАННЫХ СЛАЙДЕРА ===");

      // Показываем все компании изначально
      const sliderData = companies.value.map((company) => ({
        img: company.logo || "/img/placeholder.jpg",
        name: company.name,
        time: company.time || "",
        address: company.address,
        studio: company.studio || "",
        rating: company.rating,
        price: company.price,
        phone: company.phone,
        email: company.email,
        website: company.website,
        tags: company.tags || [],
        extra: company.extra || [],
        cardType: company.cardType || [],
        sportType: company.sportType || [],
        coordinates: company.coordinates,
        id: company.id,
      }));

      console.log("Начальные данные для слайдера (все компании):", sliderData);
      return sliderData;
    };

    // 11. Обновление слайдера при изменении компаний в зоне видимости
    // Функция updateSliderData больше не нужна, так как обновление происходит в updateCompaniesInView

    // Остальные функции для слайдера
    const selectCompany = (company) => {
      console.log("Выбрана компания:", company.name);
      selectedCompany.value = company;
      if (mapInstance.value && company.coordinates) {
        try {
          mapInstance.value.setCenter(company.coordinates, 15);
          console.log("Карта центрирована на компании:", company.name);
        } catch (error) {
          console.error("Ошибка центрирования карты:", error);
        }
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

        // Обновляем слайдер только компаниями в зоне видимости
        const newSliderData = filtered.map((company) => ({
          img: company.logo || "/img/placeholder.jpg",
          name: company.name,
          time: company.time || "",
          address: company.address,
          studio: company.studio || "",
          rating: company.rating,
          price: company.price,
          phone: company.phone,
          email: company.email,
          website: company.website,
          tags: company.tags || [],
          extra: company.extra || [],
          cardType: company.cardType || [],
          sportType: company.sportType || [],
          coordinates: company.coordinates,
          id: company.id,
        }));

        cards.value = newSliderData;
        console.log(`Компаний в зоне видимости: ${filtered.length}`);
        console.log(
          "Обновлен слайдер с компаниями в зоне видимости:",
          newSliderData
        );
      } catch (error) {
        console.error("Ошибка обновления компаний в зоне видимости:", error);
      }
    };

    const onImageError = (event) => {
      event.target.src = "/img/logo.png";
    };

    // Обработчик клика по слайдеру
    const onSlideClick = (slideData) => {
      console.log("Клик по слайдеру:", slideData);
      if (slideData.coordinates && mapInstance.value) {
        mapInstance.value.setCenter(slideData.coordinates, 15);
      }
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
      console.log("=== НАЧАЛО ИНИЦИАЛИЗАЦИИ КАРТЫ ===");
      console.log("Данные компаний:", companies.value);

      try {
        await loadYandexMapScript();
        await initMap();
        console.log("=== КАРТА УСПЕШНО ИНИЦИАЛИЗИРОВАНА ===");
      } catch (error) {
        console.error("Ошибка инициализации карты:", error);
      }
    });

    return {
      companies,
      cards, // Добавляем cards
      selectedCompany,
      selectCompany,
      companiesInView,
      onImageError,
      onSlideClick,
      forceCenterOnMoscow,
      testMarkers, // Добавляем функцию тестирования
      forceAddMarkers, // Добавляем функцию принудительного добавления маркеров
      forceUpdateSlider, // Добавляем функцию принудительного обновления слайдера
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

/* Стили для слайдера */
.slider-map.swiper {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 150px;
  width: 100%;
  z-index: 5;
  background-color: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  padding: 20px 0;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  .swiper-wrapper {
    padding: 50px 0 150px;
  }
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
