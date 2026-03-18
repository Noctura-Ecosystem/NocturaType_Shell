<script setup lang="ts">
  import panel from "./components/panel/panel.vue"
</script>

<template>
  <div class="background">
    <panel />
  </div>
</template>

<style scoped>
  .background {
    height: 100%;
    margin: 0;
    background-image: url("/assets/My_cool_flamingo_wallpaper.png");
    background-size: cover;
    background-position: center;
    overflow: hidden;
  }

  :root {
    --primary: #acacac;
  }
</style>