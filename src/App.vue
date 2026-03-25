<script setup lang="ts">
  import bottomPanel from "./components/bottom-panel/bottom-panel.vue"
  import upperPanel from "./components/upper-panel/upper-panel.vue"
  import rightclick from "./components/contexts/rightclick-context.vue"

  document.addEventListener('keydown', (e: KeyboardEvent) => {
    const target = e.target as HTMLElement | null
    const isInput =
      target instanceof HTMLInputElement ||
      target instanceof HTMLTextAreaElement ||
      (target && target.isContentEditable);
    if (isInput) return;
    if (e.ctrlKey || e.metaKey) {
      e.preventDefault();
    }
  });

  document.addEventListener("contextmenu", (e) => {
    e.preventDefault();
    window.openMenu?.(e);
  })

  //document.addEventListener("contextmenu", (e: any) => {
    //e.preventDefault();
  //})

</script>

<template>
  <bottomPanel />
  <upperPanel />
  <rightclick />
  <div class="line"></div>
</template>

<style>

/* for dev */
/*
  * {
    outline: 1px solid red;
  }

  .line {
    position: absolute;
    width: 100vw;
    height: 1px;
    top: 457px;
    background-color: red;
  }
  */

  html, body {
    margin: 0;             /* remove default spacing */
    padding: 0;
    height: 100%;          /* ensure body takes full height */
    width: 100%;
    overflow: hidden;      /* hide scrollbars */
    position: relative;
    user-select: none;
    -webkit-user-select: none;
    background-image: url("/assets/My_cool_flamingo_wallpaper.png");
  }

  input, textarea, [contenteditable="true"] {
    user-select: text;
    -webkit-user-select: text;
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