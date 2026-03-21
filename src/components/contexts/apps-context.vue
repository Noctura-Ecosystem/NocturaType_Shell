<script setup lang="ts">
    import context from "../contexts/base-context.vue";
</script>

<template>
    <context :label="title">
       <div class="context-content">
          <div class="items-wrapper">
              <div class="item">
                <img class="item-img" src="../../../assets/My_cool_flamingo_wallpaper.png"></img>
                <span class="item-span">My really cool flamingo app</span>
              </div>
              <div class="item">
                <img class="item-img" src="../../../assets/help-about.svg"></img>
                <span class="item-span">Another My really cool flamingo app</span>
              </div>
              <div class="item">
                <img class="item-img" src="../../../assets/My_cool_flamingo_wallpaper.png"></img>
                <span class="item-span">Last one: Another My really cool flamingo app</span>
              </div>
              <div class="item">
                <img class="item-img" src="../../../assets/help-about.svg"></img>
                <span class="item-span">One more: Another My really cool flamingo app</span>
              </div>
              <div class="item">
                <img class="item-img" src="../../../assets/My_cool_flamingo_wallpaper.png"></img>
                <span class="item-span">One more please: Another My really cool flamingo app</span>
              </div>
              <div class="item">
                <img class="item-img" src="../../../assets/My_cool_flamingo_wallpaper.png"></img>
                <span class="item-span">Okay this time I swear: Another My really cool flamingo app</span>
              </div>
          </div>
        </div>
    </context>
</template>

<<style src="../contexts/contexts.css"></style>>

<script lang="ts">
  const title = "Apps";
</script>