<script setup lang="ts">
    import {ref} from "vue";
    let hover = ref(false);
    function topPanelMouse(mouse: boolean) {
        hover.value = mouse;
        console.log("TOP-PANEL:-", hover.value)
    }

</script>


<template>
    <div class="top-panel" :class="{hover: hover}" @mouseenter="topPanelMouse(true)" @mouseleave="topPanelMouse(false)">
      <div class="panel-buttons-wrapper">
        <button class="panel-button">Apps</button>
        <button class="panel-button">Apps</button>
      </div>
    </div>
</template>



<style scoped>
  * {
    outline: 1px solid red; /* temporarily shows boundaries of every element */
  }

  .top-panel {
    overflow: hidden;
    display: flex;
    position: fixed;
    top: 0px;
    background-color: rgba(84, 82, 82, 0.07);
    backdrop-filter: blur(10px);
    border-radius: 30px;
    height: 40px;
    width: 95vw;
    transition: background-color 0.5s ease;
    will-change: transform, background-color;
    padding: 0px 30px;
  }

  .top-panel > * {
    opacity: 0;
    transition: opacity 0.5s ease;
    align-items: center;
  }

  .top-panel:hover > * {
    opacity: 1;
  }

  .top-panel:hover {
    background-color: rgba(84, 82, 82, 0.32);
  }

  .panel-buttons-wrapper {
    display: flex;
    gap: 15px;
  }

  .panel-button {
    flex-direction: row; 
    padding: 10px 20px;
    border: none;
    border-radius: 12px;
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    color: white;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  }

  .panel-button:hover {
    background: rgba(255, 255, 255, 0.4);
    box-shadow: 0 6px 35px rgba(0, 0, 0, 0.2);
  }
</style>