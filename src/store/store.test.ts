import { RootState, AppDispatch, setupStore } from "./store";
import { UiStatus } from "../features/ui/uiSlice";
import { FormState } from "../features/form/formSlice";
import { getFormIds } from "../data/form";

describe("store", () => {
  const initialValuesObj = getFormIds().reduce(
    (valuesObj, id) => ({ ...valuesObj, [id]: "" }),
    {}
  );

  const store = setupStore();

  it("should handle initial state", () => {
    const actual: RootState = store.getState();
    const initialFormState: FormState = {
      values: initialValuesObj,
      errors: {},
    };
    const initialUiState = UiStatus.CollectInformation;

    expect(actual.form).toEqual(initialFormState);
    expect(actual.ui.status).toEqual(initialUiState);
  });

  it("should dispatch actions", () => {
    const action = { type: "test" };
    const dispatch: AppDispatch = store.dispatch;

    expect(() => dispatch(action)).not.toThrow();
  });
});
