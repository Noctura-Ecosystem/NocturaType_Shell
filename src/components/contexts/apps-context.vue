<script setup lang="ts">
  import { ref, onMounted } from "vue";
  import context from "../contexts/base-context.vue";
  import { invoke, convertFileSrc } from "@tauri-apps/api/core";
  import "./../../styles/Var.css"
  import "./../../styles/Contexts.css"

  type App = {
    name: string;
    exec: string;
    icon_path: string;
    description: string;
  };

  const apps = ref<App[]>([]);
  const loading = ref<boolean>(true);
  const error = ref<string | null>(null);

  async function fetchApps(): Promise<App[]> {
    try {
      const fetchedApps = await invoke<App[]>('list_apps');
      const processedApps = fetchedApps.map(app => ({
        ...app,
        icon_path: app.icon_path ? convertFileSrc(app.icon_path) : ''
      }));
      return processedApps;
    } catch (err) {
      console.error('Failed to fetch apps', err);
      error.value = `Failed to load applications: ${err}`;
      return [];
    }
  }

  onMounted(async () => {
    try {
      apps.value = await fetchApps();
    } catch (err) {
      console.error('Mount error:', err);
      error.value = 'Failed to initialize app list';
    } finally {
      loading.value = false;
    }
  });
</script>

<template>
  <context :label="title">
    <div class="items-wrapper">
      <div v-for="(app, index) in apps" :key="index" :data-exec="app.exec" class="item">
        <img v-if="app.icon_path" :src="app.icon_path" :alt="app.name" class="item-img" />
        <div v-else class="placeholder-icon">
          <span>{{ app.name.charAt(0).toUpperCase() }}</span>
        </div>
        <span class="item-span">{{ app.name }}</span>
      </div>
    </div>
  </context>
</template>


<script lang="ts">
  const title = "Apps";
</script>