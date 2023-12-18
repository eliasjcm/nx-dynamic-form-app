import { configureStore } from '@reduxjs/toolkit';
import formReducer, {
  updateForm,
  resetErrors,
  resetErrorField,
  updateErrors,
  FormState,
} from './formSlice';
import { getFormIds } from '../../data/form';

describe('form reducer', () => {
  const configureStoreWithFormReducer = () =>
    configureStore({ reducer: { form: formReducer } });

  let store: ReturnType<typeof configureStoreWithFormReducer>;

  const initialValuesObj = getFormIds().reduce(
    (valuesObj, id) => ({ ...valuesObj, [id]: '' }),
    {}
  );

  beforeEach(() => {
    store = configureStoreWithFormReducer();
  });

  it('should handle initial state', () => {
    const actual = store.getState().form;
    expect(actual.values).toEqual(initialValuesObj);
    expect(actual.errors).toEqual({});
  });

  it('should handle updateForm', () => {
    const id = 'testId';
    const value = 'value';
    store.dispatch(updateForm({ id, value }));
    const actual = store.getState().form;
    expect(actual.values[id]).toEqual(value);
  });

  it('should handle resetErrors', () => {
    store.dispatch(resetErrors());
    const actual = store.getState().form;
    expect(actual.errors).toEqual({});
  });

  it('should handle resetErrorField', () => {
    const id = 'testId';
    store.dispatch(resetErrorField({ id }));
    const actual = store.getState().form;
    expect(actual.errors[id]).toEqual('');
  });

  it('should handle updateErrors', () => {
    const id = 'testId';
    const errors: FormState['errors'] = { [id]: 'error' };
    store.dispatch(updateErrors(errors));
    const actual = store.getState().form;
    expect(actual.errors).toEqual(errors);
  });
});
