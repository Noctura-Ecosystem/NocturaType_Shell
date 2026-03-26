
import { ref } from "vue";
import { invoke, convertFileSrc } from "@tauri-apps/api/core";
type App = {
  name: string;
  exec: string;
  icon_path: string;
  description: string;
};

export const apps = ref<App[]>([]);
export const loading = ref<boolean>(true);
export const error = ref<string | null>(null);

export async function fetchApps(): Promise<App[]> {
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

