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
// Предполагается, что demoCompany содержит массив company с нужными полями
import demoCompany from "../../demo/demoCompany";

export default {
  name: "MapDemo",
  setup() {
    // Используем demoCompany для списка компаний
    const companies = ref(
      demoCompany.company.map((c, idx) => ({
        ...c,
        id: idx + 1,
        // Добавим примерные данные, если их нет в demoCompany
        image: c.image || null, // Может быть null, тогда используется заглушка
        price: c.price || "Цена не указана",
        rating: c.rating || null, // Может быть null
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

    // --- Новый класс для кастомной иконки ---
    let CustomIconLayout;

    // Инициализация карты
    const initMap = () => {
      // Убедимся, что API загружено
      if (!window.ymaps) {
        console.error("Yandex Maps API not loaded");
        return;
      }

      // --- Определение кастомного макета иконки ---
      CustomIconLayout = window.ymaps.templateLayoutFactory.createClass(
        `
        <div class="custom-placemark" style="position: relative; transform: translate(-50%, -100%);">
          <div class="custom-placemark__image-container">
            <img src="{{ properties.image }}" alt="{{ properties.name }}" class="custom-placemark__image" onerror="this.src='/img/placeholder-icon.jpg'; this.onerror=null;">
            <div class="custom-placemark__price">{{ properties.price }}</div>
          </div>
          <div class="custom-placemark__info">
            <div class="custom-placemark__name">{{ properties.name }}</div>
            <div class="custom-placemark__rating" v-if="properties.rating">★ {{ properties.rating }}</div>
          </div>
          <div class="custom-placemark__tail"></div>
        </div>
        `,
        {
          // Переопределяем метод build, чтобы добавить обработчики событий
          build: function () {
            // Вызываем родительский метод build
            CustomIconLayout.superclass.build.call(this);
            // Получаем ссылку на DOM-элемент метки
            const element =
              this.getParentElement().getElementsByClassName(
                "custom-placemark"
              )[0];
            if (element) {
              // Добавляем обработчик клика на саму метку
              element.onclick = () => {
                const companyId = this.getData().properties.get("companyId");
                const company = companies.value.find((c) => c.id === companyId);
                if (company) {
                  selectCompany(company);
                  mapInstance.value.setCenter(company.coordinates);
                }
              };
            }
          },
          // Переопределяем метод clear, чтобы очистить обработчики событий
          clear: function () {
            const element =
              this.getParentElement().getElementsByClassName(
                "custom-placemark"
              )[0];
            if (element) {
              element.onclick = null;
            }
            // Вызываем родительский метод clear
            CustomIconLayout.superclass.clear.call(this);
          },
        }
      );

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

    // Добавление меток компаний на карту с кастомным макетом
    const addCompanyMarkers = () => {
      if (!mapInstance.value || !CustomIconLayout) return;

      // Очищаем предыдущие метки, если они были
      mapInstance.value.geoObjects.removeAll();

      // Добавляем заново метку пользователя, если она была
      if (userMarker.value) {
        mapInstance.value.geoObjects.add(userMarker.value);
      }

      companies.value.forEach((company) => {
        const placemark = new window.ymaps.Placemark(
          company.coordinates,
          {
            // Данные для макета
            companyId: company.id,
            name: company.name,
            address: company.address,
            image: company.image || "/img/placeholder-icon.jpg", // Используем заглушку
            price: company.price || "Цена",
            rating: company.rating,
            // Для стандартного hintContent (на случай проблем с кастомным)
            hintContent: company.name,
          },
          {
            // Указываем кастомный макет иконки
            iconLayout: CustomIconLayout,
            // Отключаем стандартный балун, если не нужен
            // balloonContent: `<strong>${company.name}</strong><br>${company.address}`,
            // Отключаем стандартную иконку
            iconShape: null, // Или определите форму, если нужно
          }
        );

        // Добавляем обработчик клика на метку (альтернативный способ)
        // placemark.events.add("click", () => {
        //   selectCompany(company);
        //   mapInstance.value.setCenter(company.coordinates);
        // });

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

    // Обработка ошибки загрузки изображения в карточке
    const onImageError = (event) => {
      event.target.src = "/img/placeholder.jpg"; // Путь к вашей заглушке
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
      onImageError, // Добавляем метод обработки ошибки изображения
    };
  },
};
</script>

<style scoped lang="scss">
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
.custom-placemark {
  position: relative;
  width: 120px; /* Ширина метки */
  background: white;
  border-radius: 6px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
  cursor: pointer;
  font-family: Arial, sans-serif;
  font-size: 12px;
  z-index: 100; /* Высокий z-index для метки */
  &__image-container {
    position: relative;
    width: 100%;
    height: 60px; /* Высота контейнера изображения */
    border-radius: 6px 6px 0 0;
    overflow: hidden;
  }
  &__image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  &__price {
    position: absolute;
    top: 4px;
    right: 4px;
    background: rgba(0, 0, 0, 0.7);
    color: white;
    padding: 2px 6px;
    border-radius: 3px;
    font-weight: bold;
    font-size: 11px;
  }
  &__info {
    padding: 6px;
  }
  &__name {
    font-weight: bold;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-bottom: 2px;
  }
  &__rating {
    color: #ffc107;
    font-size: 11px;
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
</style>
