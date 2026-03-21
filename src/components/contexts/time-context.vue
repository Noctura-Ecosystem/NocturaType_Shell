<script setup lang="ts">
    import context from "../contexts/base-context.vue";
    import calander from "../others/calander.vue";
    import todo from "../others/Todo.vue";
    let day = 1;
    let week = "";
    let weeks = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let year = 0;
    const now = new Date();
    day = now.getDate();
    week = weeks[now.getDay()]
    year = now.getFullYear();
</script>

<template>
    <div class="time-root">
        <context class="time-style" :label="time_label">
            <label class="time-label">{{ week}} {{ day }} {{ year }}</label>
            <div class="time-content">
                <div class="time-calander">
                    <calander />
                </div>
                <div class="time-msgBox">
                     <div class="message-box">
                        <h2 class="title">Title</h2>
                        <p class="content">
                            insert msg here
                        </p>
                    </div>
                </div>
                <div class="time-info">
                    <div class="todo-title">To-Do</div>
                    <todo />
                </div>
            </div>
        </context>
    </div>
</template>

<script lang="ts">
    const time_label = "Time";
</script>

<style src="../contexts/contexts.css"></style>
