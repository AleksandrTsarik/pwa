<template>
  <div class="map">
    <div id="yandexMap" class="map-container"></div>
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
        <h3>{{ company.name }}</h3>
        <p>{{ company.address }}</p>
      </div>
      <div v-if="companiesInView.length > 1" class="company-pagination">
        <span
          v-for="(company, idx) in companiesInView"
          :key="company.id"
          :class="{ dot: true, active: idx === activeIndex }"
          @click="goTo(idx)"
        ></span>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, shallowRef } from "vue";
import demoCompany from "../../demo/demoCompany";

export default {
  name: "MapDemo",
  setup() {
    // Используем demoCompany для списка компаний
    const companies = ref(
      demoCompany.company.map((c, idx) => ({
        ...c,
        id: idx + 1,
      }))
    );

    const selectedCompany = ref(null);
    const mapInstance = shallowRef(null);
    const userMarker = shallowRef(null); // Для хранения метки геолокации
    const companiesInView = ref([]);
    const activeIndex = ref(0);
    let startX = 0;
    let deltaX = 0;
    let dragging = false;

    // Инициализация карты
    const initMap = () => {
      // Убедимся, что API загружено
      if (!window.ymaps) {
        console.error("Yandex Maps API not loaded");
        return;
      }

      mapInstance.value = new window.ymaps.Map("yandexMap", {
        center: [37.6176, 55.7558], // Начальный центр (Москва)
        zoom: 12,
      });

      // При первой загрузке карты запрашиваем геолокацию
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const userCoords = [
              position.coords.longitude,
              position.coords.latitude,
            ];
            mapInstance.value.setCenter([userCoords[0], userCoords[1]], 15);
            // Добавляем метку пользователя
            userMarker.value = new window.ymaps.Placemark(
              [userCoords[0], userCoords[1]],
              {
                hintContent: "Вы здесь",
                balloonContent: "Ваше текущее местоположение",
              },
              {
                preset: "islands#blueCircleDotIcon",
              }
            );
            mapInstance.value.geoObjects.add(userMarker.value);
          },
          (error) => {
            // Пользователь отказал или ошибка — оставляем дефолтный центр Москвы
            console.warn("Геолокация не разрешена или ошибка:", error);
            mapInstance.value.setCenter([37.6176, 55.7558], 12);
          }
        );
      } else {
        // Если геолокация не поддерживается, также центр Москвы
        mapInstance.value.setCenter([37.6176, 55.7558], 12);
      }

      // Добавляем метки компаний
      addCompanyMarkers();

      // Подписываемся на событие изменения границ карты
      mapInstance.value.events.add("boundschange", updateCompaniesInView);
      updateCompaniesInView();
    };

    // Добавление меток компаний на карту
    const addCompanyMarkers = () => {
      if (!mapInstance.value) return;

      companies.value.forEach((company) => {
        const placemark = new window.ymaps.Placemark(
          company.coordinates,
          {
            balloonContent: `<strong>${company.name}</strong><br>${company.address}`,
            hintContent: company.name,
          },
          {
            // Опционально: можно задать кастомную иконку
            // iconLayout: 'default#image',
            // iconImageHref: '/path/to/icon.png',
            // iconImageSize: [30, 42],
          }
        );

        // Добавляем обработчик клика на метку
        placemark.events.add("click", () => {
          selectCompany(company);
          // Центрируем карту на метке
          mapInstance.value.setCenter(company.coordinates);
        });

        mapInstance.value.geoObjects.add(placemark);
      });
    };

    // Выбор компании (из списка или кликом по метке)
    const selectCompany = (company) => {
      selectedCompany.value = company;
      if (mapInstance.value) {
        mapInstance.value.setCenter(company.coordinates, 15);
      }
    };

    // Получение местоположения пользователя
    const getUserLocation = () => {
      if (!mapInstance.value) return;

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const userCoords = [
              position.coords.longitude,
              position.coords.latitude,
            ];
            // Обратите внимание: Яндекс.Карты используют [долгота, широта]

            // Центрируем карту на местоположении пользователя
            mapInstance.value.setCenter([userCoords[0], userCoords[1]], 15);

            // Добавляем или обновляем метку пользователя
            if (userMarker.value) {
              userMarker.value.geometry.setCoordinates([
                userCoords[0],
                userCoords[1],
              ]);
            } else {
              userMarker.value = new window.ymaps.Placemark(
                [userCoords[0], userCoords[1]],
                {
                  hintContent: "Вы здесь",
                  balloonContent: "Ваше текущее местоположение",
                },
                {
                  preset: "islands#blueCircleDotIcon", // Предустановленная иконка
                }
              );
              mapInstance.value.geoObjects.add(userMarker.value);
            }
          },
          (error) => {
            console.error("Ошибка получения геолокации:", error);
            alert("Не удалось получить ваше местоположение.");
          }
        );
      } else {
        alert("Геолокация не поддерживается вашим браузером.");
      }
    };

    // Фильтрация компаний по зоне видимости карты
    const updateCompaniesInView = () => {
      if (!mapInstance.value) return;
      const bounds = mapInstance.value.getBounds(); // [[sw_lng, sw_lat], [ne_lng, ne_lat]]
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
    };

    // Слайдер: стили для карточки
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
    // Свайп тач
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
    // Свайп мышью
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

    // Загрузка Yandex Maps API
    const loadYandexMapScript = () => {
      return new Promise((resolve, reject) => {
        if (window.ymaps) {
          resolve(window.ymaps);
          return;
        }

        const script = document.createElement("script");
        script.src =
          "https://api-maps.yandex.ru/2.1/?apikey=ВАШ_API_КЛЮЧ&lang=ru_RU"; // Замените ВАШ_API_КЛЮЧ на ваш ключ
        script.onload = () => {
          window.ymaps.ready(() => {
            resolve(window.ymaps);
          });
        };
        script.onerror = () =>
          reject(new Error("Ошибка загрузки скрипта Яндекс.Карт"));
        document.head.appendChild(script);
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
      getUserLocation,
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
    };
  },
};
</script>

<style scoped>
.map {
  overflow: hidden;
  position: relative;
  /* height: 100vh;
  position: relative; */
}

.map-container {
  width: 100vw;
  height: 100vh;
}

.company-swiper {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 50px;
  z-index: 0;
  display: flex;
  background-color: #dedede;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  overflow: hidden;
  height: 140px;
}
.company-card {
  min-width: 260px;
  max-width: 90vw;
  margin: 0 10px;
  background: #f5f5f5;
  border-radius: 8px;
  padding: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
  cursor: pointer;
  flex-shrink: 0;
  transition: transform 0.3s, opacity 0.3s;
  position: absolute;
  left: 50%;
  top: 0;
  transform: translateX(-50%) scale(1);
  opacity: 0;
  z-index: 1;
  pointer-events: none;
}
.company-card.active {
  opacity: 1;
  z-index: 2;
  pointer-events: auto;
}
.company-pagination {
  display: flex;
  justify-content: center;
  margin-top: 12px;
  gap: 8px;
}
.company-pagination .dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #ccc;
  display: inline-block;
  transition: background 0.2s;
  cursor: pointer;
}
.company-pagination .dot.active {
  background: #007bff;
}
</style>
