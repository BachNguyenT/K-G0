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
  min-height: 100vh;
  background-color: black;
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
  /* background-color: black; */
  display: flex;
  flex-direction: row;
  padding: 2rem 0;
  height: 100vh;
  margin: 0 auto;
}

.notsupported {
  display: none;
}

@media (max-width: 1000px) {
  .notsupported {
    display: flex;
    width: 100vw;
    height: 100vh;
    background-color: black;
    display: block;
    z-index: 999;
    text-align: center;
    align-content: center;
    color: red;
    font-size: 25px;
  }

  .container {
    display: none;
  }
}
</style>
