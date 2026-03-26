<script setup lang="ts">
    import context from "../contexts/base-context.vue";
    import calander from "../others/calander.vue";
    import todo from "../others/Todo.vue";
    import "./../../styles/Var.css"
    import "./../../styles/Contexts.css"
    import {day, week, year} from "./../../scripts/time_context.ts"
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

