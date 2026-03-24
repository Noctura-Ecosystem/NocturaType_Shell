<script setup lang="ts">
    import {ref, onMounted } from "vue";
    import context from "../contexts/base-context.vue";
    import {invoke} from "@tauri-apps/api/core";

    type App ={
      name: string
      exec: string
      icon_url: string
      description: string
    }


    const apps = ref<App[]>([]);

    async function fetchApps(): Promise<App[]> {
      try {
        const apps = await invoke<App[]>('list_apps');
        return apps;
      } catch (err) {
        console.error('Failed to fetch apps', err);
        return [];
      }
    }

    onMounted(async() => {
      apps.value = await fetchApps();
      for (const app of apps.value) {
        console.log(app.icon_url);
      }
    })
</script>

<template>
    <context :label="title">
        <div class="items-wrapper">
            <div class="item">
              <img class="item-img" src="../../../assets/My_cool_flamingo_wallpaper.png"></img>
              <span class="item-span">My really cool flamingo app</span>
            </div>
            <div v-for="(app, index) in apps" :key="index" :data-exec="app.exec" class="item">
              <img v-if="app.icon_url" :src="`./${app.icon_url}`" class="item-img" />
              <span class="item-span">{{ app.name }}</span>
            </div>
        </div>
    </context>
</template>

<<style src="../contexts/contexts.css"></style>>

<script lang="ts">
  const title = "Apps";
</script>