<template>
  <div class="bg-block--beige activation">
    <div class="activation__head block-head">
      <div class="activation__container">
        <div class="activation__info">
          <h2 class="title activation__title">
            Для активации аккаунта добавь свое фото
          </h2>
          <div class="activation__subtitle">
            Данное фото будет использоваться в профиле твоего кабинета. По этому
            фото будет происходить идентификация на ресепшене.
          </div>
        </div>
      </div>
    </div>
    <div class="activation__body bg-block--white block-body">
      <div class="activation__container">
        <form class="activation-form">
          <div class="activation-form__photo" @click="openFileDialog">
            <img v-if="avatarUrl" :src="avatarUrl" class="avatar-preview" />
            <svg
              v-else
              width="62"
              height="62"
              viewBox="0 0 62 62"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M54.587 14.826H48.1174L44.5457 9.43473C43.1978 7.41299 40.8391 6.19995 38.413 6.19995H23.587C21.1609 6.19995 18.8022 7.41299 17.4543 9.43473L13.8826 14.826H7.41304C3.30217 14.826 0 18.1282 0 22.2391V48.3869C0 52.4978 3.30217 55.7999 7.41304 55.7999H54.587C58.6978 55.7999 62 52.4978 62 48.3869V22.2391C62 18.1282 58.6978 14.826 54.587 14.826ZM31 49.7347C21.7674 49.7347 14.287 42.2543 14.287 33.0217C14.287 23.7891 21.7674 16.376 31 16.376C40.2326 16.376 47.713 23.8565 47.713 33.0891C47.713 42.2543 40.2326 49.7347 31 49.7347ZM53.6435 25.2717C53.5761 25.2717 53.5087 25.2717 53.3739 25.2717H50.6783C49.4652 25.2043 48.5217 24.1934 48.5891 22.9804C48.6565 21.8347 49.5326 20.9586 50.6783 20.8913H53.3739C54.587 20.8239 55.5978 21.7673 55.6652 22.9804C55.7326 24.1934 54.8565 25.2043 53.6435 25.2717Z"
                fill="#1D1F76"
              />
              <path
                d="M30.9992 23.7892C25.8775 23.7892 21.6992 27.9674 21.6992 33.0892C21.6992 38.2109 25.8775 42.3218 30.9992 42.3218C36.121 42.3218 40.2992 38.1435 40.2992 33.0218C40.2992 27.9001 36.121 23.7892 30.9992 23.7892Z"
                fill="#1D1F76"
              />
            </svg>
            <input
              ref="fileInput"
              type="file"
              accept="image/*"
              style="display: none"
              @change="onFileChange"
            />
          </div>
          <div class="activation-form__more">
            <Button label="Продолжить" class="btn-primary" />
          </div>
        </form>
        <div v-if="showCropper" class="modal-cropper">
          <div class="modal-cropper__header">
            <button class="modal-cropper__back" @click="showCropper = false">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7.29289 0.292893C7.68342 -0.0976311 8.31658 -0.0976311 8.70711 0.292893C9.09763 0.683418 9.09763 1.31658 8.70711 1.70711L3.414 7H17C17.5128 7 17.9355 7.38604 17.9933 7.88338L18 8C18 8.55228 17.5523 9 17 9H3.414L8.70711 14.2929C9.06759 14.6534 9.09532 15.2206 8.7903 15.6129L8.70711 15.7071C8.31658 16.0976 7.68342 16.0976 7.29289 15.7071L0.292893 8.70711L0.219689 8.62545C0.217372 8.62256 0.215071 8.61966 0.212786 8.61675C0.207285 8.60984 0.201753 8.6026 0.196334 8.59531C0.17849 8.57113 0.161719 8.54628 0.146068 8.52066C0.138607 8.50861 0.131499 8.49639 0.124671 8.48406C0.113794 8.46429 0.103377 8.44389 0.0936537 8.4231C0.0856789 8.4061 0.0781966 8.3888 0.0712256 8.37134C0.0633159 8.35158 0.0561225 8.3318 0.0495467 8.31174C0.0447288 8.29685 0.0400979 8.28146 0.0358453 8.26599C0.0298338 8.24444 0.0246396 8.22275 0.020165 8.20079C0.016702 8.18338 0.0136281 8.16595 0.0110178 8.14847C0.00376119 8.10036 0 8.05062 0 8L0.00396633 8.08925C0.0018949 8.066 0.000634706 8.04268 0.000185966 8.01935L0 8C0 7.99359 6.03044e-05 7.9872 0.000180244 7.98082C0.000599384 7.95798 0.00186552 7.93433 0.00396633 7.91075C0.00576604 7.89015 0.00811212 7.8705 0.0110192 7.85104C0.013628 7.83405 0.0167024 7.81663 0.0202403 7.79927C0.02464 7.77725 0.0298335 7.75556 0.0357208 7.73416C0.0400976 7.71854 0.0447286 7.70315 0.0497379 7.68786C0.0561223 7.6682 0.0633158 7.64842 0.071104 7.62894C0.0781965 7.61121 0.0856789 7.5939 0.0936732 7.57678C0.103377 7.55611 0.113794 7.53571 0.124876 7.51572C0.131499 7.50361 0.138607 7.49139 0.145996 7.47929C0.161719 7.45373 0.17849 7.42887 0.196313 7.40484C0.225313 7.36567 0.257499 7.32829 0.292893 7.29289L0.212786 7.38325C0.237669 7.35153 0.264427 7.32136 0.292893 7.29289L7.29289 0.292893Z"
                  fill="white"
                />
              </svg>
            </button>
            <div class="modal-cropper__title">Миниатюра</div>
          </div>
          <div class="modal-cropper__body">
            <div class="modal-cropper__overlay"></div>
            <div
              class="cropper-preview-wrap"
              @wheel="onCropperWheel"
              ref="cropperWrap"
            >
              <div
                v-if="showCropper"
                class="cropper-preview-wrap__overlay"
                :style="{ zIndex: 99 }"
              >
                <svg
                  :width="overlayWidth"
                  :height="overlayHeight"
                  style="display: block; width: 100%; height: 100%"
                >
                  <defs>
                    <mask id="avatar-mask">
                      <rect
                        :width="overlayWidth"
                        :height="overlayHeight"
                        fill="white"
                      />
                      <circle :cx="cursorX" :cy="cursorY" r="95" fill="black" />
                    </mask>
                  </defs>
                  <rect
                    :width="overlayWidth"
                    :height="overlayHeight"
                    fill="rgba(0,0,0,0.7)"
                    :mask="'url(#avatar-mask)'"
                  />
                </svg>
              </div>
              <div
                v-if="showCropper"
                class="cropper-preview-wrap__cursor"
                :style="cursorStyle"
                @mousedown.stop.prevent="onDragStart"
                @touchstart.stop.prevent="onDragStart"
              ></div>
              <Cropper
                ref="setCropperRef"
                :src="selectedImage"
                :stencil-props="{
                  aspectRatio: 1,
                  circular: true,
                  width: 190,
                  height: 190,
                  movable: true,
                  resizable: false,
                  handlers: false,
                }"
                :stencil-component="null"
                :background-props="{ visible: false }"
                :transitions="false"
                :overlay="false"
                tabindex="0"
                @change="onCropChange"
                @ready="onCropperReady"
              />
              <img
                v-if="selectedImage"
                :src="selectedImage"
                class="debug-preview"
              />
            </div>
          </div>
          <div class="modal-cropper__footer">
            <button class="btn btn-light" @click="applyCrop">Продолжить</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Button from "../../components/UI/TheButton.vue";
import { Cropper } from "vue-advanced-cropper";
export default {
  components: {
    Button,
    Cropper,
  },
  data() {
    return {
      avatarUrl: null,
      showCropper: false,
      selectedImage: null,
      cropResult: null,
      cropperRef: null, // ссылка на cropper
      cursorX: null,
      cursorY: null,
      dragging: false,
      dragOffsetX: 0,
      dragOffsetY: 0,
      wrapRect: null,
      overlayWidth: 400,
      overlayHeight: 400,
    };
  },
  computed: {
    cursorStyle() {
      return {
        left: (this.cursorX !== null ? this.cursorX : 0) + "px",
        top: (this.cursorY !== null ? this.cursorY : 0) + "px",
        cursor: this.dragging ? "grabbing" : "grab",
      };
    },
  },
  watch: {
    cursorX(val) {
      this.updateOverlayPosition();
    },
    cursorY(val) {
      this.updateOverlayPosition();
    },
  },
  methods: {
    openFileDialog() {
      this.$refs.fileInput.click();
    },
    onFileChange(e) {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          this.selectedImage = event.target.result;
          this.showCropper = true;
          // Не центрируем здесь! Только после onReady cropper
        };
        reader.readAsDataURL(file);
      }
    },
    onCropChange({ canvas }) {
      this.cropResult = canvas ? canvas.toDataURL() : null;
    },
    applyCrop() {
      // Перед сохранением двигаем cropper в нужную позицию
      this.moveCropperToCursor();
      this.$nextTick(() => {
        let canvas = null;
        if (this.cropperRef && this.cropperRef.getResult) {
          const result = this.cropperRef.getResult();
          if (result && result.canvas) {
            canvas = result.canvas;
          }
        }
        this.avatarUrl = canvas ? canvas.toDataURL() : this.cropResult;
        this.showCropper = false;
        this.cursorX = null;
        this.cursorY = null;
        this.dragging = false;
        this.removeGlobalDragListeners();
      });
    },
    onCropperWheel(e) {
      if (this.cropperRef && this.cropperRef.zoom) {
        e.preventDefault();
        const delta = e.deltaY < 0 ? 0.05 : -0.05;
        this.cropperRef.zoom(delta);
      }
    },
    onCursorDown(e) {
      if (!this.showCropper) return;
      let x, y;
      if (e.touches && e.touches.length) {
        const rect = e.target.parentElement.getBoundingClientRect();
        x = e.touches[0].clientX - rect.left;
        y = e.touches[0].clientY - rect.top;
      } else {
        const rect = e.target.parentElement.getBoundingClientRect();
        x = e.clientX - rect.left;
        y = e.clientY - rect.top;
      }
      const dx = x - this.cursorX;
      const dy = y - this.cursorY;
      if (Math.sqrt(dx * dx + dy * dy) <= 95) {
        this.dragging = true;
        this.dragOffsetX = x - this.cursorX;
        this.dragOffsetY = y - this.cursorY;
        document.body.style.userSelect = "none";
        window.addEventListener("mousemove", this.onGlobalCursorMove);
        window.addEventListener("touchmove", this.onGlobalCursorMove, {
          passive: false,
        });
        window.addEventListener("mouseup", this.onCursorUp);
        window.addEventListener("touchend", this.onCursorUp);
        window.addEventListener("touchcancel", this.onCursorUp);
      }
    },
    onGlobalCursorMove(e) {
      if (!this.showCropper || !this.dragging) return;
      let x, y, wrap;
      wrap = this.$el.querySelector(".cropper-preview-wrap");
      if (!wrap) return;
      if (e.touches && e.touches.length) {
        const rect = wrap.getBoundingClientRect();
        x = e.touches[0].clientX - rect.left;
        y = e.touches[0].clientY - rect.top;
      } else {
        const rect = wrap.getBoundingClientRect();
        x = e.clientX - rect.left;
        y = e.clientY - rect.top;
      }
      // Ограничиваем движение курсора внутри области
      const min = 95;
      const maxX = wrap.offsetWidth - 95;
      const maxY = wrap.offsetHeight - 95;
      this.cursorX = Math.max(min, Math.min(x - this.dragOffsetX, maxX));
      this.cursorY = Math.max(min, Math.min(y - this.dragOffsetY, maxY));
      this.moveCropperToCursor();
    },
    onCursorUp() {
      this.dragging = false;
      document.body.style.userSelect = "";
      this.removeGlobalDragListeners();
    },
    removeGlobalDragListeners() {
      window.removeEventListener("mousemove", this.onGlobalCursorMove);
      window.removeEventListener("touchmove", this.onGlobalCursorMove);
      window.removeEventListener("mouseup", this.onCursorUp);
      window.removeEventListener("touchend", this.onCursorUp);
      window.removeEventListener("touchcancel", this.onCursorUp);
    },
    onDragStart(e) {
      e.preventDefault();
      this.onCursorDown(e);
    },
    moveCropperToCursor() {
      if (
        this.cropperRef &&
        this.cropperRef.move &&
        this.cropperRef.coordinatesToImage &&
        this.cursorX !== null &&
        this.cursorY !== null &&
        this.$refs.cropperWrap &&
        this.cropperRef.$el
      ) {
        // Переводим координаты центра круга из cropper-preview-wrap в cropper-контейнер
        const wrapRect = this.$refs.cropperWrap.getBoundingClientRect();
        const cropperRect = this.cropperRef.$el.getBoundingClientRect();
        const xInCropper = this.cursorX + (wrapRect.left - cropperRect.left);
        const yInCropper = this.cursorY + (wrapRect.top - cropperRect.top);
        const imgCoords = this.cropperRef.coordinatesToImage({
          x: xInCropper,
          y: yInCropper,
        });
        // Поправка: если move ожидает левый верхний угол, а не центр
        let moveX = imgCoords.x;
        let moveY = imgCoords.y;
        if (this.cropperRef.getCoordinates) {
          const coords = this.cropperRef.getCoordinates();
          if (coords && coords.width && coords.height) {
            moveX = imgCoords.x - coords.width / 2;
            moveY = imgCoords.y - coords.height / 2;
            // Отладка:
            console.log(
              "Курсор:",
              this.cursorX,
              this.cursorY,
              "img:",
              imgCoords,
              "cropper:",
              coords
            );
          }
        }
        this.cropperRef.move(moveX, moveY);
      }
    },
    onCropperReady() {
      // Центрируем курсор и cropper только после полной загрузки изображения
      this.$nextTick(() => {
        requestAnimationFrame(() => {
          const wrap = this.$el.querySelector(".cropper-preview-wrap");
          if (wrap) {
            this.wrapRect = wrap.getBoundingClientRect();
            this.cursorX = wrap.offsetWidth / 2;
            this.cursorY = wrap.offsetHeight / 2;
            this.moveCropperToCursor();
          }
        });
      });
    },
    setCropperRef(ref) {
      this.cropperRef = ref;
    },
    updateOverlayPosition() {
      if (this.$refs.cropperWrap) {
        // Обновляем размеры overlay
        this.overlayWidth = this.$refs.cropperWrap.offsetWidth;
        this.overlayHeight = this.$refs.cropperWrap.offsetHeight;
      }
    },
  },
  beforeDestroy() {
    this.removeGlobalDragListeners();
  },
};
</script>

<style lang="scss" scoped>
.activation-form {
  display: flex;
  flex-direction: column;
  &__photo {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 190px;
    height: 190px;
    border-radius: 50%;
    background-color: var(--lightSecondary);
    margin: 0 auto 40px;
    cursor: pointer;
    overflow: hidden;
    position: relative;
    .avatar-preview {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 50%;
      position: absolute;
      top: 0;
      left: 0;
    }
  }
}
.modal-cropper {
  position: fixed;
  inset: 0;
  z-index: 1000;
  background: var(--text);
  display: flex;
  flex-direction: column;

  .vue-advanced-cropper {
    width: 100%;
    max-width: 100vw;
    max-height: 100vh;
  }

  &__header {
    display: flex;
    align-items: center;
    padding: 16px;
    border-bottom: 1px solid #eee;
  }
  &__back {
    background: none;
    border: none;
    margin-right: 16px;
    cursor: pointer;
    display: flex;
    align-items: center;
    svg {
      display: block;
    }
  }
  &__body {
    flex: 1 1 auto;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 0;
    padding: 24px 0;
    overflow: hidden;
    position: relative;
    .cropper-preview-wrap {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 100%;
      outline: none;
      position: relative;
      &__overlay {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
      }
      &__cursor {
        position: absolute;
        width: 190px;
        height: 190px;
        border: 2px solid #42b883;
        border-radius: 50%;
        pointer-events: auto;
        z-index: 100;
        box-sizing: border-box;
        background: transparent;
        transform: translate(-50%, -50%);
        touch-action: none;
      }
      &:focus {
        cursor: none;
      }
      &:focus::after {
        display: block;
      }
    }
    .debug-preview {
      // max-width: 100vh;
      // max-height: 100vw;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }
  }
  &__overlay {
    position: absolute;
    background-color: rgba(var(--black), 0.2);
    display: block;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 50;
  }
  &__footer {
    padding: 16px;
    border-top: 1px solid #eee;
    display: flex;
    justify-content: center;
  }
  &__title {
    font-size: 24px;
    font-weight: 700;
    font-family: var(--stetica);
    color: rgb(var(--white));
  }
}
.vue-advanced-cropper__overlay {
  background: transparent !important;
}
</style>
