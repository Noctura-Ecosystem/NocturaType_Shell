<script setup>
import { ref, computed } from "vue";
import "../../styles/Var.css"
import "./../../styles/Mini.css";

const currentDate = ref(new Date());
const today = new Date();

const weekdays = ["S", "M", "T", "W", "T", "F", "S"];

const monthYear = computed(() =>
  currentDate.value.toLocaleString("default", {
    month: "short",
    year: "numeric",
  })
);

const daysInMonth = computed(() => {
  const y = currentDate.value.getFullYear();
  const m = currentDate.value.getMonth();
  return new Date(y, m + 1, 0).getDate();
});

const firstDayOfMonth = computed(() => {
  const y = currentDate.value.getFullYear();
  const m = currentDate.value.getMonth();
  return new Date(y, m, 1).getDay();
});

const calendarDays = computed(() => {
  const days = [];
  for (let i = 0; i < firstDayOfMonth.value; i++) days.push(null);
  for (let d = 1; d <= daysInMonth.value; d++) days.push(d);
  return days;
});

const todayDate = today.getDate();

const isCurrentMonth = computed(() =>
  currentDate.value.getMonth() === today.getMonth() &&
  currentDate.value.getFullYear() === today.getFullYear()
);

function prevMonth() {
  currentDate.value = new Date(
    currentDate.value.getFullYear(),
    currentDate.value.getMonth() - 1,
    1
  );
}

function nextMonth() {
  currentDate.value = new Date(
    currentDate.value.getFullYear(),
    currentDate.value.getMonth() + 1,
    1
  );
}
</script>

<template>
  <div class="mini-calendar">
    <div class="header">
      <button @click="prevMonth">‹</button>
      <span>{{ monthYear }}</span>
      <button @click="nextMonth">›</button>
    </div>

    <div class="weekdays">
      <span v-for="day in weekdays" :key="day">{{ day }}</span>
    </div>

    <div class="days">
      <span
        v-for="(day, index) in calendarDays"
        :key="index"
        :class="{ empty: !day, today: day === todayDate && isCurrentMonth }"
      >
        {{ day || "" }}
      </span>
    </div>
  </div>
</template>


