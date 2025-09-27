<script setup>
import { ref, computed } from "vue";
import schedule from "@/data/schedule.json";
import ib3Schedule from "@/data/ib3.json";
import pmiSchedule from "@/data/pmi.json";
import ScheduleDay from "@/components/ScheduleDay.vue";

const schedules = {
  schedule: "2ИБ",
  ib3: "3ИБ",
  pmi: "2ПМИ"
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
  const weekNumber = Math.floor(diffDays / 7) + 1;

  return weekNumber % 2 === 1 ? "week_1" : "week_2";
}

const selectedSchedule = ref("schedule");
const selectedWeek = ref(getCurrentWeek());
const selectedDay = ref("all");

const scheduleData = computed(() => {
  switch (selectedSchedule.value) {
    case "ib3":
      return ib3Schedule;
    case "pmi":
      return pmiSchedule;
    default:
      return schedule;
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
        <select
          v-model="selectedSchedule"
          class="w-full border rounded px-3 py-2 appearance-none bg-white"
        >
          <option v-for="(label, key) in schedules" :key="key" :value="key">
            {{ label }}
          </option>
        </select>
        <img
          src="./components/icons/arrow.png"
          class="pointer-events-none absolute m-auto top-0 bottom-0 right-3 flex items-center"
          alt=""
          width="15"
        />
      </div>
    </div>

    <div class="flex flex-row gap-2">
      <div class="mb-3 w-full">
        <label class="block mb-1 font-semibold text-sm">Неделя:</label>
        <div class="relative w-full text-sm">
          <select
            v-model="selectedWeek"
            class="w-full border rounded px-3 py-2 appearance-none bg-white"
          >
            <option v-for="(label, key) in weeks" :key="key" :value="key">
              {{ label }}
            </option>
          </select>
          <img
            src="./components/icons/arrow.png"
            class="pointer-events-none absolute m-auto top-0 bottom-0 right-3 flex items-center"
            alt=""
            width="15"
          />
        </div>
      </div>

      <div class="mb-4 w-full">
        <label class="block mb-1 font-semibold text-sm">День:</label>
        <div class="relative w-full text-sm">
          <select
            v-model="selectedDay"
            class="w-full border rounded px-3 py-2 appearance-none bg-white"
          >
            <option v-for="(label, key) in days" :key="key" :value="key">
              {{ label }}
            </option>
          </select>
          <img
            src="./components/icons/arrow.png"
            class="pointer-events-none absolute m-auto top-0 bottom-0 right-3 flex items-center"
            alt=""
            width="15"
          />
        </div>
      </div>
    </div>

    <div>
      <ScheduleDay
        v-for="dayKey in filteredDays"
        :key="dayKey"
        :dayName="days[dayKey]"
        :date="''"
        :lessons="currentWeek[dayKey]"
      />
    </div>
  </div>
</template>
<style scoped>
select {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
}

select {
  padding: 0.5rem 1rem; /* теперь будет работать */
  border: 1px solid #ccc;
  border-radius: 0.5rem;
  background-color: white;
}
</style>