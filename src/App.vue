<template>
  <div class="app">
    <div class="container">
      <div class="img_container">
        <img class="img" v-bind:src="require('./assets/bg.jpeg')" />
      </div>
      <DonationForm class="form" />
    </div>
  </div>
</template>

<script>
import DonationForm from "./components/DonationForm.vue";

export default {
  name: "App",
  components: {
    DonationForm,
  },
};
</script>

<style>
#app {
  font-family: Poppins;
  font-size: 14px;
}

.app {
}

.image-container {
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  max-height: 100vh - 6rem;
}

.img {
  height: 100%;
  width: auto;
  object-fit: cover;
  object-position: center;
}

.container {
  background-color: black;
  display: flex;
  flex-direction: row;
  padding: 2rem 0;
  height: 100vh;
  margin: 0 auto;
}

@media (max-width: 1000px) {
  .container {
    display: flex;
    flex-direction: column;
  }
}

</style>
