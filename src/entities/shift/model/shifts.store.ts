import { makeAutoObservable, runInAction } from "mobx";
import { fetchShifts } from "../api/shifts";
import { Shift } from "./types";

class ShiftsStore {
  shifts: Shift[] = [];
  isLoading = false;
  error: string | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  async loadShifts(latitude: number, longitude: number) {
    this.isLoading = true;
    this.error = null;

    try {
      const data = await fetchShifts({ latitude, longitude });
      runInAction(() => {
        this.shifts = data;
        this.isLoading = false;
      });
    } catch (error: any) {
      runInAction(() => {
        this.error =
          error?.response?.data?.message ||
          error?.message ||
          "Не удалось загрузить список смен";
        this.isLoading = false;
      });
    }
  }

  getShiftById(id: string): Shift | undefined {
    return this.shifts.find((shift) => shift.id === id);
  }
}

export const shiftsStore = new ShiftsStore();
