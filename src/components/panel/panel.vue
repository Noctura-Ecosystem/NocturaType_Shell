<script setup lang="ts">
  import  {ref, onMounted} from "vue"
  import { invoke } from "@tauri-apps/api/core";
  import { listen } from '@tauri-apps/api/event'
  const hovered = ref(false);
  const leaving = ref(false);
  const icons = ref<AppIcon[]>([]);

  type AppIcon = {
    name: string
    src: string
  }

  function handleBackendMessage(payload: AppIcon) {
    const path = `/assets/${payload.src.replace(/^\/+/, "")}`;
    const name = payload.name.replace(/^\/+/, "");
    console.log(`PATH: ${path},  NAME: ${name}`);
    icons.value.push({
      name: name,
      src: path
    });
  };

  function onEnter() {
    console.log("Hovering");
    hovered.value = true;
    leaving.value = false;
  }

  function onLeave() {
    console.log("Leaving");
    leaving.value = true;
    hovered.value = false;
  }

  onMounted(async () => {
    try {
      const unlisten = await listen<AppIcon>("add-app", (event) => {
        handleBackendMessage(event.payload);
      });

      /* example apps*/
      await invoke("add_app", {appName: "Realy Cool App", appPath: "Realy_Cool_App.png"}); /* in case of weird proportions*/
      await invoke("add_app", {appName: "Another Realy Cool App", appPath: "help-about.svg"}); /* normal test data */
      await invoke("add_app", {appName: "One more", appPath: "help-about.svg"}); /* one more normal test data */
      await invoke("add_app", {appName: "Last one i swear", appPath: "help-about.svg"}); /* one more normal test data */

      return unlisten;
    } 
    catch (error) {
      console.log("Error initializing dock:", error);
    }
  });


</script>

<template>
  <div class="panel-background" :class="{ hovered: hovered, leaving: leaving}" @mouseenter="onEnter" @mouseleave="onLeave">
    <button v-for="(icon, index) in icons" :key="index" class="img-wrapper">
      <img :src="icon.src"/>
      <span class="tooltip">{{ icon.name }}</span>
    </button>
  </div>
</template>

<style scoped>
.panel-background {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 40px;
  width: fit-content; 
  min-width: 5%;
  height: 70px;
  position: absolute;
  bottom: -55px;
  backdrop-filter: blur(10px);
  gap: 40px;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 30px;
  left: 50%;
  transform: translateX(-50%);
  transition: transform 0.5s ease;
}

.panel-background.hovered {
  transform: translateX(-50%) translateY(-64px);
}

.panel-background.leaving {
  transform: translateX(-50%) translateY(0);
}

.img-wrapper {
  position: relative;
  display: inline-block;
}

.tooltip {
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(255, 255, 255, 0.604);
  color: rgb(0, 0, 0);
  padding: 4px 8px;
  font-size: 14px;
  border-radius: 8px;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.2s;
  backdrop-filter: blur(9px);
  width: 60px;
  white-space: normal;
  word-wrap: break-word;
}

.tooltip:hover {
  opacity: 1;
}
</style>