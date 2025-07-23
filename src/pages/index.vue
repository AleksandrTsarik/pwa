<template>
  <router-link to="/log-in">login</router-link>
  <Card :cardOptions="cardTariff" />
  <Card :cardOptions="cardTariff2" />
  <Card :cardOptions="cardTariff3" />

  <NavMenu />
</template>

<script>
import Card from "../components/TheCard.vue";
import NavMenu from "../components/TheNav.vue";
export default {
  components: {
    Card,
    NavMenu,
  },
  data() {
    return {
      cardTariff: {
        cardTtariff: "gold",
        tariff: "326 мест",
      },
      cardTariff2: {
        cardTtariff: "silver",
        tariff: "36 мест",
      },
      cardTariff3: {
        cardTtariff: "black",
        tariff: "32 мест",
      },
    };
  },
};
</script>

<style lang="scss"></style>
