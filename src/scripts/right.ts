import {ref} from "vue"
import { invoke } from '@tauri-apps/api/core';

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
  console.log(menuVisible.value, menuX.value, menuY.value)
}

document.addEventListener("click", () => {
    menuVisible.value = false
})
document.addEventListener("contextmenu", (e) => {
    console.log("OPENING RIGHT-CONTEXT MENU")
    e.preventDefault();
    openMenu(e);
})

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