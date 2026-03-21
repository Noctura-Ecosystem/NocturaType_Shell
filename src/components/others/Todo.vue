
<script setup>
import { ref } from "vue";

const newTask = ref("");
const tasks = ref([]);

function addTask() {
  if (!newTask.value.trim()) return;
  tasks.value.push({
    text: newTask.value,
    done: false,
  });
  newTask.value = "";
}
</script>


<template>
  <div class="todo-block">
     <div class="spacer"></div>

    <div class="todo-input">
      <input v-model="newTask" @keyup.enter="addTask" placeholder="Add task..." />
    </div>

    <div class="todo-list">
      <label v-for="(task, index) in tasks" :key="index" class="todo-item">
        <input type="checkbox" v-model="task.done" />
        <span class="todo-check"></span>
        <span :class="{ done: task.done }" class="todo-description">{{ task.text }}</span>
      </label>
    </div>
  </div>
</template>


<style scoped>
.spacer {
    height: 25px
}
.todo-block {
  display: block;
  margin-top: -46px;
  height: 100%;
  width: 90%;
  padding: 6px;
  border: 1px solid #0000002e;
  border-radius: 8px;
  font-family: sans-serif;
  font-size: 10px;
  background: rgba(84, 82, 82, 0.1);
}

.todo-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 4px;
  font-weight: bold;
}

.todo-header button {
  border: none;
  background: rgba(84, 82, 82, 0.2);
  border-radius: 4px;
  padding: 1px 6px;
  cursor: pointer;
  font-size: 11px;
}

.todo-input input {
  width: 100%;
  box-sizing: border-box;
  padding: 4px;
  font-size: 10px;
  border: 1px solid rgba(84, 82, 82, 0.4);
  background-color: rgba(84, 82, 82, 0.1);
  border-radius: 5px;
  margin-bottom: 4px;
}

.todo-list {
  display: flex;
  flex-direction: column;
  gap: 3px;
  height: 73%;
  overflow-y: auto;
  overflow-x: hidden;
}

.todo-item {
  display: flex;
  align-items: center;
  gap: 4px;
  background: rgba(84, 82, 82, 0.1);
  padding: 3px 4px;
  border-radius: 5px;
}

.todo-item input {
  margin: 0;
}

.todo-item input[type="checkbox"]{
    display: none;
}
.todo-check {
  width: 16px;
  height: 16px;
  border-radius: 4px;
  background-color: rgba(84, 82, 82, 0.1);
  border: 1px solid #aaa;
  display: inline-block;
  position: relative;
}
.todo-item input[type="checkbox"]:checked + span::after {
  content: "";
  position: absolute;
  left: 4px;
  top: 0px;
  width: 5px;
  height: 10px;
  border: solid rgba(84, 82, 82, 0.4);
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
}


.todo-description {
  max-width: 100%;
  overflow-x: auto;
  height: 15px;
}

.done {
  text-decoration: line-through;
  color: #888;
}
</style>