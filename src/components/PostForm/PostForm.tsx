import React, { useState } from 'react';

const PostForm = () => {
  type PostForm = {
    title: string;
    body: string;
  };

  type ApiStatus = 'IDLE' | 'PENDING' | 'SUCCESS' | 'ERROR';

  const [form, setForm] = useState<PostForm>({ title: '', body: '' });
  const [postFormApiStatus, setPostFormApiStatus] = useState<ApiStatus>('IDLE');
  const [error, setError] = useState<string>('');

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setForm((state) => ({
      ...state,
      [name]: value,
    }));

    error && setError('');
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (postFormApiStatus === 'PENDING') return;
    setPostFormApiStatus('PENDING');

    if (!form.title || !form.body) {
      setError('Please fill in all the fields.');
      return;
    }

    try {
      const response = await fetch(
        'https://jsonplaceholder.typicode.com/posts',
        {
          method: 'POST',
          body: JSON.stringify(form),
        }
      );

      if (response.ok) {
        setPostFormApiStatus('SUCCESS');
        return;
      }

      throw new Error(
        'There was a problem while publish post, please try again!'
      );
    } catch (error) {
      setError('There was a problem, please try again');

      setPostFormApiStatus('ERROR');
    }
  };

  return (
    <>
      <h2 className='mb-6 text-xl font-semibold'>Publish Post</h2>
      {postFormApiStatus === 'SUCCESS' ? (
        <div>Post Was Success to Publish</div>
      ) : null}

      <form onSubmit={onSubmit}>
        <fieldset className='mb-4 flex flex-col space-y-2 items-start'>
          <label htmlFor='name'>Title</label>
          <input
            className='w-full'
            type='text'
            id='title'
            name='title'
            value={form.title}
            onChange={onChange}
            data-testid='titleInput'
          />
        </fieldset>
        <fieldset className='mb-4 flex flex-col space-y-2 items-start'>
          <label htmlFor='name'>Body</label>
          <input
            className='w-full'
            type='text'
            id='body'
            name='body'
            value={form.body}
            onChange={onChange}
            data-testid='bodyInput'
          />
        </fieldset>

        {postFormApiStatus === 'ERROR' || error ? (
          <p className='text-red-700 mb-4'>{error}</p>
        ) : null}

        <button
          className='px-4 py-3 bg-blue-700 text-blue-100 min-w-[5rem] font-semibold'
          disabled={postFormApiStatus === 'PENDING'}
          type='submit'
        >
          {postFormApiStatus === 'PENDING' ? 'Publish...' : 'Send'}
        </button>
      </form>
    </>
  );
};

export default PostForm;
