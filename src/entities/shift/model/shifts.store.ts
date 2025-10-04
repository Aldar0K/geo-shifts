import {makeAutoObservable, runInAction} from 'mobx';
import {fetchShifts} from '../api/shifts';
import {Shift} from './types';

class ShiftsStore {
  shifts: Shift[] = [];
  isLoading = false;
  error: string | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  async loadShifts(lat: number, lon: number) {
    this.isLoading = true;
    this.error = null;

    try {
      const data = await fetchShifts({lat, lon});
      runInAction(() => {
        this.shifts = data;
        this.isLoading = false;
      });
    } catch (err) {
      runInAction(() => {
        this.error =
          err instanceof Error
            ? err.message
            : 'Не удалось загрузить список смен';
        this.isLoading = false;
      });
    }
  }

  getShiftById(id: string): Shift | undefined {
    return this.shifts.find(shift => shift.id === id);
  }
}

export const shiftsStore = new ShiftsStore();

