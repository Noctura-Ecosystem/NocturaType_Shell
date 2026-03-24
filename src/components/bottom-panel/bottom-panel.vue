<script setup lang="ts">
  import  {ref, onMounted} from "vue"
  import { invoke } from "@tauri-apps/api/core";
  import { listen } from '@tauri-apps/api/event'
  const hovered = ref(false);
  const leaving = ref(false);
  let icons = ref<AppIcon[]>([]);

  type AppIcon = {
    name: string
    path: string
  }

  type App ={
    name: string
    exec: string
    icon_url: string
    description: string
  }


  function handleBackendMessage(payloads: AppIcon[]) {
    icons = ref<AppIcon[]>([]);
    for (const payload of payloads){
      console.log("PAYLOAD", payload)
      const path = `/assets/${payload.path.replace(/^\/+/, "")}`;
      const name = payload.name.replace(/^\/+/, "");
      console.log(`PATH: ${path},  NAME: ${name}`);
      icons.value.push({
        name: name,
        path: path
      });
    }
  };

  function onEnter() {
    console.log("BOTTOM-PANEL: Hovering");
    hovered.value = true;
    leaving.value = false;
  }

  function onLeave() {
    console.log("BOTTOM-PANEL: Leaving");
    leaving.value = true;
    hovered.value = false;
  }

  onMounted(async () => {
    try {
      const unlisten = await listen<AppIcon[]>("panel_apps_updated", (event) => {
        console.log("GOT UPDATE:- ", event.payload)
        handleBackendMessage(event.payload);
      });

      await invoke("app_pin_listener");

      return unlisten;
    } 
    catch (error) {
      console.log("Error initializing dock:", error);
    }
  });

  function open_app(icon: string, path: string, index: number) {
    console.log(icon, path, index)
  }


</script>

<template>
  <div class="panel-background" :class="{ hovered: hovered, leaving: leaving}" @mouseenter="onEnter" @mouseleave="onLeave">
    <button v-for="(icon, index) in icons" :key="index" class="img-wrapper" @click="open_app(icon.name, icon.path, index)">
      <img :src="icon.path" class="app-icon"/>
      <span class="tooltip">{{ icon.name }}</span>
    </button>
  </div>
</template>

<style>
.panel-background {
  padding: 0 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 25px;
  width: fit-content; 
  min-width: 5%;
  height: 70px;
  position: absolute;
  backdrop-filter: blur(10px);
  background: rgba(0, 0, 0, 0.2);
  border-radius: 30px;
  left: 50%;
  transform: translate(-50%, -50px);
  bottom: -50px;
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
  all: unset;
  position: relative;
  display: inline-block;
  background-color: transparent;
}

.app-icon {
  background-color: transparent;
  all: unset;
  height: 48px;
  width: 48px;
  border-radius: 9px;
  scale: 1.1;
}

.tooltip {
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(255, 255, 255, 0.297);
  backdrop-filter: blur(20px);
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

.img-wrapper:hover .tooltip {
  opacity: 1;
}
</style>