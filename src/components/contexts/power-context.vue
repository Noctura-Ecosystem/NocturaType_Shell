<script setup lang="ts">
import context from "../contexts/base-context.vue";
const title = "Power"
</script>

<template>
    <context class="power-context" :label="title">

        <div class="power-toggle-buttons">
            <div class="power-toggle">
                <label>Wi-Fi</label>
                <button>
                    <!--icon-->
                </button>
            </div>
            <div class="power-toggle">
                <label>Wi-Fi</label>
                <button>
                    <!--icon-->
                </button>
            </div>
            <div class="power-toggle">
                <label>Bluetooth</label>
                <button>
                    <!--icon-->
                </button>
            </div>
            <div class="power-toggle">
                <label>Volume</label>
                <button>
                    <!--icon-->
                </button>
            </div>
            <div class="power-toggle">
                <label>Screen</label>
                <button>
                    <!--icon-->
                </button>
            </div>
            <div class="power-toggle">
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


<style lang="css" src="../contexts/contexts.css"></style>