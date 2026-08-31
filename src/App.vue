<script setup>
import { ref, computed, watch } from "vue";
import ib3Schedule from "@/data/ib3.json";
import ib41Schedule from "@/data/ib4-1.json";
import ib42Schedule from "@/data/ib4-2.json";
import pimSchedule from "@/data/pim.json";
import ScheduleDay from "@/components/ScheduleDay.vue";

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
  localStorage.getItem(SCHEDULE_KEY) || "ib2"
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
    case "ib42":
      return ib42Schedule;
    case "pim":
      return pimSchedule;
    default:
      return ib3Schedule;
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
    <h1 class="text-lg sm:text-xl font-bold mb-4 text-center">Расписание</h1>

    <div class="mb-3">
      <label class="block mb-1 font-semibold text-sm">Группа:</label>
      <div class="relative w-full text-sm">
        <select v-model="selectedSchedule" class="w-full border rounded px-3 py-2 appearance-none bg-white">
          <option v-for="(label, key) in schedules" :key="key" :value="key">
            {{ label }}
          </option>
        </select>
        <img src="./components/icons/arrow.png" class="pointer-events-none absolute m-auto top-0 bottom-0 right-3"
          width="15" />
      </div>
    </div>

    <div class="flex flex-row gap-2">
      <div class="mb-3 w-full">
        <label class="block mb-1 font-semibold text-sm">Неделя:</label>
        <div class="relative w-full text-sm">
          <select v-model="selectedWeek" class="w-full border rounded px-3 py-2 appearance-none bg-white">
            <option v-for="(label, key) in weeks" :key="key" :value="key">
              {{ label }}
            </option>
          </select>
          <img src="./components/icons/arrow.png" class="pointer-events-none absolute m-auto top-0 bottom-0 right-3"
            width="15" />
        </div>
      </div>

      <div class="mb-4 w-full">
        <label class="block mb-1 font-semibold text-sm">День:</label>
        <div class="relative w-full text-sm">
          <select v-model="selectedDay" class="w-full border rounded px-3 py-2 appearance-none bg-white">
            <option v-for="(label, key) in days" :key="key" :value="key">
              {{ label }}
            </option>
          </select>
          <img src="./components/icons/arrow.png" class="pointer-events-none absolute m-auto top-0 bottom-0 right-3"
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
select {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  padding: 0.5rem 1rem;
  border: 1px solid #ccc;
  border-radius: 0.5rem;
  background-color: white;
}
</style>
