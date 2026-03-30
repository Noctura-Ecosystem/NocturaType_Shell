import { ref } from "vue";
import { invoke } from "@tauri-apps/api/core";
export const title = "Power"
export let WiFi = ref(false);
export let Theme = ref(false);
export let bluetooth = ref(false);
export let volume = ref(false);
export let screen = ref(false);
export let airplane = ref(false);
export type PanelJSON = {
    "wifi": boolean,
    "theme": boolean,
    "bluetooth": boolean,
    "volume": boolean,
    "screen": boolean,
    "airplane": boolean,
}

export async function toggle(catagory: String) {
    switch (catagory) {
        case "WiFi": WiFi.value = !WiFi.value; break;
        case "theme": Theme.value = !Theme.value; break;
        case "bluetooth": bluetooth.value = !bluetooth.value; break;
        case "volume": volume.value = !volume.value; break;
        case "screen": screen.value = !screen.value; break;
        case "air": airplane.value = !airplane.value; break;
        default: console.log("UNKNWON", catagory);
    }
    await invoke("setting_json_task", { dict: {wifi: WiFi.value, theme: Theme.value, bluetooth: bluetooth.value, volume: volume.value, screen: screen.value, airplane: airplane.value} })
    console.log(` DEBUG:- ${WiFi.value}, ${Theme.value}, ${bluetooth.value}, ${volume.value}, ${screen.value}, ${airplane.value}`)
}