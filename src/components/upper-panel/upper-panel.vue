<script setup lang="ts">
    import {ref} from "vue";
    let hover = ref(false);
    function topPanelMouse(mouse: boolean) {
        hover.value = mouse;
        console.log("TOP-PANEL:-", hover.value)
    }

</script>


<template>
    <div class="top-panel" :class="{hover: hover}" @mouseenter="topPanelMouse(true)" @mouseleave="topPanelMouse(false)"></div>
</template>



<style scoped>
  .top-panel {
    display: flex;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    background-color: rgba(0, 0, 0, 0.07);
    backdrop-filter: blur(10px);
    border-radius: 30px;
    height: 40px;
    width: 95%;
    transition: background-color 1.0s ease;
  }

 .top-panel.hover {
    background-color: rgba(0, 0, 0, 0.3);
  }
</style>