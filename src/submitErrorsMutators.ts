import type { Mutator } from 'final-form';
import { FORM_ERROR } from 'final-form';

import { clean } from './utils';

export interface SubmitErrorsMutators<FormValues = any> {
  resetSubmitError: Mutator<FormValues>;
  resetSubmitErrors: Mutator<FormValues>;
}

export type UnwrappedSubmitErrorsMutators = {
  resetSubmitError: () => void;
  resetSubmitErrors: (fields: string[]) => void;
};

export const resetSubmitError: Mutator = (_, state) => {
  // Reset the general submit error on any value change
  if (state.formState.submitError) {
    delete state.formState.submitError;
  }

  if (state.formState.submitErrors) {
    delete (state.formState.submitErrors as Record<string, unknown>)[
      FORM_ERROR
    ];
  }
};

export const resetSubmitErrors: Mutator = (args, state, { setIn }) => {
  const [fields]: [fields: string[]] = args;

  // Reset the error on value change
  if (fields.length) {
    let newErrors = state.formState.submitErrors;

    fields.forEach(key => {
      if (newErrors) {
        newErrors = setIn(newErrors, key, null);
      }
    });

    // Clear submit errors from empty objects and arrays
    const cleanErrors = clean(newErrors);

    state.formState.submitErrors = cleanErrors;
  }
};

const submitErrorsMutators: SubmitErrorsMutators = {
  resetSubmitError,
  resetSubmitErrors,
};

export default submitErrorsMutators;
