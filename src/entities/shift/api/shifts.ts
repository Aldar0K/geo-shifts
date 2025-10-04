import {apiClient} from '../../../shared/api/client';
import {ENDPOINTS} from '../../../shared/config/constants';
import {Shift} from '../model/types';

interface FetchShiftsParams {
  lat: number;
  lon: number;
}

export const fetchShifts = async ({
  lat,
  lon,
}: FetchShiftsParams): Promise<Shift[]> => {
  const response = await apiClient.get<{data: Shift[]}>(ENDPOINTS.SHIFTS, {
    params: {lat, lon},
  });
  return response.data.data;
};

