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
    :autoHeight="options.autoHeight"
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
              <div>
                <p>Высокий спрос!</p>
                <p>
                  Залы переполнены. Необходимо уточнить доступность времени на
                  ресепшене.
                </p>
              </div>
              <a :href="`tel:${slide.phone}`" class="btn btn-primary"
                >Связаться</a
              >
            </div>
          </div>
        </div>
      </div>

      <div class="slider" v-if="typeSlider === 'code'">
        <div class="slider__wrap">
          <div class="slider__head">
            <div class="slider__photo">
              <img :src="slide.photo" alt="" />
            </div>
            <div class="slider__name">
              <p>{{ slide.name }}</p>
              <p>{{ slide.lastName }}</p>
            </div>
          </div>
          <div class="slider__body">
            <img :src="slide.qrCode" alt="" />
          </div>
          <div class="slider__footer">
            <div class="slider__info">
              <div class="slider__text">Срок действия QR-кода</div>
              <div class="slider__time">{{ slide.qrCodeTime }}</div>
            </div>
            <div class="slider__send">
              <button class="btn btn-primary">Создать новый</button>
            </div>
          </div>
        </div>
      </div>
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
    class: { type: String, default: "", required: false },
  },
  mounted() {
    console.log(this.options);
  },
  methods: {
    handleSlideClick(slide) {
      // console.log("Клик по слайду:", slide);
      this.$emit("slide-click", slide);
    },
    handleSlideChange(swiper) {
      const activeSlide = this.slider[swiper.activeIndex];

      if (
        activeSlide &&
        activeSlide.coordinates &&
        activeSlide.coordinates.length === 2
      ) {
        // console.log(
        //   "Центрируем карту на:",
        //   activeSlide.name,
        //   activeSlide.coordinates
        // );
        // Эмитим событие для центрирования карты
        this.$emit("slide-change", activeSlide);
        // console.log("🎯 СОБЫТИЕ slide-change ЭМИТИРОВАНО!");
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

<style lang="scss">
.slider-map {
  padding-top: 20px;
  .slider {
    margin: 0 auto;
    max-width: 50%;
    @media (max-width: 575px) {
      max-width: 90%;
    }
    &__small {
      background-color: rgba(255, 241, 215, 1);
      padding: 15px;
      margin-top: 10px;
      border-radius: 16px;
      div {
        p:first-child {
          font-size: 14px;
          font-weight: 700;
          margin-bottom: 10px;
          font-family: var(--ff);
        }
        p:last-child {
          font-size: 12px;
          font-weight: 500;
          margin-bottom: 10px;
          font-family: var(--ff);
          line-height: 20px;
        }
      }
    }
    &__wrap {
      margin: 0 auto;
    }
    &__img {
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 4px;
      }
    }
    &__head {
      display: grid;
      grid-template-columns: 115px auto;
      gap: 10px;
    }
    &__name {
      font-size: 16px;
      font-weight: 500;
      font-family: var(--stetica);
      margin-bottom: 15px;
      margin-top: 10px;
    }
    &__time {
      display: flex;
      align-items: center;
      gap: 10px;
      font-size: 12px;
      font-weight: 400;
      font-family: var(--ff);
      margin-bottom: 10px;
    }
    &__location {
      display: flex;
      align-items: center;
      gap: 10px;
      font-size: 12px;
      font-weight: 400;
      font-family: var(--ff);
    }
    &__tags {
      display: flex;
      gap: 5px;
      flex-wrap: wrap;
    }
  }
  .slider-tag {
    background-color: rgba(215, 235, 255, 1);
    border-radius: 5px;
    font-size: 12px;
    font-weight: 400;
    font-family: var(--ff);
    padding: 3px 10px;
    border: solid 1px transparent;
    white-space: nowrap;
    margin-top: 10px;
    &:last-child {
      background: none;
      border-color: rgba(237, 237, 237, 1);
    }
  }
  .swiper-pagination {
    top: 0px;
    z-index: 0;
  }
  .swiper-pagination-bullets {
    display: flex;
  }
  .swiper-pagination-bullet {
    background-color: rgba(255, 211, 126, 1);
    width: 6px;
    height: 6px;
    flex: 0 0 6px;
    margin: 0 2px !important;
    position: relative;
    display: block;
    &.swiper-pagination-bullet-active-next {
      width: 6px;
      height: 6px;
      flex: 0 0 6px;
      opacity: 1;
      transform: scale(1);
      background-color: rgba(229, 229, 229, 1);
    }
    &.swiper-pagination-bullet-active-prev {
      width: 6px;
      height: 6px;
      flex: 0 0 6px;
      opacity: 1;
      transform: scale(1);
      background-color: rgba(229, 229, 229, 1);
    }
    &.swiper-pagination-bullet-active-next-next {
      width: 6px;
      height: 6px;
      flex: 0 0 6px;
      opacity: 1;
      transform: scale(1);
      background-color: rgba(229, 229, 229, 1);
    }
    &.swiper-pagination-bullet-active-prev-prev {
      width: 6px;
      height: 6px;
      flex: 0 0 6px;
      opacity: 1;
      transform: scale(1);
      background-color: rgba(229, 229, 229, 1);
    }
    &.swiper-pagination-bullet-active-next-next {
      // background-color: teal;
      // position: inherit;
      // &::after {
      //   content: "";
      //   display: block;
      //   width: 10px;
      //   background-color: green;
      //   position: absolute;
      //   left: 0;
      //   top: 0;
      //   height: 100%;
      //   border-radius: 50px;
      // }
    }
  }

  .swiper-pagination-bullets-dynamic {
  }
  // swiper-pagination swiper-pagination-clickable swiper-pagination-bullets swiper-pagination-horizontal swiper-pagination-bullets-dynamic
}

.slider-code {
  padding-top: 20px;
  overflow: visible;

  .slider {
    margin: 0 auto 0;
    transform: translateY(-110px);
    margin-bottom: -100px;
    max-width: 220px;
    &__head {
      margin: 0 auto;
      text-align: center;
    }
    &__body {
      text-align: center;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
    &__footer {
    }
    &__photo {
      width: 120px;
      height: 120px;
      border-radius: 50%;
      border: solid 2px #fff;
      background-color: #dedede;
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      margin: 0 auto 10px;
      img {
      }
    }
    &__name {
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 24px;
      font-weight: 500;
      font-family: var(--stetica);
      margin-bottom: 50px;
    }
    &__info {
      display: flex;
      justify-content: center;
      margin: 20px 0;
      gap: 10px;
    }
    &__text {
      font-size: 14px;
      font-weight: 500;
      font-family: var(--ff);
    }
    &__time {
      white-space: nowrap;
      font-size: 24px;
      font-weight: 500;
      font-family: var(--stetica);
      margin-top: -5px;
      margin-bottom: 4px;
    }
  }
  .swiper-pagination {
    top: 90px;
    z-index: 0;
  }
  .swiper-pagination-bullets {
    display: flex;
    justify-content: center;
  }

  .swiper-pagination-bullet {
    background-color: rgba(255, 211, 126, 1);
    width: 6px;
    height: 6px;
    flex: 0 0 6px;
    margin: 0 2px !important;
    position: relative;
    display: block;
    margin: 0 auto;

    &.swiper-pagination-bullet-active {
      background-color: var(--primary);
      position: relative;
      width: 33px !important;
      flex: 0 0 33px !important;
      border-radius: 50px;
    }

    // &.swiper-pagination-bullet-active-next {
    //   width: 6px;
    //   height: 6px;
    //   flex: 0 0 6px;
    //   opacity: 1;
    //   transform: scale(1);
    //   background-color: rgba(229, 229, 229, 1);
    // }

    // &.swiper-pagination-bullet-active-prev {
    //   width: 6px;
    //   height: 6px;
    //   flex: 0 0 6px;
    //   opacity: 1;
    //   transform: scale(1);
    //   background-color: rgba(229, 229, 229, 1);
    // }
  }
  .swiper-button-next,
  .swiper-button-prev {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    flex: 0 0 40px;
    background-color: rgba(255, 241, 215, 1);
    top: -27px;
    &::after {
      color: rgba(29, 29, 29, 1);
      font-size: 20px;
      font-weight: 700;
    }
  }
  .swiper-button-next {
  }
  .swiper-button-prev {
  }
}
</style>
