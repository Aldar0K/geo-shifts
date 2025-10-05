import { runInAction } from "mobx";
import * as shiftsApi from "../../api/shifts";
import { shiftsStore } from "../shifts.store";
import { Shift } from "../types";

// Мокируем API
jest.mock("../../api/shifts");

describe("ShiftsStore", () => {
  const mockShift: Shift = {
    id: "123",
    companyName: "Test Company",
    logo: "https://example.com/logo.png",
    workTypes: [
      {
        id: 1,
        name: "Курьер",
        nameGt5: "Курьер",
        nameLt5: "Курьер",
        nameOne: "Курьер",
      },
    ],
    address: "Test Address",
    dateStartByCity: "2025-01-15T10:00:00",
    timeStartByCity: "10:00:00",
    timeEndByCity: "18:00:00",
    planWorkers: 5,
    currentWorkers: 3,
    priceWorker: 1500,
    customerRating: 4.5,
    customerFeedbacksCount: "10",
  };

  beforeEach(() => {
    // Очищаем store перед каждым тестом
    runInAction(() => {
      shiftsStore.shifts = [];
      shiftsStore.isLoading = false;
      shiftsStore.error = null;
    });
    jest.clearAllMocks();
  });

  describe("loadShifts", () => {
    it("should load shifts successfully", async () => {
      const mockShifts = [mockShift];
      (shiftsApi.fetchShifts as jest.Mock).mockResolvedValue(mockShifts);

      expect(shiftsStore.isLoading).toBe(false);

      const loadPromise = shiftsStore.loadShifts(45.039268, 38.987221);

      // Проверяем что isLoading стал true
      expect(shiftsStore.isLoading).toBe(true);
      expect(shiftsStore.error).toBeNull();

      await loadPromise;

      // После загрузки
      expect(shiftsStore.shifts).toEqual(mockShifts);
      expect(shiftsStore.isLoading).toBe(false);
      expect(shiftsStore.error).toBeNull();
    });

    it("should call API with correct coordinates", async () => {
      (shiftsApi.fetchShifts as jest.Mock).mockResolvedValue([]);

      await shiftsStore.loadShifts(55.7558, 37.6173);

      expect(shiftsApi.fetchShifts).toHaveBeenCalledWith({
        latitude: 55.7558,
        longitude: 37.6173,
      });
    });

    it("should handle empty shifts array", async () => {
      (shiftsApi.fetchShifts as jest.Mock).mockResolvedValue([]);

      await shiftsStore.loadShifts(45.039268, 38.987221);

      expect(shiftsStore.shifts).toEqual([]);
      expect(shiftsStore.isLoading).toBe(false);
      expect(shiftsStore.error).toBeNull();
    });

    it("should handle multiple shifts", async () => {
      const mockShifts = [
        { ...mockShift, id: "1" },
        { ...mockShift, id: "2" },
        { ...mockShift, id: "3" },
      ];
      (shiftsApi.fetchShifts as jest.Mock).mockResolvedValue(mockShifts);

      await shiftsStore.loadShifts(45.039268, 38.987221);

      expect(shiftsStore.shifts).toHaveLength(3);
      expect(shiftsStore.shifts[0].id).toBe("1");
      expect(shiftsStore.shifts[2].id).toBe("3");
    });

    it("should handle API error", async () => {
      const errorMessage = "Network error";
      (shiftsApi.fetchShifts as jest.Mock).mockRejectedValue(
        new Error(errorMessage)
      );

      await shiftsStore.loadShifts(45.039268, 38.987221);

      expect(shiftsStore.shifts).toEqual([]);
      expect(shiftsStore.isLoading).toBe(false);
      expect(shiftsStore.error).toBe(errorMessage);
    });

    it("should handle axios error with response", async () => {
      const axiosError = {
        response: {
          data: {
            message: "Server error",
          },
        },
        message: "Request failed",
      };
      (shiftsApi.fetchShifts as jest.Mock).mockRejectedValue(axiosError);

      await shiftsStore.loadShifts(45.039268, 38.987221);

      expect(shiftsStore.error).toBe("Server error");
      expect(shiftsStore.isLoading).toBe(false);
    });

    it("should use default error message if no message provided", async () => {
      (shiftsApi.fetchShifts as jest.Mock).mockRejectedValue({});

      await shiftsStore.loadShifts(45.039268, 38.987221);

      expect(shiftsStore.error).toBe("Не удалось загрузить список смен");
      expect(shiftsStore.isLoading).toBe(false);
    });

    it("should reset error on new load attempt", async () => {
      // Первая загрузка с ошибкой
      (shiftsApi.fetchShifts as jest.Mock).mockRejectedValue(
        new Error("Error")
      );
      await shiftsStore.loadShifts(45.039268, 38.987221);
      expect(shiftsStore.error).toBe("Error");

      // Вторая загрузка успешна
      (shiftsApi.fetchShifts as jest.Mock).mockResolvedValue([mockShift]);
      await shiftsStore.loadShifts(45.039268, 38.987221);

      expect(shiftsStore.error).toBeNull();
      expect(shiftsStore.shifts).toEqual([mockShift]);
    });
  });

  describe("getShiftById", () => {
    beforeEach(() => {
      runInAction(() => {
        shiftsStore.shifts = [
          { ...mockShift, id: "1" },
          { ...mockShift, id: "2" },
          { ...mockShift, id: "3" },
        ];
      });
    });

    it("should find shift by id", () => {
      const shift = shiftsStore.getShiftById("2");

      expect(shift).toBeDefined();
      expect(shift?.id).toBe("2");
    });

    it("should return undefined for non-existent id", () => {
      const shift = shiftsStore.getShiftById("999");

      expect(shift).toBeUndefined();
    });

    it("should return first shift", () => {
      const shift = shiftsStore.getShiftById("1");

      expect(shift?.id).toBe("1");
    });

    it("should return last shift", () => {
      const shift = shiftsStore.getShiftById("3");

      expect(shift?.id).toBe("3");
    });

    it("should return undefined when shifts array is empty", () => {
      runInAction(() => {
        shiftsStore.shifts = [];
      });

      const shift = shiftsStore.getShiftById("1");

      expect(shift).toBeUndefined();
    });
  });

  describe("MobX reactivity", () => {
    it("should be observable", () => {
      // Проверяем что shifts - observable
      runInAction(() => {
        shiftsStore.shifts = [mockShift];
      });

      expect(shiftsStore.shifts).toHaveLength(1);
      expect(shiftsStore.shifts[0].id).toBe("123");
    });

    it("should update isLoading reactively", () => {
      runInAction(() => {
        shiftsStore.isLoading = true;
      });

      expect(shiftsStore.isLoading).toBe(true);

      runInAction(() => {
        shiftsStore.isLoading = false;
      });

      expect(shiftsStore.isLoading).toBe(false);
    });

    it("should update error reactively", () => {
      runInAction(() => {
        shiftsStore.error = "Test error";
      });

      expect(shiftsStore.error).toBe("Test error");

      runInAction(() => {
        shiftsStore.error = null;
      });

      expect(shiftsStore.error).toBeNull();
    });
  });
});
