import { ref } from "vue"

export const hour = ref("00");
export const minute = ref("00");
export const second = ref("00");
export const ampm = ref("am");
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
export const month = ref("Jan");
export function updateTime() {
    const now = new Date();
    hour.value = now.getHours().toString().padStart(2, '0');
    ampm.value = now.getHours() < 12 ? "am" : "pm";
    minute.value = now.getMinutes().toString().padStart(2, '0');
    second.value = now.getSeconds().toString().padStart(2, '0');
    month.value = months[now.getMonth()];
}

export let app_appear = false;
export let time_appear = false;
export let power_appear = false;
let app_hide_freeze = false;
let time_hide_freeze = false;
let power_hide_freeze = false;

export function toggleContextAppear(toggle: boolean, context: String) {
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

export function toggleContextAppearClick(context: String) {
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
export let top_panel_appear = false;

export function topPanelMouse(mouse: boolean) {
    if (!app_appear && !power_appear && !time_appear){
    top_panel_appear = mouse;
    }
    console.log("TOP-PANEL:", top_panel_appear)
}