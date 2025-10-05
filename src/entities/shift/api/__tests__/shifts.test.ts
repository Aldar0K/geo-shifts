import MockAdapter from "axios-mock-adapter";
import { apiClient } from "../../../../shared/api/client";
import { API_BASE_URL } from "../../../../shared/config/constants";
import { Shift } from "../../model/types";
import { fetchShifts } from "../shifts";

describe("shifts API", () => {
  let mock: MockAdapter;

  beforeEach(() => {
    mock = new MockAdapter(apiClient);
  });

  afterEach(() => {
    mock.reset();
  });

  afterAll(() => {
    mock.restore();
  });

  describe("fetchShifts", () => {
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

    it("should fetch shifts with correct parameters", async () => {
      const mockResponse = {
        data: [mockShift],
      };

      mock
        .onGet(`${API_BASE_URL}/shifts/map-list-unauthorized`)
        .reply(200, mockResponse);

      const result = await fetchShifts({
        latitude: 45.039268,
        longitude: 38.987221,
      });

      expect(result).toEqual([mockShift]);
      expect(mock.history.get.length).toBe(1);
      expect(mock.history.get[0].params).toEqual({
        latitude: 45.039268,
        longitude: 38.987221,
      });
    });

    it("should return empty array when no shifts available", async () => {
      const mockResponse = {
        data: [],
      };

      mock
        .onGet(`${API_BASE_URL}/shifts/map-list-unauthorized`)
        .reply(200, mockResponse);

      const result = await fetchShifts({
        latitude: 55.7558,
        longitude: 37.6173,
      });

      expect(result).toEqual([]);
    });

    it("should return multiple shifts", async () => {
      const mockShifts = [
        { ...mockShift, id: "1" },
        { ...mockShift, id: "2" },
        { ...mockShift, id: "3" },
      ];

      const mockResponse = {
        data: mockShifts,
      };

      mock
        .onGet(`${API_BASE_URL}/shifts/map-list-unauthorized`)
        .reply(200, mockResponse);

      const result = await fetchShifts({
        latitude: 45.039268,
        longitude: 38.987221,
      });

      expect(result).toHaveLength(3);
      expect(result[0].id).toBe("1");
      expect(result[2].id).toBe("3");
    });

    it("should handle 404 error", async () => {
      mock
        .onGet(`${API_BASE_URL}/shifts/map-list-unauthorized`)
        .reply(404, { message: "Not found" });

      await expect(
        fetchShifts({ latitude: 45.039268, longitude: 38.987221 })
      ).rejects.toThrow();
    });

    it("should handle 500 server error", async () => {
      mock
        .onGet(`${API_BASE_URL}/shifts/map-list-unauthorized`)
        .reply(500, { message: "Internal server error" });

      await expect(
        fetchShifts({ latitude: 45.039268, longitude: 38.987221 })
      ).rejects.toThrow();
    });

    it("should handle network error", async () => {
      mock.onGet(`${API_BASE_URL}/shifts/map-list-unauthorized`).networkError();

      await expect(
        fetchShifts({ latitude: 45.039268, longitude: 38.987221 })
      ).rejects.toThrow();
    });

    it("should handle shift with null rating", async () => {
      const shiftWithNullRating = {
        ...mockShift,
        customerRating: null,
      };

      const mockResponse = {
        data: [shiftWithNullRating],
      };

      mock
        .onGet(`${API_BASE_URL}/shifts/map-list-unauthorized`)
        .reply(200, mockResponse);

      const result = await fetchShifts({
        latitude: 45.039268,
        longitude: 38.987221,
      });

      expect(result[0].customerRating).toBeNull();
    });

    it("should send request with different coordinates", async () => {
      const mockResponse = { data: [] };

      mock
        .onGet(`${API_BASE_URL}/shifts/map-list-unauthorized`)
        .reply(200, mockResponse);

      await fetchShifts({
        latitude: 55.123456,
        longitude: 37.654321,
      });

      expect(mock.history.get[0].params).toEqual({
        latitude: 55.123456,
        longitude: 37.654321,
      });
    });
  });
});
