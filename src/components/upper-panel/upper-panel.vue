<script setup lang="ts">
    import { onMounted } from "vue";
    import appContext from "../contexts/apps-context.vue";
    import timeContext from "../contexts/time-context.vue";
    import powerContext from "../contexts/power-context.vue";
    import "./../../styles/Var.css"
    import "./../../styles/Panel.css"
    
    import { updateTime, app_appear, time_appear, power_appear, hour, minute, second,
             ampm, month, toggleContextAppear, top_panel_appear, topPanelMouse, 
             toggleContextAppearClick } from "./../../scripts/upper_panel.ts"

    onMounted(async() => {
      updateTime()
      setInterval(updateTime, 1000)
    })

</script>


<template>
    <div class="top-panel" :class="{appear: top_panel_appear}" @mouseenter="topPanelMouse(true)" @mouseleave="topPanelMouse(false)">
      <div class="panel-buttons-container">
          <div class="panel-buttons-wrapper-left">
              <button class="panel-button" @mouseenter="toggleContextAppear(true, 'app')" @mouseleave="toggleContextAppear(false, 'app')" @click="toggleContextAppearClick('app')">Apps</button> 
          </div>
          <div class="panel-buttons-wrapper-center">
              <button class="panel-button" @mouseenter="toggleContextAppear(true, 'time')" @mouseleave="toggleContextAppear(false, 'time')" @click="toggleContextAppearClick('time')">{{month}} {{ hour }} : {{ minute }} : {{ second }} {{ ampm }}</button>
          </div>
          <div class="panel-buttons-wrapper-right">
              <button class="panel-button" @mouseenter="toggleContextAppear(true, 'power')" @mouseleave="toggleContextAppear(false, 'power')" @click="toggleContextAppearClick('power')">Power</button>
          </div>
      </div>
    </div>
    <appContext class="app-context" :class="{appear: app_appear}"/>
    <timeContext class="time-context" :class="{appear: time_appear}" />
    <powerContext class="power-context" :class="{appear: power_appear}" />

</template>


