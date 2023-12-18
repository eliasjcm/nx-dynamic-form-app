import { combineReducers, configureStore } from '@reduxjs/toolkit';
import formReducer from '../features/form/formSlice';
import uiReducer from '../features/ui/uiSlice';

const rootReducer = combineReducers({
  form: formReducer,
  ui: uiReducer,
});

export const setupStore = (preloadedState?: Partial<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
