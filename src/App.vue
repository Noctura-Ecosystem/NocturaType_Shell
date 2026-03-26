<script setup lang="ts">
  import bottomPanel from "./components/bottom-panel/bottom-panel.vue"
  import upperPanel from "./components/upper-panel/upper-panel.vue"
  import rightclick from "./components/contexts/rightclick-context.vue"
  import "./styles/Var.css"
  import './styles/App.css'

  document.addEventListener('keydown', (e: KeyboardEvent) => {
    const target = e.target as HTMLElement | null
    const isInput =
      target instanceof HTMLInputElement ||
      target instanceof HTMLTextAreaElement ||
      (target && target.isContentEditable);
    if (isInput) return;
    if (e.ctrlKey || e.metaKey) {
      e.preventDefault();
    }
  });

  document.addEventListener("contextmenu", (e) => {
    e.preventDefault();
    window.openMenu?.(e);
  })

  //document.addEventListener("contextmenu", (e: any) => {
    //e.preventDefault();
  //})

</script>

<template>
  <bottomPanel />
  <upperPanel />
  <rightclick />
  <div class="line"></div>
</template>
