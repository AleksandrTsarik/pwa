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
  >
    <SwiperSlide v-for="(slide, i) in slider" :key="i">
      <div class="slider" v-if="typeSlider === 'map'">
        <div class="slider__wrap">
          <div class="slider__haed">
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
          <div class="slider__body"></div>
          <div class="slider__footer" v-if="slide.studio"></div>
        </div>
      </div>

      <div class="slider" v-if="typeSlider === 'code'"></div>
    </SwiperSlide>
    <SwiperControls />
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
    slider: { type: Array, default: [], require: false },
    options: { type: Object, default: {}, require: false },
    typeSlider: { type: String, default: "", require: false },
  },
  mounted() {
    console.log(this.options);
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

<style lang="scss">
.slider {
  height: 100%;
  &__info {
    padding: 25px 30px;
    height: 100%;
    position: relative;
    @media (max-width: 767px) {
      padding: 15px 20px;
    }
  }
  &__wrap {
    display: flex;
    flex-direction: column;
    height: 100%;
  }
  &__body {
    flex-grow: 1;
  }
  &__name-pr {
    padding-right: 8px;
  }

  &__text {
    margin-top: auto;
  }
  &__img {
    transition: 0.3s;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  &__arrow {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background-color: rgb(var(--primary));
    flex: 0 0 45px;
    width: 45px;
    height: 45px;
    border-radius: 50%;
    transition: 0.3s;
    position: absolute;
    right: 25px;
    bottom: 18px;
  }
  a.slider__wrap {
    transition: 0.3s;
    display: block;
    border-radius: var(--radiusBig);
    overflow: hidden;
    &:hover {
      @media (min-width: 1024px) {
        background-color: rgb(var(--darkBg));
        .slider {
          &__info {
            background-color: rgb(var(--darkBg));
          }
          &__arrow {
            transform: rotate(-45deg);
          }
          &__img img {
            filter: grayscale(100%);
          }
        }
      }
    }
  }
}

.slider-swiper {
  .swiper-slide {
    background-color: rgb(var(--lightBg));
    border-radius: 20px;
    height: auto;
    @media (max-width: 767px) {
      border-radius: 15px;
    }
  }
  padding-top: 100px !important  ;
  @media (max-width: 767px) {
    padding-top: 80px !important;
  }
  .swiper-button-next,
  .swiper-button-prev {
    top: 30px;
    right: 0;
    left: auto;
  }
  .swiper-button-prev {
    right: 80px;
    @media (max-width: 767px) {
      right: 70px;
    }
  }
}

// .slider-simple {
//   .slider {
//     &__info {
//       flex-direction: column;
//       text-align: left;
//       align-items: flex-start;
//     }
//     &__name {
//       margin-bottom: 5px;
//       flex-grow: 1;
//     }
//     &__text {
//       margin-top: auto;
//     }
//   }
// }
</style>
