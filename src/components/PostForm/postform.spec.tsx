import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import { fireEvent, render } from '../../helpers/test-utils';
import PostForm from './PostForm';
import { afterAll, afterEach, beforeAll, describe, it } from 'vitest';
import { screen, waitFor } from '@testing-library/react';

const POST_URL = 'https://jsonplaceholder.typicode.com/posts';

const handlers = [
  http.post(POST_URL, ({ request }) => {
    const body = request.json();
    return HttpResponse.json({ status: 'success', body });
  }),
];

const server = setupServer(...handlers);

// establish API mocking before all tests
beforeAll(() => server.listen());

// reset any request handlers that are declared as a part of our tests
afterEach(() => server.resetHandlers());

// cleanup once the tests are done
afterAll(() => server.close());

const renderPostForm = () => {
  const utils = render(<PostForm />);
  const titleInput = utils.getByTestId('titleInput');
  const bodyInput = utils.getByTestId('bodyInput');
  const submitBtn = utils.getByText('Send');

  return {
    titleInput,
    bodyInput,
    submitBtn,
    ...utils,
  };
};

describe('PostForm.tsx', () => {
  it('should show an error message if submitting without filling all the fields', async () => {
    const { submitBtn } = renderPostForm();
    fireEvent.click(submitBtn);
    screen.getByText('Please fill in all the fields.');
  });
  it('should show a success message when the user publish the post', async () => {
    const { titleInput, bodyInput, submitBtn } = renderPostForm();

    fireEvent.change(titleInput, {
      target: {
        value: 'Hal Ini menyebabkan',
      },
    });

    fireEvent.change(bodyInput, {
      target: {
        value: 'On-boarding where so close on you',
      },
    });

    fireEvent.click(submitBtn);

    await waitFor(() => screen.getByText('Publish...'));
    await waitFor(() => screen.getByText('Post Was Success to Publish'));
  });

  it('should show an error if post publish has been fail', async () => {
    server.use(
      http.post(POST_URL, () => {
        return HttpResponse('There was a problem, please try again', {
          status: 500,
        });
      })
    );

    const { titleInput, bodyInput, submitBtn } = renderPostForm();

    fireEvent.change(titleInput, {
      target: {
        value: 'New Comer',
      },
    });

    fireEvent.change(bodyInput, {
      target: {
        value: 'This is newer game for chalks',
      },
    });

    fireEvent.click(submitBtn);

    await waitFor(() => screen.getByText('Publish...'));
    await waitFor(() =>
      screen.getByText('There was a problem, please try again')
    );
  });
});
