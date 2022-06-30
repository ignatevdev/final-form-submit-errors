import * as React from 'react';
import { FORM_ERROR } from 'final-form';
import { Field, Form } from 'react-final-form';
import { render, cleanup, fireEvent } from '@testing-library/react';

import type { SubmitErrorsMutators } from './submitErrorsMutators';
import SubmitErrorsSpy from './SubmitErrorsSpy';

describe('SubmitErrorsSpy', () => {
  afterEach(cleanup);

  test('should ignore when no changes occur', () => {
    const resetSubmitError = jest.fn(() => {});
    const resetSubmitErrors = jest.fn(() => {});

    const submitErrorsMutators: SubmitErrorsMutators = {
      resetSubmitError,
      resetSubmitErrors,
    };

    const { getByTestId } = render(
      <Form
        onSubmit={() => ({
          [FORM_ERROR]: 'error',
          text: '12',
        })}
        mutators={{ ...submitErrorsMutators }}
        subscription={{}}
        initialValues={{
          text: '1',
        }}
        render={({ handleSubmit }) => (
          <form data-testid='form' onSubmit={handleSubmit}>
            <Field name='text' data-testid='input' component='input' />
            <SubmitErrorsSpy />
          </form>
        )}
      />,
    );

    fireEvent.submit(getByTestId('form'));

    expect(resetSubmitError).toBeCalledTimes(0);
    expect(resetSubmitErrors).toBeCalledTimes(0);
  });

  test('should reset global error on any change', () => {
    const resetSubmitError = jest.fn(() => {});
    const resetSubmitErrors = jest.fn(() => {});

    const submitErrorsMutators: SubmitErrorsMutators = {
      resetSubmitError,
      resetSubmitErrors,
    };

    const { getByTestId } = render(
      <Form
        onSubmit={() => {
          return {
            [FORM_ERROR]: 'error',
          };
        }}
        mutators={{ ...submitErrorsMutators }}
        subscription={{}}
        initialValues={{
          text: '1',
        }}
        render={({ handleSubmit }) => (
          <form data-testid='form' onSubmit={handleSubmit}>
            <Field name='text' data-testid='input' component='input' />
            <SubmitErrorsSpy />
          </form>
        )}
      />,
    );

    fireEvent.submit(getByTestId('form'));

    fireEvent.change(getByTestId('input'), { target: { value: '2' } });

    expect(resetSubmitError).toHaveBeenCalled();
  });

  test('should reset on top field changes', () => {
    const resetSubmitError = jest.fn(() => {});
    // eslint-disable-next-line
    const resetSubmitErrors = jest.fn((args: [fields: string[]]) => {});

    const submitErrorsMutators: SubmitErrorsMutators = {
      resetSubmitError,
      resetSubmitErrors,
    };

    const { getByTestId } = render(
      <Form
        onSubmit={() => ({
          string: 'error',
          number: 'error',
          null: 'error',
          boolean: 'error',
        })}
        mutators={{ ...submitErrorsMutators }}
        subscription={{}}
        initialValues={{
          string: '0',
          number: 0,
          null: null,
          boolean: true,
        }}
        render={({ handleSubmit }) => (
          <form data-testid='form' onSubmit={handleSubmit}>
            <Field name='string' data-testid='string' component='input' />
            <Field name='number' data-testid='number' component='input' />
            <Field name='null' data-testid='null' component='input' />
            <Field name='boolean' data-testid='boolean' component='input' />

            <SubmitErrorsSpy />
          </form>
        )}
      />,
    );

    fireEvent.submit(getByTestId('form'));

    fireEvent.change(getByTestId('string'), { target: { value: '1' } });
    fireEvent.change(getByTestId('number'), { target: { value: 1 } });
    fireEvent.change(getByTestId('null'), { target: { value: 1 } });
    fireEvent.change(getByTestId('boolean'), { target: { value: 1 } });

    expect(resetSubmitErrors).toHaveBeenCalledTimes(4);
    expect(resetSubmitErrors.mock.calls[0][0][0][0]).toBe('string');
    expect(resetSubmitErrors.mock.calls[1][0][0][0]).toBe('number');
    expect(resetSubmitErrors.mock.calls[2][0][0][0]).toBe('null');
    expect(resetSubmitErrors.mock.calls[3][0][0][0]).toBe('boolean');
  });

  test('should reset submit error on deep field changes', () => {
    const resetSubmitError = jest.fn(() => {});
    // eslint-disable-next-line
    const resetSubmitErrors = jest.fn((args: [fields: string[]]) => {});

    const submitErrorsMutators: SubmitErrorsMutators = {
      resetSubmitError,
      resetSubmitErrors,
    };

    const { getByTestId } = render(
      <Form
        onSubmit={() => ({
          nested: {
            object: {
              value: 'error',
            },
          },
        })}
        mutators={{ ...submitErrorsMutators }}
        subscription={{}}
        initialValues={{
          nested: {
            object: {
              value: '0',
            },
          },
        }}
        render={({ handleSubmit }) => (
          <form data-testid='form' onSubmit={handleSubmit}>
            <Field
              name='nested.object.value'
              data-testid='nested'
              component='input'
            />

            <SubmitErrorsSpy />
          </form>
        )}
      />,
    );

    fireEvent.submit(getByTestId('form'));

    fireEvent.change(getByTestId('nested'), { target: { value: '1' } });

    expect(resetSubmitErrors).toHaveBeenCalled();
    expect(resetSubmitErrors.mock.calls[0][0][0][0]).toBe(
      'nested.object.value',
    );
  });

  test('should reset submit error on array field changes', () => {
    const resetSubmitError = jest.fn(() => {});
    // eslint-disable-next-line
    const resetSubmitErrors = jest.fn((args: [fields: string[]]) => {});

    const submitErrorsMutators: SubmitErrorsMutators = {
      resetSubmitError,
      resetSubmitErrors,
    };

    const { getByTestId } = render(
      <Form
        onSubmit={() => ({
          nested: {
            array: [
              {
                value: 'error',
              },
            ],
          },
        })}
        mutators={{ ...submitErrorsMutators }}
        subscription={{}}
        initialValues={{
          nested: {
            array: [
              {
                value: '0',
              },
            ],
          },
        }}
        render={({ handleSubmit }) => (
          <form data-testid='form' onSubmit={handleSubmit}>
            <Field
              name='nested.array[0].value'
              data-testid='nested'
              component='input'
            />

            <SubmitErrorsSpy />
          </form>
        )}
      />,
    );

    fireEvent.submit(getByTestId('form'));

    fireEvent.change(getByTestId('nested'), { target: { value: '1' } });

    expect(resetSubmitErrors).toHaveBeenCalled();
    expect(resetSubmitErrors.mock.calls[0][0][0][0]).toBe(
      'nested.array[0].value',
    );
  });
});
