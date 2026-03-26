<script setup>
import "../../styles/Var.css"
import "./../../styles/Mini.css";
import {prevMonth, monthYear, nextMonth, weekdays, calendarDays, todayDate, isCurrentMonth} from "./../../scripts/calander.ts";

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


