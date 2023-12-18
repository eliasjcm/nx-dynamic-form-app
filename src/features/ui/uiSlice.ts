import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export enum UiStatus {
  CollectInformation = 'collect-information',
  Approved = 'approved',
}

export interface UiState {
  status: UiStatus;
}

const initialState: UiState = {
  status: UiStatus.CollectInformation,
};

export const counterSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    updateUiState: (state: UiState, action: PayloadAction<UiStatus>) => {
      state.status = action.payload;
    },
  },
});

export const { updateUiState } = counterSlice.actions;

export default counterSlice.reducer;
