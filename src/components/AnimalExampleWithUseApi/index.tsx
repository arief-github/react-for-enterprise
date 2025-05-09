import { fetchDog, fetchCat } from '@/api/animalApi';
import { useEffect } from 'react';
import LazyLoader from '../LazyLoader';
import { useApi } from '@/hooks/useApi';

const useFetchDog = () => {
  const {
    data: dog,
    setData: setDog,
    exec: initFetchDog,
    status: fetchDogStatus,
    setStatus: setFetchDogStatus,
    isIdle: isFetchDogStatusIdle,
    isPending: isFetchDogStatusPending,
    isError: isFetchDogStatusError,
    isSuccess: isFetchDogStatusSuccess,
  } = useApi(() => fetchDog().then((response) => response.data.message));

  return {
    dog,
    setDog,
    initFetchDog,
    setFetchDogStatus,
    fetchDogStatus,
    isFetchDogStatusIdle,
    isFetchDogStatusError,
    isFetchDogStatusPending,
    isFetchDogStatusSuccess,
  };
};

const useFetchCat = () => {
  const {
    data: cat,
    setData: setCat,
    exec: initFetchCat,
    status: fetchCatStatus,
    setStatus: setFetchCatStatus,
    isIdle: isFetchCatIdle,
    isPending: isFetchCatPending,
    isError: isFetchCatError,
    isSuccess: isFetchCatSuccess,
  } = useApi(() => fetchCat().then((response) => response.data[0].url));

  return {
    cat,
    setCat,
    setFetchCatStatus,
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
