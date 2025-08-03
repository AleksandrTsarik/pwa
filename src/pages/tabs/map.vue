<template>
  <div class="map">
    <div class="map__head">
      <div class="map__container">
        <h2 class="title map__title">Карта</h2>
      </div>
    </div>
    <div class="map__body">
      <div id="yandexMap" class="map-container"></div>
      <div class="filter-btn" @click="toggleFilter" @click.stop.prevent>
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
  <div class="filter" :class="{ active: isFilterOpen }">
    <div class="filter__overlay" @click="closeFilter" @click.stop.prevent></div>

    <div class="filter-drop">
      <form @submit.prevent>
        <div class="choice">
          <div class="choice__blocks">
            <!-- разводящая страница -->
            <div
              class="choice__block choice-start"
              :class="{ active: activeFilterTab === 0 }"
            >
              <div class="choice__head">
                <div class="choice__title">Фильтр</div>
                <div
                  class="choice__close"
                  @click="closeFilter"
                  @click.stop.prevent
                ></div>
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
                    {{ item.name }}
                    <span
                      class="choice-path__current"
                      v-if="selectedFiltersCount[item.id] > 0"
                    >
                      {{ selectedFiltersCount[item.id] }}
                    </span>
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
              class="choice__block choice-tab choice-tab__city"
              :class="{ active: activeFilterTab === 1 }"
            >
              <div class="choice__head choice__head-searche">
                <div
                  class="choice__title"
                  @click="
                    switchFilterTab(0);
                    $event.stopPropagation();
                  "
                  @click.stop.prevent
                >
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
                <div
                  class="choice__close"
                  @click="switchFilterTab(0)"
                  @click.stop.prevent
                ></div>
                <div class="choice-searche">
                  <label>
                    <input
                      type="text"
                      placeholder="Поиск"
                      v-model="citySearchQuery"
                      @input="searchCities"
                    />
                    <button @click="searchCities" @click.stop.prevent>
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M13.8034 12.8197L11.208 10.2433C12.2154 8.9862 12.7033 7.39056 12.5713 5.78449C12.4393 4.17843 11.6974 2.68402 10.4983 1.60855C9.29906 0.533073 7.7337 -0.0417195 6.12404 0.00236006C4.51437 0.0464396 2.98276 0.70604 1.84413 1.84553C0.705504 2.98503 0.0464044 4.5178 0.00235827 6.12869C-0.0416878 7.73957 0.532668 9.30612 1.60733 10.5062C2.68198 11.7063 4.17526 12.4488 5.7801 12.5809C7.38495 12.713 8.97938 12.2247 10.2355 11.2165L12.81 13.7929C12.8751 13.8585 12.9524 13.9106 13.0377 13.9462C13.1229 13.9817 13.2144 14 13.3067 14C13.3991 14 13.4905 13.9817 13.5758 13.9462C13.661 13.9106 13.7384 13.8585 13.8034 13.7929C13.9295 13.6624 14 13.4879 14 13.3063C14 13.1248 13.9295 12.9503 13.8034 12.8197ZM6.31088 11.2165C5.34233 11.2165 4.39552 10.9291 3.5902 10.3905C2.78488 9.85204 2.15721 9.08664 1.78656 8.19113C1.41591 7.29563 1.31893 6.31024 1.50789 5.35957C1.69684 4.40891 2.16324 3.53567 2.84811 2.85028C3.53298 2.16489 4.40556 1.69813 5.3555 1.50903C6.30545 1.31993 7.29009 1.41699 8.18491 1.78792C9.07974 2.15885 9.84456 2.787 10.3827 3.59293C10.9208 4.39886 11.208 5.34638 11.208 6.31567C11.208 7.61545 10.692 8.86199 9.77364 9.78107C8.85526 10.7001 7.60967 11.2165 6.31088 11.2165Z"
                          fill="#1D1F76"
                        />
                      </svg>
                    </button>
                  </label>
                </div>
              </div>
              <div class="choice__body">
                <div class="choice__body-inputs">
                  <Checkbox
                    v-for="city in filteredCities"
                    :key="city.id"
                    inputType="radio"
                    :label="city.name"
                    name="city-selection"
                    :modelValue="
                      selectedFilters.city &&
                      selectedFilters.city.id === city.id
                    "
                    @update:modelValue="(value) => value && onCityChange(city)"
                  />
                </div>

                <div class="choice__btn">
                  <button
                    type="button"
                    class="btn btn-primary"
                    :disabled="!canApplyFilters"
                    @click="applyFiltersFromTab"
                    @click.stop.prevent
                  >
                    Применить
                  </button>
                </div>
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
                @click.stop.prevent
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
                <div
                  class="choice__close"
                  @click="switchFilterTab(0)"
                  @click.stop.prevent
                ></div>
              </div>
              <div class="choice__body">
                <div class="choice__body-inputs">
                  <Checkbox
                    v-for="site in site"
                    :key="site.id"
                    inputType="radio"
                    :label="site.name"
                    name="site-selection"
                    :modelValue="
                      selectedFilters.site &&
                      selectedFilters.site.id === site.id
                    "
                    @update:modelValue="(value) => value && onSiteChange(site)"
                  />
                </div>

                <div class="choice__btn">
                  <button
                    type="button"
                    class="btn btn-primary"
                    :disabled="!canApplyFilters"
                    @click="applyFiltersFromTab"
                    @click.stop.prevent
                  >
                    Применить
                  </button>
                </div>
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
                <div
                  class="choice__close"
                  @click="switchFilterTab(0)"
                  @click.stop.prevent
                ></div>
              </div>
              <div class="choice__body">
                <div class="choice__body-inputs">
                  <Checkbox
                    v-for="sportTypeItem in sportType"
                    :key="sportTypeItem.id"
                    inputType="checkbox"
                    :label="sportTypeItem.name"
                    name="sportType-selection"
                    :modelValue="
                      selectedFilters.sportType.includes(sportTypeItem.name)
                    "
                    @update:modelValue="
                      (value) => onSportTypeChange(sportTypeItem.name, value)
                    "
                  />
                </div>

                <div class="choice__btn">
                  <button
                    type="button"
                    class="btn btn-primary"
                    :disabled="!canApplyFilters"
                    @click="applyFiltersFromTab"
                    @click.stop.prevent
                  >
                    Применить
                  </button>
                </div>
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
                <div
                  class="choice__close"
                  @click="switchFilterTab(0)"
                  @click.stop.prevent
                ></div>
              </div>
              <div class="choice__body">
                <div class="choice__body-inputs">
                  <Checkbox
                    v-for="cardTypeItem in cardType"
                    :key="cardTypeItem.id"
                    inputType="checkbox"
                    :label="cardTypeItem.name"
                    name="cardType-selection"
                    :modelValue="
                      selectedFilters.cardType.includes(cardTypeItem.name)
                    "
                    @update:modelValue="
                      (value) => onCardTypeChange(cardTypeItem.name, value)
                    "
                  />
                </div>

                <div class="choice__btn">
                  <button
                    type="button"
                    class="btn btn-primary"
                    :disabled="!canApplyFilters"
                    @click="applyFiltersFromTab"
                    @click.stop.prevent
                  >
                    Применить
                  </button>
                </div>
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
                <div
                  class="choice__close"
                  @click="switchFilterTab(0)"
                  @click.stop.prevent
                ></div>
              </div>
              <div class="choice__body">
                <div class="choice__body-inputs">
                  <Checkbox
                    v-for="extraItem in extra"
                    :key="extraItem.id"
                    inputType="checkbox"
                    :label="extraItem.name"
                    name="extra-selection"
                    :modelValue="selectedFilters.extra.includes(extraItem.name)"
                    @update:modelValue="
                      (value) => onExtraChange(extraItem.name, value)
                    "
                  />
                </div>

                <div class="choice__btn">
                  <button
                    type="button"
                    class="btn btn-primary"
                    :disabled="!canApplyFilters"
                    @click="applyFiltersFromTab"
                    @click.stop.prevent
                  >
                    Применить
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div class="choice__btns">
            <button
              class="btn btn-primary"
              :disabled="!canApplyFilters"
              @click="applyFiltersAndClose"
              @click.stop.prevent
            >
              Применить
            </button>
            <button
              class="btn btn-transparent"
              v-if="hasSelectedFilters"
              @click="clearAllFilters"
              @click.stop.prevent
            >
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
import companyAPI, { demoCompany } from "../../demo/demoCompany";
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
        autoHeight: true,
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
      isFilterOpen: false, // Состояние открытия фильтра
      cities: [], // Массив городов из demoCompany
      site: [],
      extra: [],
      cardType: [],
      sportType: [],
      // Фильтры
      selectedFilters: {
        city: null,
        site: null,
        sportType: [],
        cardType: [],
        extra: [],
      },
      // Поиск городов
      citySearchQuery: "",
      filteredCities: [],
      // cards теперь управляется через setup
    };
  },
  name: "MapDemo",
  async mounted() {
    try {
      // Загружаем данные из API
      const data = await companyAPI.getAllData();

      // Инициализируем города
      this.cities = data.cities.map((city) => ({
        name: city.cityName,
        id: city.cityName,
      }));
      this.filteredCities = [...this.cities];

      // Инициализируем site из первого города
      if (data.cities.length > 0) {
        this.site = data.cities[0].site.map((site) => ({
          name: site,
          id: site,
        }));
      }

      // Инициализируем sportType - получаем уникальные виды спорта из всех компаний
      const allSportTypes = new Set();
      data.cities.forEach((city) => {
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
      data.cities.forEach((city) => {
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
      data.cities.forEach((city) => {
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

      // Устанавливаем первый город как выбранный по умолчанию
      if (this.cities.length > 0) {
        this.selectedFilters.city = this.cities[0];
      }

      // Сохраняем данные для использования в фильтрации
      this.apiData = data;

      // Инициализируем данные в setup
      if (this.initializeData) {
        this.initializeData(data);
      }
    } catch (error) {
      console.error("Ошибка загрузки данных:", error);
      // Fallback к старым данным если API недоступен
      this.initializeWithDemoData();
    }
  },
  computed: {
    // Количество выбранных фильтров для каждого типа
    selectedFiltersCount() {
      const counts = {};
      this.filterItems.forEach((item, index) => {
        switch (index) {
          case 0: // Город
            counts[item.id] = this.selectedFilters.city ? 1 : 0;
            break;
          case 1: // Расположение
            counts[item.id] = this.selectedFilters.site ? 1 : 0;
            break;
          case 2: // Вид спорта
            counts[item.id] = this.selectedFilters.sportType.length;
            break;
          case 3: // Тип карты
            counts[item.id] = this.selectedFilters.cardType.length;
            break;
          case 4: // Дополнительно
            counts[item.id] = this.selectedFilters.extra.length;
            break;
        }
      });
      return counts;
    },

    // Проверяем, есть ли выбранные фильтры
    hasSelectedFilters() {
      return (
        this.selectedFilters.city ||
        this.selectedFilters.site ||
        this.selectedFilters.sportType.length > 0 ||
        this.selectedFilters.cardType.length > 0 ||
        this.selectedFilters.extra.length > 0
      );
    },

    // Проверяем, можно ли активировать кнопку "Применить"
    canApplyFilters() {
      return this.selectedFilters.city !== null;
    },
  },
  methods: {
    // Метод для переключения табов фильтра
    switchFilterTab(tabIndex) {
      this.activeFilterTab = tabIndex;
    },

    // Поиск городов
    searchCities() {
      if (!this.citySearchQuery.trim()) {
        this.filteredCities = [...this.cities];
        return;
      }

      const query = this.citySearchQuery.toLowerCase();
      this.filteredCities = this.cities.filter((city) =>
        city.name.toLowerCase().includes(query)
      );
    },

    // Обработка изменения фильтра города
    onCityChange(city) {
      this.selectedFilters.city = city;
      // Обновляем site для выбранного города
      const selectedCity = this.apiData.cities.find(
        (c) => c.cityName === city.name
      );
      if (selectedCity) {
        this.site = selectedCity.site.map((site) => ({
          name: site,
          id: site,
        }));
        // Сбрасываем выбранное расположение при смене города
        this.selectedFilters.site = null;
      }

      // Центрируем карту на выбранном городе
      this.centerMapOnCity(city);

      // Применяем фильтры автоматически
      this.applyFilters();
    },

    // Центрирование карты на выбранном городе
    centerMapOnCity(city) {
      const selectedCity = this.apiData.cities.find(
        (c) => c.cityName === city.name
      );
      if (selectedCity && selectedCity.cityLocaltion) {
        // Центрируем карту на координатах города
        if (this.mapInstance) {
          this.mapInstance.setCenter(selectedCity.cityLocaltion, 12);
        }
      }
    },

    // Обработка изменения фильтра расположения
    onSiteChange(site) {
      this.selectedFilters.site = site;
      // Применяем фильтры автоматически
      this.applyFilters();
    },

    // Обработка изменения фильтра вида спорта
    onSportTypeChange(sportType, isChecked) {
      if (isChecked) {
        if (!this.selectedFilters.sportType.includes(sportType)) {
          this.selectedFilters.sportType.push(sportType);
        }
      } else {
        this.selectedFilters.sportType = this.selectedFilters.sportType.filter(
          (item) => item !== sportType
        );
      }
      // Применяем фильтры автоматически
      this.applyFilters();
    },

    // Обработка изменения фильтра типа карты
    onCardTypeChange(cardType, isChecked) {
      if (isChecked) {
        if (!this.selectedFilters.cardType.includes(cardType)) {
          this.selectedFilters.cardType.push(cardType);
        }
      } else {
        this.selectedFilters.cardType = this.selectedFilters.cardType.filter(
          (item) => item !== cardType
        );
      }
      // Применяем фильтры автоматически
      this.applyFilters();
    },

    // Обработка изменения фильтра дополнительно
    onExtraChange(extra, isChecked) {
      if (isChecked) {
        if (!this.selectedFilters.extra.includes(extra)) {
          this.selectedFilters.extra.push(extra);
        }
      } else {
        this.selectedFilters.extra = this.selectedFilters.extra.filter(
          (item) => item !== extra
        );
      }
      // Применяем фильтры автоматически
      this.applyFilters();
    },

    // Применение фильтров
    applyFilters() {
      if (!this.canApplyFilters || !this.apiData) return;

      // Фильтруем компании на основе выбранных фильтров
      let filteredCompanies = [];

      this.apiData.cities.forEach((city) => {
        // Проверяем фильтр города
        if (
          this.selectedFilters.city &&
          city.cityName !== this.selectedFilters.city.name
        ) {
          return;
        }

        city.company.forEach((company) => {
          let shouldInclude = true;

          // Проверяем фильтр расположения (site)
          if (
            this.selectedFilters.site &&
            (!company.site ||
              !company.site.includes(this.selectedFilters.site.name))
          ) {
            shouldInclude = false;
          }

          // Проверяем фильтр вида спорта
          if (this.selectedFilters.sportType.length > 0) {
            const hasMatchingSportType = this.selectedFilters.sportType.some(
              (sportType) =>
                company.sportType && company.sportType.includes(sportType)
            );
            if (!hasMatchingSportType) {
              shouldInclude = false;
            }
          }

          // Проверяем фильтр типа карты
          if (this.selectedFilters.cardType.length > 0) {
            const hasMatchingCardType = this.selectedFilters.cardType.some(
              (cardType) =>
                company.cardType && company.cardType.includes(cardType)
            );
            if (!hasMatchingCardType) {
              shouldInclude = false;
            }
          }

          // Проверяем фильтр дополнительно
          if (this.selectedFilters.extra.length > 0) {
            const hasMatchingExtra = this.selectedFilters.extra.some(
              (extra) => company.extra && company.extra.includes(extra)
            );
            if (!hasMatchingExtra) {
              shouldInclude = false;
            }
          }

          if (shouldInclude) {
            filteredCompanies.push({
              ...company,
              cityName: city.cityName,
            });
          }
        });
      });

      // Обновляем данные на карте через setup функцию
      this.$nextTick(() => {
        if (this.updateMapWithFilteredDataFromSetup) {
          this.updateMapWithFilteredDataFromSetup(filteredCompanies);
        }
      });
    },

    // Применение фильтров и закрытие фильтра
    applyFiltersAndClose() {
      this.applyFilters();
      this.closeFilter();
    },

    // Применение фильтров из choice__btn (возврат на главный экран фильтра)
    applyFiltersFromTab() {
      // Применяем фильтры перед возвратом на главный экран
      this.applyFilters();
      // Возвращаемся на главный экран фильтра
      this.activeFilterTab = 0;
    },

    // Очистка всех фильтров
    clearAllFilters() {
      this.selectedFilters = {
        city: this.cities[0], // Оставляем первый город
        site: null,
        sportType: [],
        cardType: [],
        extra: [],
      };

      // Обновляем карту со всеми компаниями из всех городов
      const allCompanies = [];
      if (this.apiData) {
        this.apiData.cities.forEach((city) => {
          city.company.forEach((company) => {
            allCompanies.push({
              ...company,
              cityName: city.cityName,
            });
          });
        });
      }

      // Обновляем данные на карте через setup функцию
      this.$nextTick(() => {
        if (this.updateMapWithFilteredDataFromSetup) {
          this.updateMapWithFilteredDataFromSetup(allCompanies);
        }
      });

      // Центрируем карту на первом городе
      this.centerMapOnCity(this.cities[0]);

      // Переходим на таб выбора города
      this.activeFilterTab = 1;
    },

    // Закрытие фильтра
    closeFilter() {
      // Если сейчас открыт главный экран фильтра, то убираем active
      if (this.activeFilterTab === 0) {
        this.isFilterOpen = false;
      } else {
        this.activeFilterTab = 0;
      }
    },

    // Открытие/закрытие фильтра
    toggleFilter() {
      this.isFilterOpen = !this.isFilterOpen;
      if (!this.isFilterOpen) {
        this.activeFilterTab = 0;
      }
    },

    // Обновление карты с отфильтрованными данными
    updateMapWithFilteredData(filteredCompanies) {
      // Вызываем функцию из setup для обновления карты
      this.$nextTick(() => {
        if (this.updateMapWithFilteredDataFromSetup) {
          this.updateMapWithFilteredDataFromSetup(filteredCompanies);
        }
      });
    },
  },
  setup() {
    // Инициализируем companies как пустой массив, данные будут загружены асинхронно
    const companies = ref([]);
    const cards = ref([]); // Добавляем ref для cards
    const selectedCompany = ref(null);
    const mapInstance = shallowRef(null);
    const userMarker = shallowRef(null);
    const companiesInView = ref([]);
    const companyMarkers = ref(new Map()); // Добавляем Map для хранения маркеров
    let updateTimeout = null; // Добавляем переменную для дебаунсинга обновлений

    // Координаты Москвы
    const moscowCoords = [55.755819, 37.617644];

    // Функция для инициализации данных после загрузки из API
    const initializeData = (apiData) => {
      if (!apiData || !apiData.cities) {
        return;
      }

      // Собираем все компании из всех городов
      const allCompanies = [];
      apiData.cities.forEach((city, cityIndex) => {
        city.company.forEach((company, companyIndex) => {
          allCompanies.push({
            ...company,
            id: allCompanies.length + 1,
            image: company.logo || null,
            price: company.price || null,
            rating: company.rating || null,
            logo: company.logo || "/img/placeholder.jpg",
            marker: company.marker || "/img/marker.png",
            cityName: city.cityName,
          });
        });
      });

      companies.value = allCompanies;

      // Добавляем маркеры на карту после загрузки данных
      if (mapInstance.value && companies.value.length > 0) {
        addCompanyMarkers();
      }
    };

    // Функция для обновления компаний на карте на основе фильтров
    const updateCompaniesWithFilters = (filteredCompanies) => {
      if (!mapInstance.value) {
        return;
      }

      mapInstance.value.geoObjects.removeAll();
      companyMarkers.value.clear();

      filteredCompanies.forEach((company, index) => {
        try {
          // Проверяем координаты
          if (
            !company.coordinates ||
            !Array.isArray(company.coordinates) ||
            company.coordinates.length !== 2
          ) {
            console.warn(
              `Некорректные координаты для компании ${company.name}:`,
              company.coordinates
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
              iconContentSize: [150, 50],
            }
          );

          // Добавляем обработчик клика на маркер
          placemark.events.add("click", () => {
            // Находим индекс компании в исходном массиве для слайдера
            const companyIndex = companies.value.findIndex(
              (c) => c.id === company.id
            );
            if (companyIndex !== -1) {
              // Эмитируем событие свайпа слайдера
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

      // Обновляем слайдер с отфильтрованными данными
      const newSliderData = filteredCompanies.map((company, idx) => ({
        ...company,
        id: idx + 1,
        image: company.logo || null,
        price: company.price || null,
        rating: company.rating || null,
        logo: company.logo || "/img/placeholder.jpg",
        marker: company.marker || "/img/marker.png",
      }));
      cards.value = newSliderData;
    };

    // Экспортируем функцию для использования в methods
    const updateMapWithFilteredData = (filteredCompanies) => {
      updateCompaniesWithFilters(filteredCompanies);
    };

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

      // Эта функция будет обновлена после загрузки данных
      // Пока возвращаем null
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

        // Добавляем тестовый маркер для проверки
        const testPlacemark = new window.ymaps.Placemark(
          moscowCoords,
          {
            hintContent: "Тестовый маркер",
            balloonContent: "Это тестовый маркер",
          },
          {
            preset: "islands#blueCircleDotIcon",
          }
        );
        mapInstance.value.geoObjects.add(testPlacemark);

        // Добавляем метки компаний только если данные уже загружены
        if (companies.value.length > 0) {
          addCompanyMarkers();
        }

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
        console.error("Ошибка инициализации карты:", error);
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

      companies.value.forEach((company, index) => {
        try {
          // Проверяем координаты
          if (
            !company.coordinates ||
            !Array.isArray(company.coordinates) ||
            company.coordinates.length !== 2
          ) {
            console.warn(
              `Некорректные координаты для компании ${company.name}:`,
              company.coordinates
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
      mapInstance, // Экспортируем mapInstance для использования в methods
      initializeData, // Экспортируем функцию инициализации данных
      updateMapWithFilteredDataFromSetup: updateCompaniesWithFilters, // Экспортируем функцию для использования в methods
    };
  },

  // Fallback метод для инициализации с демо данными
  initializeWithDemoData() {
    // Инициализируем города из demoCompany
    this.cities = demoCompany.cities.map((city) => ({
      name: city.cityName,
      id: city.cityName,
    }));
    this.filteredCities = [...this.cities];

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

    // Устанавливаем первый город как выбранный по умолчанию
    if (this.cities.length > 0) {
      this.selectedFilters.city = this.cities[0];
    }

    // Сохраняем данные для использования в фильтрации
    this.apiData = demoCompany;

    // Инициализируем данные в setup
    if (this.initializeData) {
      this.initializeData(demoCompany);
    }
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
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.3s ease, visibility 0.3s ease;

  &.active {
    opacity: 1;
    visibility: visible;
  }

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
  // padding: 20px;
  max-height: 90vh;
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
    display: flex;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: var(--darkSecondary);
    color: #fff;
    text-align: center;
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
  &__body {
    height: calc(100% - 65px);
    overflow-y: auto;
    max-height: 80vh;
    display: flex;
    flex-direction: column;
  }
  &__body-inputs {
    flex-grow: 1;
    margin-bottom: 20px;
  }
  &__btn {
    margin-top: auto;
  }
  &__block {
    padding: 20px;
    &.choice-tab {
      height: 0;
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
      }
    }
  }
  &__head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 24px;
  }
  &__head-searche {
    display: grid;
    justify-content: space-between;
    grid-template-areas: "a b" "c c";
    .choice-searche {
      grid-area: c;
      margin-top: 24px;
    }
    .choice__close {
      margin-left: auto;
    }
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
    padding: 20px;
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
.choice-tab {
  &__city {
    .choice__body {
      height: calc(100% - 130px);
    }
  }
}
.choice-searche {
  label {
    position: relative;
  }
  input {
    background-color: var(--lightSecondary);
    width: 100%;
    border-radius: 50px;
    height: 40px;
    line-height: 40px;
    padding: 10px 40px 10px 20px;
    text-overflow: ellipsis;
  }
  button {
    padding: 0;
    position: absolute;
    right: 15px;
    top: 5px;
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
