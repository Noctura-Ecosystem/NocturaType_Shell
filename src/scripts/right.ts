import {ref} from "vue"
import { invoke } from '@tauri-apps/api/core';
import './../styles/Var.css'
import { getCurrentWindow } from "@tauri-apps/api/window";

const appWindow = getCurrentWindow();
let theme = await invoke("theme_read");
switch (theme) {
  case "light":
    light_mode();
    break;
  case "dark":
    dark_mode();
    break;
}


export function openDevTools() {
    invoke("open_devtools")
}
export function reloadWindow() {
  window.location.reload();
}
export const title = "Context";
export const menuX = ref(0)
export const menuY = ref(0)
export const menuVisible = ref(false);
function openMenu(e: MouseEvent) {
  menuX.value = e.clientX
  menuY.value = e.clientY
  menuVisible.value = true
  //console.log(menuVisible.value, menuX.value, menuY.value)
}

document.addEventListener("click", () => {
    menuVisible.value = false
})
document.addEventListener("contextmenu", (e) => {
    e.preventDefault();
    const target = e.target as HTMLElement | null;
    if (!target) return;
    const interactive = target.closest(
        "button, input, textarea, select, a, [contenteditable], .no-custom-menu" /*TODO: ADD DIV, FIX MARGIN OF APP CONTEXT */
    );
    if (interactive) return;
    openMenu(e);
});

export const fileInput = ref<HTMLInputElement | null>(null);

export function openFileDialog() {
  fileInput.value?.click();
}

export function handleFileChange(event: Event) {
  const target = event.target as HTMLInputElement;
  if (!target.files || target.files.length === 0) return;

  const file = target.files[0];
  if (!file.type.startsWith('image/')) return;

  const reader = new FileReader();
  reader.onload = () => {
    const imageUrl = reader.result as string;
    document.body.style.backgroundImage = `url(${imageUrl})`;
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundPosition = 'center';
  };
  reader.readAsDataURL(file);
  fileInput.value!.value = '';
}

function setTheme(vars: Record<string, string>) {
  const root = document.documentElement

  Object.entries(vars).forEach(([key, value]) => {
    root.style.setProperty(key, value)
  })
}

export function toggleTheme(){
  console.log(theme)
  switch (theme) {
    case "light":
      dark_mode();
      break;
    case "dark":
      light_mode();
      break;
  }

  console.log(theme)
}

appWindow.onCloseRequested(async (event) => {
  console.log("Closing soon...");
  event.preventDefault();
  invoke("theme_write", {theme: theme})
  await appWindow.close();
});

function dark_mode(){
  theme = "dark"
  setTheme({
    '--color-base': 'rgba(84, 82, 82, 0.3)',
    '--color-mild': 'rgba(84, 82, 82, 0.2)',
    '--color-focus': 'rgba(82, 82, 82, 0.5)',
    '--color-focus-mild': 'rgba(82, 82, 82, 0.38)',
    '--text-head': 'rgba(73, 73, 73, 0.5)',
    '--text-secondary-head': 'rgba(90, 90, 90, 0.7)',
    '--text-body': 'rgb(30, 30, 30)',
    '--text-contrast': 'rgb(255, 255, 255)'
  });
  invoke("theme_json_task", {dict: {"theme": "dark"}})
}
function light_mode() {
  theme = "light"
  setTheme({
    '--color-base': 'rgba(245, 245, 245, 0.3)',
    '--color-mild': 'rgba(235, 235, 235, 0.2)',
    '--color-focus': 'rgba(220, 220, 220, 0.6)',
    '--color-focus-mild': 'rgba(225, 225, 225, 0.38)',
    '--text-head': 'rgba(20, 20, 20, 0.5)',
    '--text-secondary-head': 'rgba(40, 40, 40, 0.7)',
    '--text-body': 'rgb(15, 15, 15)',
    '--text-contrast': 'rgba(20, 20, 20, 1)'
  });
  invoke("theme_json_task", {dict: {"theme": "light"}})
}