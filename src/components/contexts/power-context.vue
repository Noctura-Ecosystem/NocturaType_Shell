<script setup lang="ts">
import context from "../contexts/base-context.vue";
import "./../../styles/Var.css"
import "./../../styles/Contexts.css"
import { listen } from '@tauri-apps/api/event'
import { onMounted, ref } from "vue";
import {invoke} from "@tauri-apps/api/core"
const title = "Power"
let WiFi = ref(false);
let Theme = ref(false);
let bluetooth = ref(false);
let volume = ref(false);
let screen = ref(false);
let airplane = ref(false);
type PanelJSON = {
    "wifi": boolean,
    "theme": boolean,
    "bluetooth": boolean,
    "volume": boolean,
    "screen": boolean,
    "airplane": boolean,
}
onMounted(async () => {
    try {
        const unlisten = await listen<PanelJSON>("settings_updated", (event) => {
            console.log("GOT UPDATE:- ", event.payload)
            WiFi.value = event.payload.wifi;
            Theme.value = event.payload.theme;
            bluetooth.value = event.payload.bluetooth;
            volume.value = event.payload.volume;
            screen.value = event.payload.screen;
            airplane.value = event.payload.airplane;
        });

        await invoke("setting_listener");

        return unlisten;
    } 
    catch (error) {
        console.log("Error initializing dock:", error);
    }
});

function toggle(catagory: String) {
    switch (catagory) {
        case "WiFi": WiFi.value = !WiFi.value; break;
        case "theme": Theme.value = !Theme.value; break;
        case "bluetooth": bluetooth.value = !bluetooth.value; break;
        case "volume": volume.value = !volume.value; break;
        case "screen": screen.value = !screen.value; break;
        case "air": airplane.value = !airplane.value; break;
        default: console.log("UNKNWON", catagory);
    }
    console.log(` DEBUG:- ${WiFi.value}, ${Theme.value}, ${bluetooth.value}, ${volume.value}, ${screen.value}, ${airplane.value}`)
}

</script>

<template>
    <context class="power-context" :label="title">

        <div class="power-toggle-buttons">
            <div class="power-toggle" :class="{state: WiFi}" @click="toggle('WiFi')">
                <label>Wi-Fi</label>
                <button>
                    <!--icon-->
                </button>
            </div>
            <div class="power-toggle" :class="{state: Theme}" @click="toggle('theme')">
                <label>Dark/light<br> Mode</label>
                <button>
                    <!--icon-->
                </button>
            </div>
            <div class="power-toggle" :class="{state: bluetooth}" @click="toggle('bluetooth')">
                <label>Bluetooth</label>
                <button>
                    <!--icon-->
                </button>
            </div>
            <div class="power-toggle" :class="{state: volume}" @click="toggle('volume')">
                <label>Volume</label>
                <button>
                    <!--icon-->
                </button>
            </div>
            <div class="power-toggle" :class="{state: screen}" @click="toggle('screen')">
                <label>Screen</label>
                <button>
                    <!--icon-->
                </button>
            </div>
            <div class="power-toggle" :class="{state: airplane}" @click="toggle('air')">
                <label>Airplane<br>mode</label>
                <button>
                    <!--icon-->
                </button>
            </div>

        </div>
        <div class="power-top-buttons">
            <button class="power-top-button"></button>
            <button class="power-top-button"></button>
            <button class="power-top-button"></button>
            <button class="power-top-button"></button>
        </div>
    </context>
</template>

