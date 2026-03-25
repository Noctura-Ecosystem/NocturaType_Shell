<template>
    <div class="context-background" @mouseenter.self="$emit('mouseenter')" @mouseleave.self="$emit('mouseleave')">
      <label class="context-label">{{ label }}</label>
      <slot class="context-content"></slot>
    </div>
</template>

<script lang="ts">
export default {
  props: {
    label: {
      type: String,
      required: true
    }
  }
}</script>

<style scoped>
  .context-background {
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    backdrop-filter: blur(15px);
    background-color: rgba(84, 82, 82, 0.1);
    border-radius: 18px;
    padding: 1rem;
    min-width: 220px;
    min-height: 150px;
    width: max-content;
    height: auto;
    transition: background-color 0.3s ease;
  }

  .context-label {
    margin-top: 10px;
    display: inline-block;
    font-size: 2rem;
    font-weight: 700;
    color: rgba(135, 131, 131, 0.275);
    line-height: 1;
    padding: 0;
    margin-left: 11px;
  }

  .context-background:hover {
    background-color: rgba(84, 82, 82, 0.25);
  }
</style>