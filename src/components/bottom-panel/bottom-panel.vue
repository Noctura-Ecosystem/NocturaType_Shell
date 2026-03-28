<script setup lang="ts">
  import { invoke } from "@tauri-apps/api/core";
  import { listen } from '@tauri-apps/api/event'
  import { onMounted } from "vue";
  import "./../../styles/Panel.css";
  import "./../../styles/Var.css"
  import {hovered, leaving,onEnter, onLeave, icons, open_app, AppIcon, handleBackendMessage} from "./../../scripts/bottom_panel.ts"
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
</script>

<template>
  <div class="panel-background" :class="{ hovered: hovered, leaving: leaving}" @mouseenter="onEnter" @mouseleave="onLeave">
    <button v-for="(icon, index) in icons" :key="index" class="img-wrapper" @click="open_app(icon.name, icon.path, index)">
      <img :src="icon.path" class="app-icon"/>
      <span class="tooltip">{{ icon.name }}</span>
    </button>
  </div>
</template>
