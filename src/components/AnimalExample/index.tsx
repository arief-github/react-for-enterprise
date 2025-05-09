import { fetchDog, fetchCat } from '@/api/animalApi';
import { withAsync } from '@/helpers/withAsync';
import { useEffect, useState } from 'react';
import { IDLE, PENDING, ERROR, SUCCESS } from '@/constants/apiStatuses';
import { useApiStatus } from '@/hooks/useApiStatus';
import LazyLoader from '../LazyLoader';

const useFetchDog = () => {
  const [dog, setDog] = useState<string>();
  const {
    status: fetchDogStatus,
    setStatus: setFetchDogStatus,
    isIdle: isFetchDogStatusIdle,
    isPending: isFetchDogStatusPending,
    isError: isFetchDogStatusError,
    isSuccess: isFetchDogStatusSuccess,
  } = useApiStatus(IDLE);

  const initFetchDog = async () => {
    setFetchDogStatus(PENDING);

    const { response, error } = await withAsync(() => fetchDog());

    if (error) {
      setFetchDogStatus(ERROR);
    } else if (response) {
      setDog(response.data.message);
      setFetchDogStatus(SUCCESS);
    }
  };

  return {
    dog,
    initFetchDog,
    fetchDogStatus,
    isFetchDogStatusIdle,
    isFetchDogStatusError,
    isFetchDogStatusPending,
    isFetchDogStatusSuccess,
  };
};

const useFetchCat = () => {
  const [cat, setCat] = useState<string>();
  const {
    status: fetchCatStatus,
    setStatus: setFetchCatStatus,
    isIdle: isFetchCatIdle,
    isPending: isFetchCatPending,
    isError: isFetchCatError,
    isSuccess: isFetchCatSuccess,
  } = useApiStatus(IDLE);

  const initFetchCat = async () => {
    setFetchCatStatus(PENDING);

    const { response, error } = await withAsync(() => fetchCat());

    if (error) {
      setFetchCatStatus(ERROR);
    } else if (response) {
      setCat(response.data[0].url);
      setFetchCatStatus(SUCCESS);
    }
  };

  return {
    cat,
    fetchCatStatus,
    initFetchCat,
    isFetchCatIdle,
    isFetchCatPending,
    isFetchCatError,
    isFetchCatSuccess,
  };
};

function AnimalExample() {
  const {
    dog,
    initFetchDog,
    isFetchDogStatusIdle,
    isFetchDogStatusPending,
    isFetchDogStatusError,
    isFetchDogStatusSuccess,
  } = useFetchDog();
  const {
    cat,
    initFetchCat,
    isFetchCatPending,
    isFetchCatIdle,
    isFetchCatError,
    isFetchCatSuccess,
  } = useFetchCat();

  useEffect(() => {
    initFetchDog();
    initFetchCat();
  }, []);

  return (
    <div className='my-8 mx-auto max-w-2xl'>
      <div className='flex gap-8'>
        <div className='w-64 h-64'>
          {isFetchCatIdle || isFetchDogStatusIdle ? <p>Welcome!...</p> : null}

          {isFetchCatPending || isFetchDogStatusPending ? (
            <LazyLoader
              show={isFetchCatPending || isFetchDogStatusPending}
              delay={400}
            />
          ) : null}
          {isFetchCatError || isFetchDogStatusError ? (
            <p>There was a problem</p>
          ) : null}
        </div>

        <div className='w-1/2'>
          {isFetchCatSuccess ? (
            <img className='h-64 w-full object-cover' src={cat} alt='Cat' />
          ) : null}
        </div>
        <div className='w-1/2'>
          {isFetchDogStatusSuccess ? (
            <img className='h-64 w-full object-cover' src={dog} alt='Dog' />
          ) : null}
        </div>
      </div>

      <button
        onClick={initFetchCat}
        className='mt-4 bg-blue-800 text-blue-100 p-4 mr-3'
      >
        Fetch Cat
      </button>
      <button
        onClick={initFetchDog}
        className='mt-4 bg-blue-800 text-blue-100 p-4'
      >
        Fetch Dog
      </button>
    </div>
  );
}

export default AnimalExample;
