<template>
  <div class="map">
    <div class="map__head">
      <div class="map__container">
        <h2 class="title map__title">Карта</h2>
      </div>
    </div>
    <div class="map__body">
      <div id="yandexMap" class="map-container"></div>
      <div class="filter-btn">
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clip-path="url(#clip0_579_4543)">
            <path
              d="M14.0768 17.5311C15.9832 17.5311 17.5287 15.9857 17.5287 14.0793C17.5287 12.1729 15.9832 10.6274 14.0768 10.6274C12.1704 10.6274 10.625 12.1729 10.625 14.0793C10.625 15.9857 12.1704 17.5311 14.0768 17.5311Z"
              stroke="white"
              stroke-width="2"
              stroke-miterlimit="10"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M5.90691 9.37242C7.81331 9.37242 9.35875 7.82698 9.35875 5.92059C9.35875 4.01419 7.81331 2.46875 5.90691 2.46875C4.00052 2.46875 2.45508 4.01419 2.45508 5.92059C2.45508 7.82698 4.00052 9.37242 5.90691 9.37242Z"
              stroke="white"
              stroke-width="2"
              stroke-miterlimit="10"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M19.4043 14.0796H17.5215"
              stroke="white"
              stroke-width="2"
              stroke-miterlimit="10"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M0.580078 5.92053H2.46289"
              stroke="white"
              stroke-width="2"
              stroke-miterlimit="10"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M10.6218 14.0795H0.580078"
              stroke="white"
              stroke-width="2"
              stroke-miterlimit="10"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M9.375 5.9209H19.4167"
              stroke="white"
              stroke-width="2"
              stroke-miterlimit="10"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </g>
          <defs>
            <clipPath id="clip0_579_4543">
              <rect width="20" height="20" fill="white" />
            </clipPath>
          </defs>
        </svg>
      </div>
    </div>
    <div class="map__footer" v-if="cards.length > 0">
      <slider
        :options="optionsSlider"
        :slider="cards"
        :typeSlider="'map'"
        :class="'slider-map slider-swiper'"
        @slide-change="onSlideChange"
      />
    </div>
  </div>
  <div class="filter">
    <div class="filter__overlay"></div>

    <div class="filter-drop">
      <form>
        <div class="choice">
          <div class="choice__blocks">
            <!-- разводящая страница -->
            <div
              class="choice__block choice-start"
              :class="{ active: activeFilterTab === 0 }"
            >
              <div class="choice__head">
                <div class="choice__title">Фильтр</div>
                <div class="choice__close"></div>
              </div>
              <div class="choice__body">
                <div
                  class="choice-path"
                  v-for="(item, i) in filterItems"
                  :key="i"
                  @click="
                    switchFilterTab(i + 1);
                    $event.stopPropagation();
                  "
                  :class="{ active: activeFilterTab === i + 1 }"
                >
                  <p>
                    {{ item.name }} <span class="choice-path__current"></span>
                  </p>
                  <svg
                    width="8"
                    height="12"
                    viewBox="0 0 8 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1.85714 11L7 6L1.85714 1"
                      stroke="#1D1F76"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </div>
              </div>
            </div>
            <!-- Город -->
            <div
              class="choice__block choice-tab"
              :class="{ active: activeFilterTab === 1 }"
            >
              <div
                class="choice__head"
                @click="
                  switchFilterTab(0);
                  $event.stopPropagation();
                "
              >
                <div class="choice__title">
                  <span
                    ><svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M10.1429 3L5 8L10.1429 13"
                        stroke="#2D2D2D"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </span>
                  Город
                </div>
                <div class="choice__close"></div>
              </div>
              <div class="choice__body">
                <Checkbox
                  v-for="city in cities"
                  :key="city.id"
                  inputType="radio"
                  :label="city.name"
                  name="city-selection"
                />
              </div>
            </div>
            <!-- Расположение -->
            <div
              class="choice__block choice-tab"
              :class="{ active: activeFilterTab === 2 }"
            >
              <div
                class="choice__head"
                @click="
                  switchFilterTab(0);
                  $event.stopPropagation();
                "
              >
                <div class="choice__title">
                  <span
                    ><svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M10.1429 3L5 8L10.1429 13"
                        stroke="#2D2D2D"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </span>
                  Расположение
                </div>
                <div class="choice__close"></div>
              </div>
              <div class="choice__body">
                <Checkbox
                  v-for="site in site"
                  :key="site.id"
                  inputType="radio"
                  :label="site.name"
                  name="site-selection"
                />
              </div>
            </div>
            <!-- Вид спорта -->
            <div
              class="choice__block choice-tab"
              :class="{ active: activeFilterTab === 3 }"
            >
              <div
                class="choice__head"
                @click="
                  switchFilterTab(0);
                  $event.stopPropagation();
                "
              >
                <div class="choice__title">
                  <span
                    ><svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M10.1429 3L5 8L10.1429 13"
                        stroke="#2D2D2D"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </span>
                  Вид спорта
                </div>
                <div class="choice__close"></div>
              </div>
              <div class="choice__body">
                <Checkbox
                  v-for="sportTypeItem in sportType"
                  :key="sportTypeItem.id"
                  inputType="checkbox"
                  :label="sportTypeItem.name"
                  name="sportType-selection"
                />
              </div>
            </div>
            <!-- Тип карты -->
            <div
              class="choice__block choice-tab"
              :class="{ active: activeFilterTab === 4 }"
            >
              <div
                class="choice__head"
                @click="
                  switchFilterTab(0);
                  $event.stopPropagation();
                "
              >
                <div class="choice__title">
                  <span
                    ><svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M10.1429 3L5 8L10.1429 13"
                        stroke="#2D2D2D"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </span>
                  Тип карты
                </div>
                <div class="choice__close"></div>
              </div>
              <div class="choice__body">
                <Checkbox
                  v-for="cardTypeItem in cardType"
                  :key="cardTypeItem.id"
                  inputType="checkbox"
                  :label="cardTypeItem.name"
                  name="cardType-selection"
                />
              </div>
            </div>
            <!-- Дополнительно -->
            <div
              class="choice__block choice-tab"
              :class="{ active: activeFilterTab === 5 }"
            >
              <div
                class="choice__head"
                @click="
                  switchFilterTab(0);
                  $event.stopPropagation();
                "
              >
                <div class="choice__title">
                  <span
                    ><svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M10.1429 3L5 8L10.1429 13"
                        stroke="#2D2D2D"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </span>
                  Дополнительно
                </div>
                <div class="choice__close"></div>
              </div>
              <div class="choice__body">
                <Checkbox
                  v-for="extraItem in extra"
                  :key="extraItem.id"
                  inputType="checkbox"
                  :label="extraItem.name"
                  name="extra-selection"
                />
              </div>
            </div>
          </div>

          <div class="choice__btns">
            <button class="btn btn-primary">Применить</button>
            <button class="btn btn-transparent">
              <span
                ><svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12.666 4.66669C12.4892 4.66669 12.3196 4.73693 12.1946 4.86195C12.0696 4.98697 11.9993 5.15654 11.9993 5.33335V12.794C11.9802 13.1311 11.8287 13.4471 11.5777 13.6729C11.3267 13.8988 10.9966 14.0164 10.6593 14H5.33935C5.00208 14.0164 4.672 13.8988 4.42102 13.6729C4.17003 13.4471 4.01847 13.1311 3.99935 12.794V5.33335C3.99935 5.15654 3.92911 4.98697 3.80409 4.86195C3.67906 4.73693 3.50949 4.66669 3.33268 4.66669C3.15587 4.66669 2.9863 4.73693 2.86128 4.86195C2.73625 4.98697 2.66602 5.15654 2.66602 5.33335V12.794C2.68504 13.4848 2.97707 14.14 3.47814 14.6159C3.9792 15.0919 4.64846 15.3498 5.33935 15.3334H10.6593C11.3502 15.3498 12.0195 15.0919 12.5206 14.6159C13.0216 14.14 13.3137 13.4848 13.3327 12.794V5.33335C13.3327 5.15654 13.2624 4.98697 13.1374 4.86195C13.0124 4.73693 12.8428 4.66669 12.666 4.66669Z"
                    fill="white"
                  />
                  <path
                    d="M13.3333 2.66669H10.6667V1.33335C10.6667 1.15654 10.5964 0.986973 10.4714 0.861949C10.3464 0.736925 10.1768 0.666687 10 0.666687H6C5.82319 0.666687 5.65362 0.736925 5.5286 0.861949C5.40357 0.986973 5.33333 1.15654 5.33333 1.33335V2.66669H2.66667C2.48986 2.66669 2.32029 2.73692 2.19526 2.86195C2.07024 2.98697 2 3.15654 2 3.33335C2 3.51016 2.07024 3.67973 2.19526 3.80476C2.32029 3.92978 2.48986 4.00002 2.66667 4.00002H13.3333C13.5101 4.00002 13.6797 3.92978 13.8047 3.80476C13.9298 3.67973 14 3.51016 14 3.33335C14 3.15654 13.9298 2.98697 13.8047 2.86195C13.6797 2.73692 13.5101 2.66669 13.3333 2.66669ZM6.66667 2.66669V2.00002H9.33333V2.66669H6.66667Z"
                    fill="white"
                  />
                  <path
                    d="M7.33333 11.3333V6.66667C7.33333 6.48986 7.2631 6.32029 7.13807 6.19526C7.01305 6.07024 6.84348 6 6.66667 6C6.48986 6 6.32029 6.07024 6.19526 6.19526C6.07024 6.32029 6 6.48986 6 6.66667V11.3333C6 11.5101 6.07024 11.6797 6.19526 11.8047C6.32029 11.9298 6.48986 12 6.66667 12C6.84348 12 7.01305 11.9298 7.13807 11.8047C7.2631 11.6797 7.33333 11.5101 7.33333 11.3333Z"
                    fill="white"
                  />
                  <path
                    d="M9.99935 11.3333V6.66667C9.99935 6.48986 9.92911 6.32029 9.80409 6.19526C9.67906 6.07024 9.50949 6 9.33268 6C9.15587 6 8.9863 6.07024 8.86128 6.19526C8.73625 6.32029 8.66602 6.48986 8.66602 6.66667V11.3333C8.66602 11.5101 8.73625 11.6797 8.86128 11.8047C8.9863 11.9298 9.15587 12 9.33268 12C9.50949 12 9.67906 11.9298 9.80409 11.8047C9.92911 11.6797 9.99935 11.5101 9.99935 11.3333Z"
                    fill="white"
                  />
                </svg> </span
              >Очистить все
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, shallowRef, onUnmounted } from "vue";
import demoCompany from "../../demo/demoCompany";
import Slider from "../../components/UI/TheSwiper.vue";
import Checkbox from "../../components/UI/TheCheckbox.vue";

export default {
  components: {
    Slider,
    Checkbox,
  },
  data() {
    return {
      optionsSlider: {
        loop: false,
        centeredSlides: true,
        spaceBetween: 20,
        slidesPerView: 1,
        slidesPerGroup: 1,
        autoHeight: true, // Автоматическая высота слайдов
        pagination: {
          clickable: true,
          dynamicBullets: true,
        },

        modules: "modules",
        mousewheel: false,
        navigation: false,
      },
      filterItems: [
        {
          name: "Город",
          id: "0",
        },
        {
          name: "Расположение",
          id: "1",
        },
        {
          name: "Вид спорта",
          id: "2",
        },
        {
          name: "Тип карты",
          id: "3",
        },
        {
          name: "Дополнительно",
          id: "4",
        },
      ],
      activeFilterTab: 0, // Активный таб фильтра
      cities: [], // Массив городов из demoCompany
      site: [],
      extra: [],
      cardType: [],
      sportType: [],
      // cards теперь управляется через setup
    };
  },
  name: "MapDemo",
  mounted() {
    // Инициализируем города из demoCompany
    this.cities = demoCompany.cities.map((city) => ({
      name: city.cityName,
      id: city.cityName,
    }));

    // Инициализируем site из первого города
    this.site = demoCompany.cities[0].site.map((site) => ({
      name: site,
      id: site,
    }));

    // Инициализируем sportType - получаем уникальные виды спорта из всех компаний
    const allSportTypes = new Set();
    demoCompany.cities.forEach((city) => {
      city.company.forEach((company) => {
        if (company.sportType && Array.isArray(company.sportType)) {
          company.sportType.forEach((sport) => {
            allSportTypes.add(sport);
          });
        }
      });
    });

    this.sportType = Array.from(allSportTypes).map((sport) => ({
      name: sport,
      id: sport,
    }));

    // Инициализируем cardType - получаем уникальные типы карт из всех компаний
    const allCardTypes = new Set();
    demoCompany.cities.forEach((city) => {
      city.company.forEach((company) => {
        if (company.cardType && Array.isArray(company.cardType)) {
          company.cardType.forEach((card) => {
            allCardTypes.add(card);
          });
        }
      });
    });

    this.cardType = Array.from(allCardTypes).map((card) => ({
      name: card,
      id: card,
    }));

    // Инициализируем extra - получаем Дополнительно из всех компаний
    const allExtra = new Set();
    demoCompany.cities.forEach((city) => {
      city.company.forEach((company) => {
        if (company.extra && Array.isArray(company.extra)) {
          company.extra.forEach((item) => {
            allExtra.add(item);
          });
        }
      });
    });

    this.extra = Array.from(allExtra).map((item) => ({
      name: item,
      id: item,
    }));
  },
  methods: {
    // Метод для переключения табов фильтра
    switchFilterTab(tabIndex) {
      console.log("switchFilterTab вызван с индексом:", tabIndex);
      this.activeFilterTab = tabIndex;
      console.log("activeFilterTab установлен в:", tabIndex);

      // Проверяем, что происходит с классами
      this.$nextTick(() => {
        const tabs = document.querySelectorAll(".choice__block");
        tabs.forEach((tab, index) => {
          console.log(
            `Таб ${index}:`,
            tab.classList.contains("active"),
            tab.className
          );
        });
      });
    },
  },
  setup() {
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
          autoFitToViewport: "always", // Автоматически подгонять под размер контейнера
        });

        // Добавляем метки компаний
        addCompanyMarkers();

        // Проверяем что маркеры добавились и устанавливаем активный класс для первого маркера
        setTimeout(() => {
          if (mapInstance.value && mapInstance.value.geoObjects) {
            // Маркеры добавлены
            // Устанавливаем активный класс для первого маркера
            if (companies.value.length > 0) {
              const firstCompanyId = companies.value[0].id;
              const firstMarker = companyMarkers.value.get(firstCompanyId);
              if (firstMarker && firstMarker.getElement) {
                const markerElement = firstMarker.getElement();
                if (markerElement) {
                  const customMarker =
                    markerElement.querySelector(".custom-marker");
                  if (customMarker) {
                    customMarker.classList.add("active");
                  }
                }
              }
            }
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
            console.warn(
              `Некорректные координаты для компании ${company.name}`
            );
            return;
          }

          // Создаем кастомный HTML для маркера
          const markerHtml = `
            <div class="custom-marker" data-company-id="${company.id}">
              <div class="custom-marker__content">
                <div class="custom-marker__logo">
                  <img src="${company.logo || "/img/placeholder.jpg"}" alt="${
            company.name
          }"/>
                </div>
                <div class="custom-marker__descr">
                  <div class="custom-marker__info">
                    <div class="custom-marker__name">${company.name}</div>
                    <div class="custom-marker__rating">★ ${
                      company.rating || "0"
                    }</div>
                </div>
                  ${
                    company.price
                      ? `<div class="custom-marker__price">${company.price}</div>`
                      : ""
                  }
                </div>
                
              </div>
              <div class="marker-tail"></div>
            </div>
          `;

          // Создаем простой кастомный макет
          const CustomLayout =
            window.ymaps.templateLayoutFactory.createClass(markerHtml);

          // Создаем маркер с кастомным макетом
          const placemark = new window.ymaps.Placemark(
            company.coordinates,
            {
              // Данные для hint и balloon
              hintContent: company.name,
              balloonContent: `<div class="marker-balloon"><h3>${
                company.name
              }</h3><p>${company.address}</p><p>Рейтинг: ★ ${
                company.rating || "0"
              }</p><p>Цена: ${company.price || "Не указана"}</p></div>`,
              // Сохраняем ID компании в данные метки для удобства
              companyId: company.id,
            },
            {
              iconLayout: "default#imageWithContent",
              iconContentLayout: CustomLayout,
              iconContentOffset: [0, 0],
              iconContentSize: [150, 50], // Убедитесь, что размеры соответствуют вашему markerHtml
            }
          );

          // Добавляем обработчик клика на маркер
          placemark.events.add("click", () => {
            // Находим индекс компании в исходном массиве для слайдера
            const companyIndex = companies.value.findIndex(
              (c) => c.id === company.id
            );
            if (companyIndex !== -1) {
              // Эмитируем событие свайпа слайдера (или вызываем нужную функцию)
              // Например, если у вас есть метод для перехода к слайду:
              // goToSlide(companyIndex);
              // Или если Slider.vue может слушать событие:
              window.dispatchEvent(
                new CustomEvent("map-marker-clicked", {
                  detail: { companyId: company.id },
                })
              );
            }
          });

          // Добавляем маркер на карту
          mapInstance.value.geoObjects.add(placemark);

          // Сохраняем ссылку на маркер в Map по ID компании
          companyMarkers.value.set(company.id, placemark);
        } catch (error) {
          console.error(
            `Ошибка создания маркера для компании ${company.name}:`,
            error
          );
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
      // Проверяем, что это правильные данные слайда, а не объект Swiper
      if (
        slideData &&
        typeof slideData === "object" &&
        !slideData.__swiper__ && // Не является объектом Swiper
        slideData.coordinates &&
        mapInstance.value
      ) {
        try {
          // Убираем класс active со всех маркеров
          const allCustomMarkers = document.querySelectorAll(".custom-marker");
          allCustomMarkers.forEach((marker) => {
            marker.classList.remove("active");
          });

          // Находим маркер с совпадающими координатами
          let matchingMarker = null;
          companyMarkers.value.forEach((marker, id) => {
            try {
              const markerCoordinates = marker.geometry.getCoordinates();
              if (
                markerCoordinates &&
                markerCoordinates[0] === slideData.coordinates[0] &&
                markerCoordinates[1] === slideData.coordinates[1]
              ) {
                matchingMarker = marker;
              }
            } catch (error) {
              // Ошибка получения координат маркера
            }
          });

          // Добавляем класс active к маркеру с совпадающими координатами
          if (matchingMarker) {
            try {
              // Ищем все элементы .custom-marker в DOM
              const allCustomMarkers =
                document.querySelectorAll(".custom-marker");

              let targetMarker = null;
              allCustomMarkers.forEach((marker) => {
                const dataCompanyId = marker.getAttribute("data-company-id");

                // Проверяем, соответствует ли этот маркер найденному по ID
                if (
                  dataCompanyId &&
                  matchingMarker.properties.get("companyId") == dataCompanyId
                ) {
                  targetMarker = marker;
                }
              });

              if (targetMarker) {
                targetMarker.classList.add("active");
              }
            } catch (error) {
              // Ошибка при работе с маркером
            }
          }

          // Логируем все маркеры, которые попадают на экран
          const bounds = mapInstance.value.getBounds();
          const visibleMarkers = [];
          companyMarkers.value.forEach((marker) => {
            const coordinates = marker.geometry.getCoordinates();
            if (
              coordinates[0] >= bounds[0][0] &&
              coordinates[0] <= bounds[1][0] &&
              coordinates[1] >= bounds[0][1] &&
              coordinates[1] <= bounds[1][1]
            ) {
              visibleMarkers.push(marker);
            }
          });

          // Логируем HTML-код видимых маркеров
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

          // Если нет компаний в зоне видимости, очищаем слайдер
          if (newSliderData.length === 0) {
            cards.value = [];
          } else {
            cards.value = newSliderData;
          }
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

<style lang="scss">
.map {
  position: relative;
  height: calc(100vh - 65px);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  &__head {
    background-color: #fff;
    flex-shrink: 0;
    padding: 20px 0 15px;
  }
  &__body {
    flex: 1;
    min-height: 0;
    position: relative;
    overflow: hidden;
    z-index: 0;
    transform: translateY(10px);
  }
  &__footer {
    flex-shrink: 0;
    position: relative;
    background-color: #fff;
    border-radius: 16px 16px 0 0;
    overflow: hidden;
    padding: 20px 0;
  }
}

.map-container {
  width: 100%;
  height: 100%;
  min-height: 0;
  overflow: hidden;
}

.marker {
  position: relative;
  display: block;
  background: white;
  border: solid 1px;
  border-radius: 6px;
  width: 150px;
  cursor: pointer;
  z-index: 100;
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

.custom-marker {
  background: white;
  border-radius: 8px;
  min-width: 120px;
  max-width: 150px;
  border-radius: 50px;
  padding: 2px;
  filter: drop-shadow(0 0 1px #000);
  position: relative;
  // overflow: hidden;
  &.active {
    filter: drop-shadow(0 0 2px #000);
  }
  &__content {
    display: grid;
    grid-template-columns: 35px auto;
    gap: 5px;
  }
  &__descr {
    text-align: left;
    padding-left: 30px;
  }
  &__info {
    display: flex;
    align-items: center;
    gap: 5px;
  }
  &__name {
    font-size: 14px;
    font-weight: 700;
  }
  &__rating {
    color: #4d4d4d;
    white-space: nowrap;
  }
  &__price {
    color: #4d4d4d;
    font-size: 12px;
    margin-top: 5px;
    white-space: nowrap;
  }
  &__logo {
    border-radius: 50%;
    overflow: hidden;
    display: block;
    height: 35px;
    width: 35px;
    position: absolute;
    left: -10px;
    top: 50%;
    transform: translateY(-50%);
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
}

.filter {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 999;
  &__overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 999;
  }
}
.filter-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  width: 56px;
  height: 56px;
  background-color: var(--darkSecondary);
  position: absolute;
  right: 20px;
  top: 0;
  border-radius: 50%;
}

.filter-drop {
  position: absolute;
  bottom: 0;
  left: 0;
  height: auto;
  z-index: 9999;
  background-color: #fff;
  width: 100%;
  border-radius: 16px 16px 0 0;
  padding: 20px;
  max-height: 80vh;
  overflow-y: auto;
  height: 100%;
  overflow: hidden;
  form {
    height: 100%;
  }
}
.choice-path {
  border-radius: 50px;
  font-size: 14px;
  font-weight: 500;
  font-family: var(--ff);
  background-color: rgba(215, 235, 255, 1);
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  margin-bottom: 10px;

  &:last-child {
    margin-bottom: 0;
  }
  p {
    display: flex;
    align-items: center;
    gap: 5px;
  }
  &__current {
  }
}
.choice {
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
  &__blocks {
    flex-grow: 1;
  }
  &__block {
    &.choice-tab {
      height: 0;
      padding: 0;
      overflow: hidden;
      position: absolute;
      opacity: 0;
      left: 0;
      right: 0;
      top: 0;
      background-color: #fff;
      z-index: 9999;
      &.active {
        animation: slideIn 0.3s ease-out forwards;
        height: 100%;
        opacity: 1;
        padding: 20px;
      }
    }
  }
  &__head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 24px;
  }
  &__title {
    font-size: 26px;
    font-weight: 500;
    font-family: var(--stetica);
  }
  &__close {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: solid 1px rgba(229, 229, 229, 1);
    cursor: pointer;
    &:after,
    &:before {
      content: "";
      display: block;
      width: 50%;
      height: 3px;
      border-radius: 50px;
      background-color: var(--darkSecondary);
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%) rotate(45deg);
    }
    &:after {
      transform: translate(-50%, -50%) rotate(-45deg);
    }
  }
  &__btns {
    margin-top: auto;
    .btn-transparent {
      display: flex;
      align-items: center;
      gap: 10px;
      justify-content: center;
      span {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background-color: var(--darkSecondary);
      }
    }
  }
}
@keyframes slideIn {
  from {
    transform: translateY(100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}
</style>
