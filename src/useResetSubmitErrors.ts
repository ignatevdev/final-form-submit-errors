import { useEffect, useRef } from 'react';

import { useForm } from 'react-final-form';

const useResetSubmitErrors = () => {
    const form = useForm();
    const prevValues = useRef(form.getState().values);
    useEffect(() => {
        const unsubscribe = form.subscribe(
            ({ values }) => {
                form.mutators.resetSubmitErrors({
                    current: values,
                    prev: prevValues.current,
                });

                prevValues.current = values;
            },
            { values: true }
        );
        return unsubscribe;
    }, [form]);
};

export default useResetSubmitErrors;
