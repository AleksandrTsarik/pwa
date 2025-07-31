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
      @slide-change="onSlideChange"
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
  </div>
</template>

<script>
import { ref, onMounted, shallowRef, onUnmounted } from "vue";
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
    const companyMarkers = ref(new Map()); // Добавляем Map для хранения маркеров
    let updateTimeout = null; // Добавляем переменную для дебаунсинга обновлений

    // Координаты Москвы
    const moscowCoords = [55.755819, 37.617644];

    // 1. Проверка устройства и геолокации
    const checkDeviceAndGeolocation = async () => {
      // Проверка на мобильное устройство
      const isMobile =
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        );

      // Проверка поддержки геолокации
      if (!navigator.geolocation) {
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
          // Ошибка проверки разрешения
        }
      }

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
            resolve(coords);
          },
          (error) => {
            reject(error);
          },
          options
        );
      });
    };

    // 3. Проверка совпадения с demoCompany городами
    const checkUserInDemoCities = (userCoords) => {
      const [userLng, userLat] = userCoords;

      for (const city of demoCompany.cities || []) {
        if (city.cityLocaltion && city.cityLocaltion.length === 2) {
          const [cityLat, cityLng] = city.cityLocaltion;

          // Проверяем расстояние (примерно 50 км)
          const distance = Math.sqrt(
            Math.pow(userLng - cityLng, 2) + Math.pow(userLat - cityLat, 2)
          );

          if (distance < 0.5) {
            return {
              inDemoCity: true,
              city: city,
              coordinates: [cityLng, cityLat],
            };
          }
        }
      }

      return {
        inDemoCity: false,
        city: null,
        coordinates: null,
      };
    };

    // 4. Инициализация карты
    const initMap = async () => {
      if (!window.ymaps) {
        return;
      }

      try {
        // Создаем карту с центром на Москве
        mapInstance.value = new window.ymaps.Map("yandexMap", {
          center: moscowCoords,
          zoom: 12,
          controls: ["zoomControl", "fullscreenControl"],
        });

        // Добавляем метки компаний
        addCompanyMarkers();

        // Проверяем что маркеры добавились
        setTimeout(() => {
          if (mapInstance.value && mapInstance.value.geoObjects) {
            // Маркеры добавлены
          }
        }, 1000);

        // Инициализируем данные слайдера
        const initialSliderData = initSliderData();
        cards.value = initialSliderData;

        // Добавляем обработчик изменения границ карты для синхронизации со слайдером
        mapInstance.value.events.add("boundschange", updateCompaniesInView);

        // Простая проверка геолокации без сложной логики
        try {
          const userCoords = await getUserLocation();
          addUserMarker(userCoords);
        } catch (error) {
          // Геолокация недоступна, карта остается на Москве
        }
      } catch (error) {
        // Ошибка инициализации карты
      }
    };

    // 5. Основная функция проверки и центрирования
    const checkAndCenterMap = async () => {
      // 1. Проверяем устройство и геолокацию
      const deviceInfo = await checkDeviceAndGeolocation();

      // Если геолокация не поддерживается, центрируем на Москве
      if (!deviceInfo.hasGeolocation) {
        mapInstance.value.setCenter(moscowCoords, 12);
        return;
      }

      // Если разрешение запрещено
      if (deviceInfo.permission === "denied") {
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
        mapInstance.value.setCenter(moscowCoords, 12);
      }
    };

    // 6. Обработка полученной геолокации
    const processUserLocation = async (userCoords) => {
      // Проверяем совпадение с demo городами
      const locationCheck = checkUserInDemoCities(userCoords);

      if (locationCheck.inDemoCity) {
        // Пользователь в demo городе - центрируем на этом городе
        mapInstance.value.setCenter(locationCheck.coordinates, 15);
      } else {
        // Пользователь не в demo городах - центрируем на Москве
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
        return;
      }

      if (companies.value.length === 0) {
        return;
      }

      // Очищаем старые маркеры перед добавлением новых
      companyMarkers.value.forEach((marker) => {
        try {
          mapInstance.value.geoObjects.remove(marker);
        } catch (error) {
          // Ошибка удаления старого маркера
        }
      });
      companyMarkers.value.clear();

      companies.value.forEach((company, index) => {
        try {
          // Проверяем координаты
          if (
            !company.coordinates ||
            !Array.isArray(company.coordinates) ||
            company.coordinates.length !== 2
          ) {
            return;
          }

          // Создаем кастомный HTML для маркера
          const markerHtml = `
            <div class="custom-marker">
              <div class="marker-content">
                <div class="marker-logo">
                  <img src="${company.logo || "/img/placeholder.jpg"}" 
                       alt="${company.name}" 
                       style="
                         width: 100%;
                         height: 100%;
                         object-fit: cover;
                         border-radius: 4px;
                       "
                       onerror="this.src='/img/placeholder.jpg'"
                  />
                </div>
                <div class="marker-info">
                  <div class="marker-name">${company.name}</div>
                  <div class="marker-rating">★ ${company.rating || "0"}</div>
                  ${
                    company.price
                      ? `<div class="marker-price">${company.price}</div>`
                      : ""
                  }
                </div>
              </div>
              <div class="marker-tail"></div>
            </div>
          `;

          // Создаем простой кастомный макет без сложных обработчиков
          const CustomLayout =
            window.ymaps.templateLayoutFactory.createClass(markerHtml);

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
              iconLayout: "default#imageWithContent",
              iconContentLayout: CustomLayout,
              iconContentOffset: [0, 0],
              iconContentSize: [150, 50],
            }
          );

          // Добавляем обработчик клика на маркер
          placemark.events.add("click", () => {
            selectCompany(company);
          });

          // Сохраняем маркер в Map для последующего управления
          companyMarkers.value.set(company.id, placemark);

          mapInstance.value.geoObjects.add(placemark);
        } catch (error) {
          // Ошибка добавления кастомного маркера для компании
        }
      });
    };

    // 9. Принудительное центрирование на Москве (только ручное)
    const forceCenterOnMoscow = () => {
      if (mapInstance.value) {
        mapInstance.value.setCenter(moscowCoords, 12);
      }
    };

    const onImageError = (event) => {
      event.target.src = "/img/logo.png";
    };

    // Обработчик клика по слайдеру
    const onSlideClick = (slideData) => {
      // Убираем автоматическое центрирование - карта должна центрироваться только при свайпе слайдера
    };

    // Обработчик изменения слайдера - добавляем класс active к маркеру
    const onSlideChange = (slideData) => {
      if (slideData && slideData.id && mapInstance.value) {
        try {
          // Убираем класс active со всех маркеров
          companyMarkers.value.forEach((marker, id) => {
            try {
              if (marker && marker.getElement) {
                const markerElement = marker.getElement();
                if (markerElement) {
                  const customMarker =
                    markerElement.querySelector(".custom-marker");
                  if (customMarker) {
                    customMarker.classList.remove("active");
                  }
                }
              }
            } catch (error) {
              // Ошибка обработки маркера
            }
          });

          // Добавляем класс active к выбранному маркеру
          const selectedMarker = companyMarkers.value.get(slideData.id);
          if (selectedMarker && selectedMarker.getElement) {
            const markerElement = selectedMarker.getElement();
            if (markerElement) {
              const customMarker =
                markerElement.querySelector(".custom-marker");
              if (customMarker) {
                customMarker.classList.add("active");
              }
            }
          }
        } catch (error) {
          // Ошибка обработки свайпа слайдера
        }
      }
    };

    // Инициализация слайдера с данными из demoCompany
    const initSliderData = () => {
      // Показываем все компании изначально
      const sliderData = companies.value.map((company, index) => {
        const slideData = {
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
        };

        return slideData;
      });

      return sliderData;
    };

    // Обновление слайдера при изменении компаний в зоне видимости
    const updateCompaniesInView = () => {
      if (!mapInstance.value) return;

      // Добавляем дебаунсинг для предотвращения частых обновлений
      if (updateTimeout) {
        clearTimeout(updateTimeout);
      }

      updateTimeout = setTimeout(() => {
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
        } catch (error) {
          // Ошибка обновления компаний в зоне видимости
        }
      }, 200); // Задержка 200мс для дебаунсинга
    };

    // Функция выбора компании
    const selectCompany = (company) => {
      selectedCompany.value = company;
    };

    // Загрузка Yandex Maps API
    const loadYandexMapScript = () => {
      return new Promise((resolve, reject) => {
        if (window.ymaps) {
          resolve(window.ymaps);
          return;
        }

        const script = document.createElement("script");
        script.src =
          "https://api-maps.yandex.ru/2.1/?apikey=3dc07a98-540b-4338-b92a-1e358928cde6&lang=ru_RU";

        script.onload = () => {
          if (window.ymaps) {
            window.ymaps.ready(() => {
              resolve(window.ymaps);
            });
          } else {
            reject(new Error("API не инициализирован"));
          }
        };

        script.onerror = (error) => {
          // Попробуем альтернативный способ загрузки
          setTimeout(() => {
            if (window.ymaps) {
              window.ymaps.ready(() => {
                resolve(window.ymaps);
              });
            } else {
              reject(new Error("Ошибка загрузки скрипта"));
            }
          }, 2000);
        };

        // Добавляем обработчик для отслеживания блокировки
        script.addEventListener("error", (event) => {
          // Скрипт заблокирован
        });

        document.head.appendChild(script);

        // Таймаут на случай, если скрипт не загрузится
        setTimeout(() => {
          if (!window.ymaps) {
            reject(new Error("Таймаут загрузки API"));
          }
        }, 10000);
      });
    };

    onMounted(async () => {
      try {
        await loadYandexMapScript();
        await initMap();
      } catch (error) {
        // Ошибка инициализации карты
      }
    });

    // Очистка таймаутов при размонтировании
    onUnmounted(() => {
      if (updateTimeout) {
        clearTimeout(updateTimeout);
      }
    });

    return {
      companies,
      cards,
      selectedCompany,
      selectCompany,
      companiesInView,
      onImageError,
      onSlideClick,
      onSlideChange,
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

/* Стили для слайдера */
.slider-map.swiper {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  z-index: 0;
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
  position: relative;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    border-color: #0056b3;
  }

  /* Стили для активного состояния */
  &.active {
    background-color: red !important;
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
// .custom-marker {
//   &.active {
//     background-color: red;
//   }
// }
</style>
