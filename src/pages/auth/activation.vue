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
            <Button
              label="Продолжить"
              class="btn-primary"
              @click.prevent="applyCrop"
            />
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
            <div
              class="custom-cropper"
              ref="customCropper"
              @mousedown="startDrag"
              @mousemove="onDrag"
              @mouseup="stopDrag"
              @mouseleave="stopDrag"
              @touchstart="startDrag"
              @touchmove="onDrag"
              @touchend="stopDrag"
            >
              <canvas
                ref="canvas"
                :width="canvasSize"
                :height="canvasSize"
                class="custom-cropper__canvas"
              ></canvas>
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
export default {
  components: { Button },
  data() {
    return {
      avatarUrl: null,
      showCropper: false,
      selectedImage: null,
      image: null,
      canvasSize: 320,
      cropRadius: 95,
      cropX: 160,
      cropY: 160,
      dragging: false,
      dragOffsetX: 0,
      dragOffsetY: 0,
    };
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
          this.$nextTick(() => {
            this.loadImage();
          });
        };
        reader.readAsDataURL(file);
      }
    },
    loadImage() {
      const img = new window.Image();
      img.onload = () => {
        this.image = img;
        this.drawCanvas();
      };
      img.src = this.selectedImage;
    },
    drawCanvas() {
      const canvas = this.$refs.canvas;
      if (!canvas || !this.image) return;
      const ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, this.canvasSize, this.canvasSize);
      // Нарисовать фото по центру
      const scale = Math.max(
        this.canvasSize / this.image.width,
        this.canvasSize / this.image.height
      );
      const imgW = this.image.width * scale;
      const imgH = this.image.height * scale;
      const imgX = (this.canvasSize - imgW) / 2;
      const imgY = (this.canvasSize - imgH) / 2;
      ctx.drawImage(this.image, imgX, imgY, imgW, imgH);
      // Overlay
      ctx.save();
      ctx.globalAlpha = 0.7;
      ctx.fillStyle = "#000";
      ctx.beginPath();
      ctx.arc(this.cropX, this.cropY, this.cropRadius, 0, Math.PI * 2);
      ctx.rect(this.canvasSize, 0, -this.canvasSize, this.canvasSize);
      ctx.closePath();
      ctx.fill("evenodd");
      ctx.restore();
      // Круглая рамка
      ctx.save();
      ctx.beginPath();
      ctx.arc(this.cropX, this.cropY, this.cropRadius, 0, Math.PI * 2);
      ctx.lineWidth = 2;
      ctx.strokeStyle = "#42b883";
      ctx.stroke();
      ctx.restore();
    },
    startDrag(e) {
      let x, y;
      if (e.touches && e.touches.length) {
        const rect = this.$refs.customCropper.getBoundingClientRect();
        x = e.touches[0].clientX - rect.left;
        y = e.touches[0].clientY - rect.top;
      } else {
        const rect = this.$refs.customCropper.getBoundingClientRect();
        x = e.clientX - rect.left;
        y = e.clientY - rect.top;
      }
      const dx = x - this.cropX;
      const dy = y - this.cropY;
      if (Math.sqrt(dx * dx + dy * dy) <= this.cropRadius) {
        this.dragging = true;
        this.dragOffsetX = dx;
        this.dragOffsetY = dy;
      }
    },
    onDrag(e) {
      if (!this.dragging) return;
      let x, y;
      if (e.touches && e.touches.length) {
        const rect = this.$refs.customCropper.getBoundingClientRect();
        x = e.touches[0].clientX - rect.left;
        y = e.touches[0].clientY - rect.top;
      } else {
        const rect = this.$refs.customCropper.getBoundingClientRect();
        x = e.clientX - rect.left;
        y = e.clientY - rect.top;
      }
      // Ограничить круг в пределах canvas
      const min = this.cropRadius;
      const max = this.canvasSize - this.cropRadius;
      this.cropX = Math.max(min, Math.min(x - this.dragOffsetX, max));
      this.cropY = Math.max(min, Math.min(y - this.dragOffsetY, max));
      this.drawCanvas();
    },
    stopDrag() {
      this.dragging = false;
    },
    applyCrop() {
      // Вырезать область круга из исходного изображения
      if (!this.image) return;
      const scale = Math.max(
        this.canvasSize / this.image.width,
        this.canvasSize / this.image.height
      );
      const imgW = this.image.width * scale;
      const imgH = this.image.height * scale;
      const imgX = (this.canvasSize - imgW) / 2;
      const imgY = (this.canvasSize - imgH) / 2;
      // Координаты центра круга в исходном изображении
      const centerX = (this.cropX - imgX) / scale;
      const centerY = (this.cropY - imgY) / scale;
      // Создать временный canvas для аватарки
      const avatarCanvas = document.createElement("canvas");
      avatarCanvas.width = this.cropRadius * 2;
      avatarCanvas.height = this.cropRadius * 2;
      const avatarCtx = avatarCanvas.getContext("2d");
      avatarCtx.save();
      avatarCtx.beginPath();
      avatarCtx.arc(
        this.cropRadius,
        this.cropRadius,
        this.cropRadius,
        0,
        Math.PI * 2
      );
      avatarCtx.closePath();
      avatarCtx.clip();
      avatarCtx.drawImage(
        this.image,
        centerX - this.cropRadius / scale,
        centerY - this.cropRadius / scale,
        (this.cropRadius * 2) / scale,
        (this.cropRadius * 2) / scale,
        0,
        0,
        this.cropRadius * 2,
        this.cropRadius * 2
      );
      avatarCtx.restore();
      this.avatarUrl = avatarCanvas.toDataURL();
      this.showCropper = false;
    },
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
  &__header {
    display: flex;
    align-items: center;
    padding: 16px;
    border-bottom: 1px solid #eee;
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
    .custom-cropper {
      position: relative;
      width: 320px;
      height: 320px;
      margin: 0 auto;
      &__canvas {
        width: 320px;
        height: 320px;
        display: block;
        background: #222;
        border-radius: 12px;
        box-shadow: 0 2px 16px rgba(0, 0, 0, 0.12);
      }
    }
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
</style>
