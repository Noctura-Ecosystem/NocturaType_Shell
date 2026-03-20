<script setup lang="ts">
  import bottomPanel from "./components/bottom-panel/bottom-panel.vue"
  import upperPanel from "./components/upper-panel/upper-panel.vue"
</script>

<template>
  <div class="background">
    <bottomPanel />
    <upperPanel />
  </div>
</template>

<style>
  * { /* for dev */
    outline: 1px solid red;
  }
  html, body {
    overflow: hidden;
    overflow-x: hidden;
    position: relative;
  }

  .background {
    position: relative;
    height: 100vh;
    width: 100vw;
    background-image: url("/assets/My_cool_flamingo_wallpaper.png");
    background-size: cover;
    background-position: center;
    overflow: hidden;
  }

  :root {
    --primary: #acacac;
  }
</style>