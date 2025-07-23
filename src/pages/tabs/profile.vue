<template>
  <div class="profile bg-block--primary">
    <div class="profile__head block-head">
      <div class="profile__container">
        <h2 class="title profile__title">Профиль</h2>
        <div class="profile__photo">
          <img v-if="profilePhoto" :src="profilePhoto" alt="photo" />
        </div>
      </div>
    </div>
    <div class="profile__body bg-block--white block-body">
      <div class="profile__container">
        <div class="profile-info">
          <div class="profile-info__user">
            <div class="profile-info__name">Виктор Куликов</div>
            <div class="profile-info__position">Менеджер проектов</div>
          </div>
          <Card :cardOptions="cardInfo" />

          <div class="profile-info__visit">
            <div class="profile-info__visit-title">
              Посещений на этой неделе
            </div>
            <div class="profile-info__visit-list">
              <div
                class="profile-info__visit-item"
                v-for="(item, i) in visitList"
                :key="i"
              >
                <span v-if="item.visibility == true"></span>
              </div>
            </div>
            <div class="profile-info__visit-info">
              Ваша карта активна до <span> 25 мая 2026 года</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Card from "../../components/TheCard.vue";
export default {
  components: { Card },
  data() {
    return {
      cardInfo: {
        cardTtariff: "gold",
        tariff: "326 мест",
      },
      visitList: [
        {
          day: "",
          visibility: true,
        },
        {
          day: "",
          visibility: false,
        },
        {
          day: "",
          visibility: true,
        },
        {
          day: "",
          visibility: false,
        },
        {
          day: "",
          visibility: false,
        },
        {
          day: "",
          visibility: true,
        },
        {
          day: "",
          visibility: true,
        },
      ],
      profilePhoto: null,
    };
  },
  mounted() {
    this.profilePhoto = localStorage.getItem("profilePhoto");
  },
  watch: {
    $route() {
      this.profilePhoto = localStorage.getItem("profilePhoto");
    },
  },
};
</script>

<style lang="scss" scoped>
.profile {
  &__head {
    position: relative;
    padding-bottom: 105px;
  }
  &__photo {
    position: absolute;
    left: 50%;
    bottom: -100px;
    transform: translateX(-50%);
    width: 190px;
    height: 190px;
    overflow: hidden;
    border-radius: 50%;
    border: solid 2px #fff;
    background-color: #dedede;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
}
.profile-info {
  margin: 90px auto 0;
  display: flex;
  align-items: center;
  flex-direction: column;
  &__user {
    margin-bottom: 30px;
  }
  &__name {
    font-size: 26px;
    font-weight: 500;
    font-family: var(--stetica);
    margin-bottom: 5px;
  }
  &__position {
    font-size: 22px;
    font-weight: 400;
    font-family: var(--ff);
  }
}
</style>
