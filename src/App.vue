<template>
  <div class="app">
    <div class="notsupported">
      <span class="invalidtext">Warning: This resolution is not supported</span>
    </div>
    <div class="container">
      <div class="img_container">
        <img class="img" v-bind:src="require('./assets/bg.jpeg')" />
      </div>
      <DonationForm class="form" />
    </div>
  </div>
</template>

<script>
import DonationForm from "./components/Form/DonationForm.vue";

export default {
  name: "App",
  components: {
    DonationForm,
  },
};
</script>

<style scoped src="./App.css"></style>
