<script setup>
import { ref, computed } from "vue";

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



<style scoped>
.mini-calendar {
  width: 95%;
  padding: 8px 10px;
  border: 1px solid #0000002e;
  border-radius: 8px;
  font-family: sans-serif;
  font-size: 10px;
  background: rgba(84, 82, 82, 0.1);
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.header button {
  border: none;
  background: rgba(84, 82, 82, 0.2);
  padding: 4px 10px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 10px;
  line-height: 1;
}

.weekdays,
.days {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 5px;
  text-align: center;
}

.days {
    margin-top: 10px;
}

.weekdays span {
  font-size: 9px;
  font-weight: bold;
  color: #666;
  line-height: 1;
}

.days span {
  padding: 3px 0;
  border-radius: 4px;
  background: rgba(84, 82, 82, 0.2);
  font-size: 9px;
  line-height: 1.1;
}



.days span.empty {
  background: transparent;
}

.days span.today {
  background: rgba(84, 82, 82, 0.3);
  color: white;
  font-weight: bold;
}
</style>