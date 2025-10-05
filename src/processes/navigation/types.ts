export type RootStackParamList = {
  ShiftsList: undefined;
  ShiftDetails: { shiftId: string };
  Settings: undefined;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
