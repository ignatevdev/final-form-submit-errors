import clean from './_clean';
import flatten from './_flatten';

export function resetSubmitErrors([{ prev, current }], state, { getIn, setIn }) {
    // Reset the general submit error on any value change
    if (state.formState.submitError) {
        delete state.formState.submitError;
    }

    if (state.formState.submitErrors) {
        // Flatten nested errors object for easier comparison
        const flatErrors = flatten(state.formState.submitErrors);

        // Iterate over each error
        Object.keys(flatErrors).forEach(key => {
            // Compare the value for the error field path
            if (getIn(prev, key) !== getIn(current, key)) {
                // Reset the error on value change
                state.formState = setIn(state.formState, `submitErrors.${key}`, null);
            }
        });

        // Clear submit errors from empty objects and arrays
        state.formState.submitErrors = clean(state.formState.submitErrors);
    }
}

export default {
    resetSubmitErrors,
};
