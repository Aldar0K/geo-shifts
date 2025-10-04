export type RootStackParamList = {
  ShiftsList: undefined;
  ShiftDetails: { shiftId: string };
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
