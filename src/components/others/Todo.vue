
<script setup>
import { ref } from "vue";
import {invoke} from "@tauri-apps/api/core"
import "../../styles/Var.css"
import "./../../styles/Mini.css";

const newTask = ref("");
const tasks = ref([]);

function addTask() {
  if (!newTask.value.trim()) return;
  tasks.value.push({
    text: newTask.value,
    done: false,
  });
  newTask.value = "";
  changeTask(tasks.value.length)
}
function changeTask(index) {
  console.log("TASK VAL:-", tasks.value[index])
  console.log("With index:-", index)
  invoke("json_task", { array: tasks.value.map(t => ({ text: t.text, done: t.done })) });
}
async function loadTasks() {
  try {
    const savedTasks = await invoke("read_tasks");
    tasks.value = savedTasks;
  } catch (e) {
    console.error("Failed to load tasks:", e);
  }
}
loadTasks();
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

