import AsyncStorage from "@react-native-async-storage/async-storage";
import { makeAutoObservable } from "mobx";

export type ThemeMode = "auto" | "light" | "dark";

const THEME_STORAGE_KEY = "@theme_mode";

class SettingsStore {
  themeMode: ThemeMode = "auto";
  isLoaded = false;

  constructor() {
    makeAutoObservable(this);
    this.loadSettings();
  }

  async loadSettings() {
    try {
      const savedMode = await AsyncStorage.getItem(THEME_STORAGE_KEY);
      if (savedMode && this.isValidThemeMode(savedMode)) {
        this.themeMode = savedMode as ThemeMode;
      }
    } catch (error) {
      console.error("Failed to load theme mode", error);
    } finally {
      this.isLoaded = true;
    }
  }

  async setThemeMode(mode: ThemeMode) {
    try {
      this.themeMode = mode;
      await AsyncStorage.setItem(THEME_STORAGE_KEY, mode);
    } catch (error) {
      console.error("Failed to save theme mode", error);
    }
  }

  private isValidThemeMode(value: string): boolean {
    return value === "auto" || value === "light" || value === "dark";
  }
}

export const settingsStore = new SettingsStore();
