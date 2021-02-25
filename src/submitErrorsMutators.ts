import type {Mutator} from 'final-form';

import clean from './_clean';
import flatten from './_flatten';
import isObjectEmpty from './_isObjectEmpty';

export const resetSubmitErrors: Mutator = ([{ prev, current }], state, { getIn, setIn }) => {
    // Reset the general submit error on any value change
    if (state.formState.submitError) {
        delete state.formState.submitError;
    }

    if (!isObjectEmpty(state.formState.submitErrors)) {
        // Flatten nested errors object for easier comparison
        const flatErrors = flatten(state.formState.submitErrors);

        const changed = [];

        // Iterate over each error
        Object.keys(flatErrors).forEach(key => {
            // Compare the value for the error field path
            if (getIn(prev, key) !== getIn(current, key)) {
                changed.push(key);
            }
        });
        

        // Reset the error on value change
        if (changed.length) {
            let newErrors = state.formState.submitErrors;

            changed.forEach(key => {
                newErrors = setIn(newErrors, key, null);
            });

            // Clear submit errors from empty objects and arrays
            const cleanErrors = clean(newErrors);

            state.formState.submitErrors = cleanErrors;
        }
    }
}

export default {
    resetSubmitErrors
};