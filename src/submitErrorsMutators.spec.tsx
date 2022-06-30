import type { MutableState, Tools } from 'final-form';
import { getIn, setIn, FORM_ERROR } from 'final-form';

import { resetSubmitError, resetSubmitErrors } from './submitErrorsMutators';

const makeFormState = ({
  submitErrors,
  submitError,
}: {
  submitErrors?: any;
  submitError?: any;
}): MutableState<any, any> => ({
  formState: {
    submitError,
    submitErrors,
    dirtySinceLastSubmit: false,
    errors: {},
    submitFailed: false,
    submitting: false,
    pristine: false,
    submitSucceeded: false,
    valid: false,
    validating: 0,
    values: {},
    lastSubmittedValues: {},
    modifiedSinceLastSubmit: false,
    resetWhileSubmitting: false,
  },
  fieldSubscribers: {},
  fields: {},
});

describe('submitErrorsMutators', () => {
  test('resetSubmitError should reset global errors', () => {
    const state = makeFormState({
      submitError: 'error',
      submitErrors: {
        [FORM_ERROR]: 'error',
        value: 'error',
      },
    });

    resetSubmitError(undefined, state, {
      getIn,
      setIn,
    } as Tools<any>);

    expect(state.formState.submitError).toEqual(undefined);
    expect(state.formState.submitErrors).toEqual({ value: 'error' });
  });

  test('resetSubmitErrors should ignore when no changes occur', () => {
    const state = makeFormState({
      submitError: 'error',
      submitErrors: {
        [FORM_ERROR]: 'error',
        value: 'error',
      },
    });

    const changed: string[] = [];

    resetSubmitErrors([changed], state, {
      getIn,
      setIn,
    } as Tools<any>);

    expect(state.formState.submitError).toEqual('error');
    expect(state.formState.submitErrors).toEqual({
      [FORM_ERROR]: 'error',
      value: 'error',
    });
  });

  test('resetSubmitErrors should reset field errors', () => {
    const changed = ['one', 'two', 'three'];

    const state = makeFormState({
      submitErrors: {
        one: 'error',
        two: 'error',
        three: 'error',
      },
    });

    resetSubmitErrors([changed], state, {
      getIn,
      setIn,
    } as Tools<any>);

    expect(state.formState.submitErrors).toEqual({});
  });
});
