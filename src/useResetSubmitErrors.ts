import { useEffect, useRef } from 'react';
import { useForm } from 'react-final-form';
import { FORM_ERROR, getIn } from 'final-form';

import type { UnwrappedSubmitErrorsMutators } from './submitErrorsMutators';
import { isObjectEmpty, flatten } from './utils';

const useResetSubmitErrors = () => {
  const form = useForm();
  const prevValues = useRef(form.getState().values);

  useEffect(() => {
    const { mutators } = form;

    const { resetSubmitError, resetSubmitErrors } =
      mutators as Partial<UnwrappedSubmitErrorsMutators>;

    const unsubscribe = form.subscribe(
      ({ values, submitError, submitErrors }) => {
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
      },
      { values: true, submitError: true, submitErrors: true },
    );

    return unsubscribe;
  }, [form]);
};

export default useResetSubmitErrors;
