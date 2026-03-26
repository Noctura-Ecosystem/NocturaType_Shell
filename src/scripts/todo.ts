
import { ref } from "vue";
import {invoke} from "@tauri-apps/api/core"

export const newTask = ref("");
export const tasks = ref<Task[]>([]);

type Task = {
  text: string;
  done: boolean;
};

export function addTask() {
  if (!newTask.value.trim()) return;
  tasks.value.push({
    text: newTask.value,
    done: false,
  });
  newTask.value = "";
  changeTask(tasks.value.length)
}
export function changeTask(index: number) {
  console.log("TASK VAL:-", tasks.value[index])
  console.log("With index:-", index)
  invoke("json_task", { array: tasks.value.map(t => ({ text: t.text, done: t.done })) });
}
async function loadTasks() {
  try {
    const savedTasks = await invoke<Task[]>("read_tasks");;
    tasks.value = savedTasks;
  } catch (e) {
    console.error("Failed to load tasks:", e);
  }
}
loadTasks();