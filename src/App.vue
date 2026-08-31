<script setup>
import { ref, computed, watch } from "vue";
import ib3Schedule from "@/data/ib3.json";
import ib41Schedule from "@/data/ib4-1.json";
import ib42Schedule from "@/data/ib4-2.json";
import pimSchedule from "@/data/pim.json";
import ScheduleDay from "@/components/ScheduleDay.vue";
import { useTheme } from "@/composables/useTheme.js";

const { isDark, toggle } = useTheme();

const SCHEDULE_KEY = "selectedSchedule";

const schedules = {
  ib3: "3ИБ",
  ib41: "4ИБ (1пг)",
  ib42: "4ИБ (2пг)",
  pim: "3ПИМ"
};

const weeks = {
  week_1: "1",
  week_2: "2",
};

const days = {
  all: "Все",
  monday: "Понедельник",
  tuesday: "Вторник",
  wednesday: "Среда",
  thursday: "Четверг",
  friday: "Пятница",
  saturday: "Суббота",
};

function getCurrentWeek() {
  const start = new Date(2025, 8, 1);
  const today = new Date();

  const diffDays = Math.floor((today - start) / (1000 * 60 * 60 * 24));
  let weekNumber = Math.floor(diffDays / 7) + 1;

  const dayOfWeek = today.getDay();

  if (dayOfWeek === 0) {
    weekNumber += 1;
  }

  return weekNumber % 2 === 1 ? "week_1" : "week_2";
}


function getCurrentDay() {
  const today = new Date();
  const dayIndex = today.getDay();

  if (dayIndex === 0) {
    return "monday";
  }

  const map = {
    1: "monday",
    2: "tuesday",
    3: "wednesday",
    4: "thursday",
    5: "friday",
    6: "saturday",
  };

  return map[dayIndex];
}


const selectedSchedule = ref(
  localStorage.getItem(SCHEDULE_KEY) || "ib4-2"
);

const selectedWeek = ref(getCurrentWeek());

const selectedDay = ref(getCurrentDay());

watch(selectedSchedule, (value) => {
  localStorage.setItem(SCHEDULE_KEY, value);
});

const scheduleData = computed(() => {
  switch (selectedSchedule.value) {
    case "ib41":
      return ib41Schedule;
    case "ib3":
      return ib3Schedule;
    case "pim":
      return pimSchedule;
    default:
      return ib42Schedule;
  }
});

const currentWeek = computed(() => scheduleData.value[selectedWeek.value]);

const filteredDays = computed(() => {
  if (selectedDay.value === "all") {
    return Object.keys(days).filter((d) => d !== "all");
  }
  return [selectedDay.value];
});
</script>

<template>
  <div class="p-2 sm:p-4 max-w-md mx-auto">
    <div class="relative mb-4">
      <h1 class="text-lg sm:text-xl font-bold text-center theme-text">Расписание</h1>
      <button
        type="button"
        @click="toggle"
        class="theme-btn absolute right-0 top-1/2 -translate-y-1/2 p-2 rounded-lg"
        :aria-label="isDark ? 'Светлая тема' : 'Тёмная тема'"
      >
        <svg v-if="isDark" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="4"/>
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/>
        </svg>
        <svg v-else xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
        </svg>
      </button>
    </div>

    <div class="mb-3">
      <label class="block mb-1 font-semibold text-sm theme-text-muted">Группа:</label>
      <div class="relative w-full text-sm">
        <select v-model="selectedSchedule" class="form-select">
          <option v-for="(label, key) in schedules" :key="key" :value="key">
            {{ label }}
          </option>
        </select>
        <img src="./components/icons/arrow.png" class="select-arrow pointer-events-none absolute m-auto top-0 bottom-0 right-3"
          width="15" />
      </div>
    </div>

    <div class="flex flex-row gap-2">
      <div class="mb-3 w-full">
        <label class="block mb-1 font-semibold text-sm theme-text-muted">Неделя:</label>
        <div class="relative w-full text-sm">
          <select v-model="selectedWeek" class="form-select">
            <option v-for="(label, key) in weeks" :key="key" :value="key">
              {{ label }}
            </option>
          </select>
          <img src="./components/icons/arrow.png" class="select-arrow pointer-events-none absolute m-auto top-0 bottom-0 right-3"
            width="15" />
        </div>
      </div>

      <div class="mb-4 w-full">
        <label class="block mb-1 font-semibold text-sm theme-text-muted">День:</label>
        <div class="relative w-full text-sm">
          <select v-model="selectedDay" class="form-select">
            <option v-for="(label, key) in days" :key="key" :value="key">
              {{ label }}
            </option>
          </select>
          <img src="./components/icons/arrow.png" class="select-arrow pointer-events-none absolute m-auto top-0 bottom-0 right-3"
            width="15" />
        </div>
      </div>
    </div>

    <div>
      <ScheduleDay v-for="dayKey in filteredDays" :key="dayKey" :dayName="days[dayKey]" :date="''"
        :lessons="currentWeek[dayKey]" />
    </div>

  </div>
</template>

<style scoped>
.select-arrow {
  opacity: 0.45;
}

html.dark .select-arrow {
  filter: invert(1);
  opacity: 0.6;
}
</style>
