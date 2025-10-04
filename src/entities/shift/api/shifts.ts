import {apiClient} from '../../../shared/api/client';
import {ENDPOINTS} from '../../../shared/config/constants';
import {Shift, ShiftsResponse} from '../model/types';

interface FetchShiftsParams {
  latitude: number;
  longitude: number;
}

export const fetchShifts = async ({
  latitude,
  longitude,
}: FetchShiftsParams): Promise<Shift[]> => {
  const response = await apiClient.get<ShiftsResponse>(ENDPOINTS.SHIFTS, {
    params: {latitude, longitude},
  });
  return response.data.data;
};

