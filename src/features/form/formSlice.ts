import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { getFormIds } from '../../data/form';

export interface FormState {
  values: { [key: string]: string };
  errors: { [key: string]: string };
}

// creates the initialState dynamically using the getFormIds method
const formIds = getFormIds();

const initialState: FormState = formIds.reduce(
  (formObj, currentId) => {
    formObj.values[currentId] = '';
    return formObj;
  },
  { values: {}, errors: {} } as FormState
);

export const counterSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    updateForm: (
      state,
      action: PayloadAction<{ id: string; value: string }>
    ) => {
      const { id, value } = action.payload;
      state.values[id] = value;
    },
    resetErrors: (state) => {
      state.errors = {};
    },
    resetErrorField: (state, action: PayloadAction<{ id: string }>) => {
      state.errors[action.payload.id] = '';
    },
    updateErrors: (state, action: PayloadAction<{ [key: string]: string }>) => {
      state.errors = action.payload;
    },
  },
});

export const { updateForm, resetErrors, resetErrorField, updateErrors } =
  counterSlice.actions;

export default counterSlice.reducer;
