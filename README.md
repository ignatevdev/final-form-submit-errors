# final-form-submit-errors

[![NPM version][npm-image]][npm-url]
[![Build Status][travis-image]](https://travis-ci.org/ignatevdev/final-form-submit-errors)

[npm-image]: https://img.shields.io/npm/v/final-form-submit-errors.svg?style=flat-square
[npm-url]: https://www.npmjs.com/package/final-form-submit-errors
[travis-image]: https://travis-ci.org/ignatevdev/final-form-submit-errors.svg?branch=master

### A helper for [react-final-form](https://github.com/final-form/react-final-form) which enables automatic submit errors reset

## Reason

`final-form` is a great library, but it has one major problem. After you throw a submit error, your form becomes invalid forever and submit errors would not be cleared until the next submit.

It's very intuitive to clear an error if the field containing the error is changing, and `final-form-submit-errors` does exactly that.

## Install

`npm i final-form-submit-errors`
or
`yarn add final-form-submit-errors`

## Usage

With the `SubmitErrorsSpy` component:

```jsx
import { Form } from 'react-final-form';
import {
  submitErrorsMutators,
  SubmitErrorsSpy,
} from 'final-form-submit-errors';

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

With the `useResetSubmitErrors` hook:

```jsx
import { Form } from 'react-final-form';
import {
  submitErrorsMutators,
  useResetSubmitErrors,
} from 'final-form-submit-errors';

const FormContent = ({ handleSubmit }) => {
  useResetSubmitErrors();

  return <form onSubmit={handleSubmit}>{/* ... */}</form>;
};

const MyForm = () => (
  <Form
    onSubmit={onSubmit}
    mutators={{
      // add submitErrorsMutators to your mutators
      ...submitErrorsMutators,
    }}
    render={props => <FormContent {...props} />}
  />
);
```

## License

MIT. Copyright (c) Anton Ignatev.
