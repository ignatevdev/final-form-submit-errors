import * as React from 'react';

import { FormSpy } from 'react-final-form';

function Spy({ form: { mutators }, values }) {
    const prevValues = React.useRef(values);

    mutators.resetSubmitErrors({
        current: values,
        prev: prevValues.current,
    });

    prevValues.current = values;

    return null;
}

export default function SubmitErrorsSpy() {
    return <FormSpy subscription={{ values: true }} render={Spy} />;
}
