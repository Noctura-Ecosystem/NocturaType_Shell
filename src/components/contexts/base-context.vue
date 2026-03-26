<template>
    <div class="context-background" @mouseenter.self="$emit('mouseenter')" @mouseleave.self="$emit('mouseleave')">
      <label class="context-label">{{ label }}</label>
      <slot class="context-content"></slot>
    </div>
</template>

<script lang="ts">
import "./../../styles/Var.css"
import "./../../styles/Contexts.css"
export default {
  props: {
    label: {
      type: String,
      required: true
    }
  }
}</script>
