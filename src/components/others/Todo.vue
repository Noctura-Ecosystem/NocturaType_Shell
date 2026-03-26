
<script setup>
import "../../styles/Var.css"
import "./../../styles/Mini.css";
import {newTask, tasks, addTask, changeTask} from "./../../scripts/todo.ts"
</script>


<template>
  <div class="todo-block">
     <div class="spacer"></div>

    <div class="todo-input">
      <input v-model="newTask" @keyup.enter="addTask" placeholder="Add task..." />
    </div>

    <div class="todo-list">
      <label v-for="(task, index) in tasks" :key="index" class="todo-item">
        <input type="checkbox" v-model="task.done" @change="changeTask(index)"/>
        <span class="todo-check"></span>
        <span :class="{ done: task.done }" class="todo-description">{{ task.text }}</span>
      </label>
    </div>
  </div>
</template>

