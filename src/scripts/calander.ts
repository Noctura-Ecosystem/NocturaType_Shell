
import { ref, computed } from "vue";

export const currentDate = ref(new Date());
export const today = new Date();

export const weekdays = ["S", "M", "T", "W", "T", "F", "S"];

export const monthYear = computed(() =>
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

export const calendarDays = computed(() => {
  const days = [];
  for (let i = 0; i < firstDayOfMonth.value; i++) days.push(null);
  for (let d = 1; d <= daysInMonth.value; d++) days.push(d);
  return days;
});

export const todayDate = today.getDate();

export const isCurrentMonth = computed(() =>
  currentDate.value.getMonth() === today.getMonth() &&
  currentDate.value.getFullYear() === today.getFullYear()
);

export function prevMonth() {
  currentDate.value = new Date(
    currentDate.value.getFullYear(),
    currentDate.value.getMonth() - 1,
    1
  );
}

export function nextMonth() {
  currentDate.value = new Date(
    currentDate.value.getFullYear(),
    currentDate.value.getMonth() + 1,
    1
  );
}