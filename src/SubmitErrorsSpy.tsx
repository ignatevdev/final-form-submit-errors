import * as React from 'react';

import { FORM_ERROR, getIn } from 'final-form';
import { FormSpy, FormSpyRenderProps } from 'react-final-form';

import { isObjectEmpty, flatten } from './utils';

import type { UnwrappedSubmitErrorsMutators } from './submitErrorsMutators';

export const Spy = ({
  form: { mutators },
  values,
  submitError,
  submitErrors,
}: FormSpyRenderProps) => {
  const { resetSubmitError, resetSubmitErrors } =
    mutators as Partial<UnwrappedSubmitErrorsMutators>;

  const prevValues = React.useRef<Record<string, any>>(values);

  React.useLayoutEffect(() => {
    if (prevValues.current !== values) {
      if (submitError || (submitErrors && submitErrors[FORM_ERROR])) {
        if (resetSubmitError) {
          resetSubmitError();
        } else {
          console.error('resetSubmitError mutator was not found');
        }
      }

      if (!isObjectEmpty(submitErrors)) {
        // Flatten nested errors object for easier comparison
        const flatErrors = flatten(submitErrors);
        const changed: string[] = [];
        // Iterate over each error
        Object.keys(flatErrors).forEach(key => {
          // Compare the value for the error field path
          if (getIn(prevValues.current, key) !== getIn(values, key)) {
            changed.push(key);
          }
        });

        if (changed.length) {
          if (resetSubmitErrors) {
            resetSubmitErrors(changed);
          } else {
            console.error('resetSubmitError mutator was not found');
          }
        }
      }
    }

    prevValues.current = values;
  });

  return null;
};

export default function SubmitErrorsSpy() {
  return (
    <FormSpy
      subscription={{ values: true, submitError: true, submitErrors: true }}
      render={Spy}
    />
  );
}
