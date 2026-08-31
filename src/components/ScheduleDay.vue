<script setup>
const props = defineProps({
  dayName: String,
  date: String,
  lessons: Array
})

const typeColors = {
  lecture: "border-zinc-400 dark:border-zinc-500",
  practice: "border-zinc-500 dark:border-zinc-400",
  lab: "border-zinc-600 dark:border-zinc-300"
}

const getColor = (type) => typeColors[type] || "border-zinc-300 dark:border-zinc-600"

const formatType = (type) => {
  switch (type) {
    case "lecture":
      return "лек"
    case "practice":
      return "пр"
    case "lab":
      return "лаб"
    default:
      return type
  }
}
</script>

<template>
  <div class="day-header px-4 py-2 rounded-lg flex justify-between items-center my-2 text-sm">
    <span class="font-semibold">{{ dayName }}</span>
    <span>{{ date }}</span>
  </div>

  <div class="lessons-container rounded-lg p-1">
    <div
      v-for="(lesson, index) in lessons"
      :key="index"
      class="lesson-card rounded mb-2 last:mb-0 p-2 pt-1 border-l-4 relative"
      :class="getColor(lesson.type)"
    >
      <div class="flex justify-between text-sm theme-text-muted">
        <span>{{ lesson.time }}</span>
      </div>

      <div class="lesson-divider h-[1px] absolute top-[26px] left-0 w-full"></div>

      <div class="mt-1 font-semibold text-sm theme-text">
        {{ formatType(lesson.type) }} {{ lesson.subject }}
      </div>

      <div class="mt-1 text-sm theme-text-muted flex flex-col">
        <span class="flex flex-row items-center gap-1">
          <img src="@/components/icons/professor.svg" alt="" width="15" class="icon-muted"> {{ lesson.teacher }}
        </span>
        <span class="flex flex-row items-center gap-1">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="15" class="icon-muted">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M5 9.5C5 6.09371 8.00993 3 12 3C15.9901 3 19 6.09371 19 9.5C19 11.6449 17.6877 14.0406 15.9606 16.2611C14.5957 18.016 13.0773 19.5329 12 20.5944C10.9227 19.5329 9.40427 18.016 8.03935 16.2611C6.31229 14.0406 5 11.6449 5 9.5ZM12 1C6.99007 1 3 4.90629 3 9.5C3 12.3551 4.68771 15.2094 6.46065 17.4889C7.99487 19.4615 9.7194 21.1574 10.7973 22.2173C10.9831 22.4001 11.1498 22.564 11.2929 22.7071C11.4804 22.8946 11.7348 23 12 23C12.2652 23 12.5196 22.8946 12.7071 22.7071C12.8502 22.564 13.0169 22.4001 13.2027 22.2174L13.2028 22.2173C14.2806 21.1573 16.0051 19.4615 17.5394 17.4889C19.3123 15.2094 21 12.3551 21 9.5C21 4.90629 17.0099 1 12 1ZM12 12.5C13.3807 12.5 14.5 11.3807 14.5 10C14.5 8.61929 13.3807 7.5 12 7.5C10.6193 7.5 9.5 8.61929 9.5 10C9.5 11.3807 10.6193 12.5 12 12.5Z" fill="currentColor"></path>
          </svg>
          {{ lesson.room }}
        </span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.icon-muted {
  opacity: 0.45;
  color: var(--text-secondary);
}

html.dark .icon-muted {
  filter: invert(1);
  opacity: 0.7;
}
</style>
