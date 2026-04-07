<script setup lang="ts">
import "./../../styles/Var.css"
import "./../../styles/Contexts.css"
import {openDevTools, reloadWindow, title, menuVisible, menuX, menuY, openFileDialog, handleFileChange, fileInput, toggleTheme} from "./../../scripts/right.ts"

</script>

<template>
    <div v-show="menuVisible" :label="title" class="right-base" :style="{ left: menuX + 'px', top: menuY + 'px' }">
        <div class="right-items">
            <div class="right-item">
                <span @click="openFileDialog()">Change background</span>
                  <input
                    type="file"
                    ref="fileInput"
                    accept="image/*"
                    @change="handleFileChange"
                    style="position: absolute; width: 0; height: 0; overflow: hidden; border: 0; padding: 0; margin: 0; clip: rect(0 0 0 0);"
                />
            </div>
            <div class="right-item">
                <span>Open Setting</span>
            </div>
            <div class="right-item">
                <span @click="toggleTheme()">Toggle theme</span>
            </div>
            <div class="right-item">
                <span @click="reloadWindow()">[DEV] Reload</span>
            </div>
            <div class="right-item">
                <span @click="openDevTools()">[DEV] Inspect</span>
            </div>
        </div>
      </div>
</template>

<style>
  .right-base {
    position: absolute;
    background-color: var(--color-base);
    height: fit-content;
    width: fit-content;
    padding-top: 10px;
    border-radius: 18px;
    backdrop-filter: blur(5px);
  }
</style>