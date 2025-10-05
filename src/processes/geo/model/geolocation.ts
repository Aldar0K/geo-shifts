import Geolocation from "@react-native-community/geolocation";
import { PermissionsAndroid, Platform } from "react-native";

export interface Coordinates {
  latitude: number;
  longitude: number;
}

const requestAndroidPermission = async (): Promise<boolean> => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: "Доступ к геолокации",
        message:
          "Нам нужен доступ к вашей геолокации, чтобы показать доступные смены в вашем городе",
        buttonNeutral: "Спросить позже",
        buttonNegative: "Отмена",
        buttonPositive: "Разрешить",
      }
    );
    return granted === PermissionsAndroid.RESULTS.GRANTED;
  } catch (err) {
    console.warn(err);
    return false;
  }
};

export const getCurrentLocation = async (): Promise<Coordinates> => {
  if (Platform.OS === "android") {
    const hasPermission = await requestAndroidPermission();
    if (!hasPermission) {
      throw new Error("Доступ к геолокации отклонен");
    }
  }

  return new Promise((resolve, reject) => {
    Geolocation.getCurrentPosition(
      (position) => {
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      () => {
        reject(
          new Error(
            "Не удалось определить ваше местоположение. Проверьте настройки геолокации."
          )
        );
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 10000,
      }
    );
  });
};
