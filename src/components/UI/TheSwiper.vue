<template>
  <Swiper
    :class="class"
    :modules="modules"
    :loop="options.loop"
    :navigation="options.navigation"
    :slidesPerView="options.slidesPerView"
    :slidesPerGroup="options.slidesPerGroup"
    :centeredSlides="options.centeredSlides"
    :spaceBetween="options.spaceBetween"
    :pagination="options.pagination"
    :breakpoints="options.breakpoints"
    :effect="options.effect"
    :mousewheel="options.mousewheel"
    @slideChange="handleSlideChange"
  >
    <SwiperSlide v-for="(slide, i) in slider" :key="i">
      <div class="slider" v-if="typeSlider === 'map'">
        <div class="slider__wrap" @click="handleSlideClick(slide)">
          <div class="slider__head">
            <div class="slider__img">
              <img :src="slide.img" alt="" />
            </div>
            <div class="slider__info">
              <div class="slider__name">{{ slide.name }}</div>
              <div class="slider__time">
                <svg
                  width="11"
                  height="11"
                  viewBox="0 0 11 11"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8.28631 10.5H2.08904C1.21143 10.5 0.5 9.79349 0.5 8.92195V3.55656C0.5 2.68503 1.21143 1.97851 2.08904 1.97851H8.28631C9.16392 1.97851 9.87535 2.68503 9.87535 3.55656V8.92195C9.87535 9.79349 9.16392 10.5 8.28631 10.5Z"
                    stroke="#222222"
                    stroke-miterlimit="10"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M2.88281 2.76562V1.18757"
                    stroke="#222222"
                    stroke-miterlimit="10"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M7.49219 2.76562V1.18757"
                    stroke="#222222"
                    stroke-miterlimit="10"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M2.09375 4.34766H8.29102"
                    stroke="#222222"
                    stroke-miterlimit="10"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                <p>{{ slide.time }}</p>
              </div>
              <div class="slider__location">
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10.5 5.00098C10.5 8.50098 6 11.501 6 11.501C6 11.501 1.5 8.50098 1.5 5.00098C1.5 3.8075 1.97411 2.66291 2.81802 1.819C3.66193 0.975082 4.80653 0.500977 6 0.500977C7.19347 0.500977 8.33807 0.975082 9.18198 1.819C10.0259 2.66291 10.5 3.8075 10.5 5.00098Z"
                    stroke="#222222"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M6 6.50098C6.82843 6.50098 7.5 5.8294 7.5 5.00098C7.5 4.17255 6.82843 3.50098 6 3.50098C5.17157 3.50098 4.5 4.17255 4.5 5.00098C4.5 5.8294 5.17157 6.50098 6 6.50098Z"
                    stroke="#222222"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                <p>{{ slide.address }}</p>
              </div>
            </div>
          </div>
          <div class="slider__body">
            <div class="slider__tags" v-if="slide.tags && slide.tags.length">
              <div class="slider-tag" v-for="(item, i) in slide.tags" :key="i">
                {{ item }}
              </div>
            </div>
          </div>
          <div class="slider__footer" v-if="slide.studio">
            <div class="slider__small">
              <p></p>
              <a :href="`tel:${slide.phone}`">{{ slide.phone }}</a>
            </div>
          </div>
        </div>
      </div>

      <div class="slider" v-if="typeSlider === 'code'"></div>
    </SwiperSlide>
  </Swiper>
</template>

<script>
import { Swiper, SwiperSlide } from "swiper/vue";

import "swiper/css";

import "swiper/css/effect-coverflow";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import "swiper/css/navigation";

import {
  Pagination,
  Navigation,
  Mousewheel,
  EffectCoverflow,
  EffectFade,
} from "swiper/modules";

export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  props: {
    slider: { type: Array, default: () => [], required: false },
    options: { type: Object, default: () => ({}), required: false },
    typeSlider: { type: String, default: "", required: false },
  },
  mounted() {
    console.log(this.options);
  },
  methods: {
    handleSlideClick(slide) {
      console.log("Клик по слайду:", slide);
      this.$emit("slide-click", slide);
    },
    handleSlideChange(swiper) {
      console.log("=== SWIPER SLIDE CHANGE ===");
      console.log("🎯 SWIPER СОБЫТИЕ СРАБОТАЛО!");
      console.log("Активный индекс:", swiper.activeIndex);
      console.log("Всего слайдов:", swiper.slides.length);
      console.log("Данные слайдера:", this.slider);

      // Получаем данные активного слайда
      const activeSlide = this.slider[swiper.activeIndex];

      console.log("Активный слайд:", activeSlide);

      if (
        activeSlide &&
        activeSlide.coordinates &&
        activeSlide.coordinates.length === 2
      ) {
        console.log(
          "Центрируем карту на:",
          activeSlide.name,
          activeSlide.coordinates
        );
        // Эмитим событие для центрирования карты
        this.$emit("slide-change", activeSlide);
        console.log("🎯 СОБЫТИЕ slide-change ЭМИТИРОВАНО!");
      } else {
        console.log(
          "Активный слайд не имеет координат или данных:",
          activeSlide
        );
      }
    },
  },
  setup() {
    return {
      modules: [
        Pagination,
        Navigation,
        Mousewheel,
        EffectCoverflow,
        EffectFade,
      ],
    };
  },
};
</script>

<style lang="scss"></style>
