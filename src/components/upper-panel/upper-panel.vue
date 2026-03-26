<script setup lang="ts">
    import {ref, onMounted} from "vue";
    import appContext from "../contexts/apps-context.vue";
    import timeContext from "../contexts/time-context.vue";
    import powerContext from "../contexts/power-context.vue";
    import "./../../styles/Var.css"
    import "./../../styles/Panel.css"

    const hour = ref("00");
    const minute = ref("00");
    const second = ref("00");
    const ampm = ref("am");
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    const month = ref("Jan");
    function updateTime() {
      const now = new Date();
      hour.value = now.getHours().toString().padStart(2, '0');
      ampm.value = now.getHours() < 12 ? "am" : "pm";
      minute.value = now.getMinutes().toString().padStart(2, '0');
      second.value = now.getSeconds().toString().padStart(2, '0');
      month.value = months[now.getMonth()];
    }

    let app_appear = false;
    let time_appear = false;
    let power_appear = false;
    let app_hide_freeze = false;
    let time_hide_freeze = false;
    let power_hide_freeze = false;

    function toggleContextAppear(toggle: boolean, context: String) {
      switch (context) {
        case "app":
          if (!app_hide_freeze) {
            app_appear = toggle;
          }
          break;
        case "time":
          if (!time_hide_freeze) {
            time_appear = toggle;
          }
          break;
        case "power":
          if (!power_hide_freeze) {
            power_appear = toggle;
          }
      }
      console.log(`TOGGLED CONTEXT:- ${toggle} ${context}`);
    }

    function toggleContextAppearClick(context: String) {
      switch (context) {
        case "app":
          app_hide_freeze = !app_hide_freeze
          if (app_hide_freeze) {
            toggleContextAppear(true, context)
            app_hide_freeze = true
          } else {
            app_hide_freeze = false
            toggleContextAppear(false, context)
          }
          break;
        case "time":
          time_hide_freeze = !time_hide_freeze
          if (time_hide_freeze) {
            toggleContextAppear(true, context)
            time_hide_freeze = true
          } else {
            time_hide_freeze = false
            toggleContextAppear(false, context)
          }
          break;
        case "power":
          power_hide_freeze = !power_hide_freeze
          if (power_hide_freeze) {
            toggleContextAppear(true, context)
            power_hide_freeze = true
          } else {
            power_hide_freeze = false
            toggleContextAppear(false, context)
          }
      }
        
      console.log(`FREEZE CONTEXT:- ${context}`)
    }
    let top_panel_appear = false;

    function topPanelMouse(mouse: boolean) {
       if (!app_appear && !power_appear && !time_appear){
        top_panel_appear = mouse;
       }
        console.log("TOP-PANEL:", top_panel_appear)
    }

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


