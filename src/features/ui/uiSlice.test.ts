import { configureStore } from '@reduxjs/toolkit';
import ui, { updateUiState, UiStatus } from './uiSlice';

describe('ui reducer', () => {
  const configureStoreWithUiReducer = () => configureStore({ reducer: { ui } });

  let store: ReturnType<typeof configureStoreWithUiReducer>;

  beforeEach(() => {
    store = configureStore({ reducer: { ui } });
  });

  it('should handle initial state', () => {
    const actual = store.getState().ui;
    expect(actual.status).toEqual(UiStatus.CollectInformation);
  });

  it('should handle updateUiState', () => {
    store.dispatch(updateUiState(UiStatus.Approved));
    const actual = store.getState().ui;
    expect(actual.status).toEqual(UiStatus.Approved);
  });
});
