<script setup lang="ts">
    import {ref, onMounted} from "vue";
    import appContext from "../contexts/apps-context.vue";
    import timeContext from "../contexts/time-context.vue";

    const hour = ref(0);
    const minute = ref(0);
    const second = ref(0);
    const ampm = ref("am");
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    const month = ref("Jan");
    function updateTime() {
      const now = new Date();
      hour.value = now.getHours();
      ampm.value = hour.value <= 12 ? "am" : "pm"
      minute.value = now.getMinutes();
      second.value = now.getSeconds();
      month.value = months[now.getMonth()]
    }


    
    let app_appear = false;
    let app_hide_freeze = false;
    function toggleContextAppear(toggle: boolean, context: String) {
      switch (context) {
        case "app":
          if (!app_hide_freeze) {
            app_appear = toggle;
          }
      }
      console.log(`TOGGLED CONTEXT:- ${toggle} ${context}`)
      console.trace();
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
      }
      console.log(`FREEZE CONTEXT:- ${context}`)
    }
    let top_panel_appear = false;

    function topPanelMouse(mouse: boolean) {
       if (!app_appear){
        top_panel_appear = mouse;
       }
        console.log("TOP-PANEL:", top_panel_appear)
    }

    onMounted(() => {
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
              <button class="panel-button">{{month}} {{ hour }} : {{ minute }} : {{ second }} {{ ampm }}</button>
          </div>
          <div class="panel-buttons-wrapper-right">
              <button class="panel-button">Wifi-Battery-Bluetooth</button>
          </div>
      </div>
    </div>
    <appContext class="app-context" :class="{appear: app_appear}"/>
    <timeContext class="time-context"/>

</template>



<style scoped>

  .top-panel {
    overflow: hidden;
    display: flex;
    position: fixed;
    top: 10px;
    background-color: rgba(84, 82, 82, 0.07);
    backdrop-filter: blur(10px);
    border-radius: 30px;
    height: 5%;
    width: 95vw;
    transition: background-color 0.5s ease;
    will-change: transform, background-color;
    padding: 0px 30px;
  }

  .top-panel > * {
    transition: opacity 0.5s ease;
    align-items: center;
  }

  .top-panel.appear .panel-buttons-wrapper-left,
  .top-panel.appear .panel-buttons-wrapper-right {
    opacity: 1;
  }

  .top-panel.appear {
    background-color: rgba(84, 82, 82, 0.32);
  }

  .panel-buttons-container {
    display: flex;
    justify-content: space-between;
    width: 100%;
    gap: 15px;
  }

  .panel-buttons-wrapper-left,
  .panel-buttons-wrapper-right {
      opacity: 0;
      display: flex;
      gap: 15px;
  }

  .panel-buttons-wrapper-center {
    display: flex;
    justify-content: center;
    border-radius: 18px;
    gap: 15px;
    opacity: 1;
    background-color: rgba(130, 128, 128, 0.2);
  }

  .panel-button {
    flex-direction: row; 
    padding: 10px 20px;
    border: none;
    border-radius: 18px;
    backdrop-filter: blur(15px);
    color: white;
    font-weight: 500;
    transition: all 0.3s ease;
    background: rgba(255, 255, 255, 0.1);
  }

  .panel-button:hover {
    background: rgba(255, 255, 255, 0.23);
  }
  .app-context {
    margin-top: 50px;
    margin-left: 40px;
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  .app-context.appear {
    opacity: 1;
  }

  .time-context {
    position: absolute;
    top: 50px;
    right: 500px;
    margin-left: 50%;
    opacity: 1;
    transition: opacity 0.3s ease;
  }
</style>