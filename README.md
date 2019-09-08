# final-form-submit-errors

### A helper for [react-final-form](https://github.com/final-form/react-final-form) which enables automatic submit errors reset

## Reason

`final-form` is a great library, but it has one major problem. After you throw a submit error, your form becomes invalid forever and submit errors would not be cleared until the next submit.

In this case, it's very intuitive to clear an error if the field containing the error is changing. `final-form-submit-errors` does exactly that.

## Usage

```jsx
import { Form } from 'react-final-form';
import { submitErrorsMutators, SubmitErrorsSpy } from 'final-form-submit-errors';

const MyForm = () => (
    <Form
        onSubmit={onSubmit}
        mutators={{
            // add submitErrorsMutators to your mutators
            ...submitErrorsMutators,
        }}
        render={({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
                {/* add SubmitErrorsSpy somewhere in your form */}
                <SubmitErrorsSpy />
            </form>
        )}
    />
);
```

## License

MIT. Copyright (c) Anton Ignatev.
