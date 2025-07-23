<template>
  <router-link to="/log-in">login</router-link>
  <Card :cardOptions="cardTariff" />
</template>

<script>
import Card from "../components/TheCard.vue";
export default {
  components: {
    Card,
  },
  data() {
    return {
      cardTariff: {
        cardTtariff: "gold",
        tariff: "326 мест",
      },
    };
  },
};
</script>

<style lang="scss"></style>
