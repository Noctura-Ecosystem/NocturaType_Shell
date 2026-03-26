<script setup lang="ts">
import "./scripts/App.ts"
import bottomPanel from "./components/bottom-panel/bottom-panel.vue"
import upperPanel from "./components/upper-panel/upper-panel.vue"
import rightclick from "./components/contexts/rightclick-context.vue"
import "./styles/Var.css"
import './styles/App.css'
</script>

<template>
  <bottomPanel />
  <upperPanel />
  <rightclick />
  <div class="line"></div>
</template>
