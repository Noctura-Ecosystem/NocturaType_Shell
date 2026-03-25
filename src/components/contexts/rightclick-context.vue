<script setup lang="ts">
import baseContext from './base-context.vue';
import { invoke } from '@tauri-apps/api/core';
import {ref} from "vue"
declare global {
  interface Window {
    openMenu?: (e: MouseEvent) => void
  }
}
function openDevTools() {
    invoke("open_devtools")
}
function reloadWindow() {
  window.location.reload();
}
const title = "Context";
const menuX = ref(0)
const menuY = ref(0)
const menuVisible = ref(false);
window.openMenu = (e: MouseEvent) => {
  menuX.value = e.clientX
  menuY.value = e.clientY
  menuVisible.value = true
}

document.addEventListener("click", () => {
    menuVisible.value = false
})

const fileInput = ref<HTMLInputElement | null>(null);

function openFileDialog() {
  fileInput.value?.click();
}

function handleFileChange(event: Event) {
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

</script>

<template>
    <baseContext v-show="menuVisible" :label="title" class="base" :style="{ left: menuX + 'px', top: menuY + 'px' }">
        <div class="items">
            <div class="item">
                <span @click="openFileDialog()">Change background</span>
                  <input
                    type="file"
                    ref="fileInput"
                    accept="image/*"
                    @change="handleFileChange"
                    style="position: absolute; width: 0; height: 0; overflow: hidden; border: 0; padding: 0; margin: 0; clip: rect(0 0 0 0);"
                />
            </div>
            <div class="item">
                <span>Open Setting</span>
            </div>
            <div class="item">
                <span @click="reloadWindow()">[DEV] Reload</span>
            </div>
            <div class="item">
                <span @click="openDevTools()">[DEV] Inspect</span>
            </div>
        </div>
    </baseContext>
</template>

<style>
    .base {
        position: fixed;
        top: 20px;
        left: 20px;
        z-index: 1000;
        width: fit-content;
        scale: 0.9;
    }
    .items {
        display: flex;
        flex-direction: column;
        padding: 10px;
        gap: 10px;
    }
    .item{
        display: flex;
        padding: 10px;
        background-color: rgba(84, 82, 82, 0.1);
        transition: background-color 0.6s ease;
    }
    .item span{
        color: #666;
    }
    .item:hover {
        background-color: rgba(84, 82, 82, 0.3);
    }
</style>