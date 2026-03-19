<script setup lang="ts">
  import panel from "./components/panel/bottom-panel.vue"
</script>

<template>
  <div class="background">
    <panel />
  </div>
</template>

<style>
  /*
  * { /* for dev *//*
    outline: 1px solid red;
  }
  html, body {
    overflow: hidden;
    overflow-x: hidden;
    position: relative;
  }
  */

  .background {
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