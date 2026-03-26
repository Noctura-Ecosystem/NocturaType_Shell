<script setup lang="ts">
import { onMounted } from "vue";
  import context from "../contexts/base-context.vue";
  import "./../../styles/Var.css"
  import "./../../styles/Contexts.css"
  import { apps, fetchApps, loading, error } from "./../../scripts/apps_context.ts"
  const title = "Apps";
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
