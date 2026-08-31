import { ref, computed } from "vue";

const THEME_KEY = "theme";

function getStoredTheme() {
  const saved = localStorage.getItem(THEME_KEY);
  if (saved === "dark" || saved === "light") return saved;
  return "dark";
}

function applyTheme(value) {
  const isDark = value === "dark";
  document.documentElement.classList.toggle("dark", isDark);
  localStorage.setItem(THEME_KEY, value);
}

const theme = ref(getStoredTheme());
applyTheme(theme.value);

export function useTheme() {
  const isDark = computed(() => theme.value === "dark");

  function toggle() {
    theme.value = theme.value === "dark" ? "light" : "dark";
    applyTheme(theme.value);
  }

  return { isDark, toggle };
}
