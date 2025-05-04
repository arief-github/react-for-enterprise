import { fetchDog, fetchCat } from '@/api/animalApi';
import { useEffect, useState } from 'react';

type ApiStatus = 'IDLE' | 'PENDING' | 'SUCCESS' | 'ERROR';

const useFetchDog = () => {
  const [dog, setDog] = useState<string>();
  const [fetchDogStatus, setFetchDogStatus] = useState<ApiStatus>('IDLE');

  const initFetchDog = async () => {
    try {
      setFetchDogStatus('PENDING');
      const response = await fetchDog();
      setDog(response.data.message);
      setFetchDogStatus('SUCCESS');
    } catch (e) {
      setFetchDogStatus('ERROR');
    }
  };

  return {
    dog,
    initFetchDog,
    fetchDogStatus,
  };
};

const useFetchCat = () => {
  const [cat, setCat] = useState<string>();
  const [fetchCatStatus, setFetchCatStatus] = useState<ApiStatus>('IDLE');

  const initFetchCat = async () => {
    try {
      setFetchCatStatus('PENDING');
      const response = await fetchCat();
      setCat(response.data?.[0].url);
      setFetchCatStatus('SUCCESS');
    } catch (e) {
      setFetchCatStatus('ERROR');
    }
  };

  return {
    cat,
    fetchCatStatus,
    initFetchCat,
  };
};

// const useFetchAnimals = () => {
//   const { dog, initFetchDog } = useFetchDog();
//   const { cat, initFetchCat } = useFetchCat();

//   const fetchAnimals = () => {
//     initFetchDog();
//     initFetchCat();
//   };

//   useEffect(() => {
//     fetchAnimals();
//   }, []);

//   return {
//     dog,
//     cat,
//     fetchAnimals,
//   };
// };

function AnimalExample() {
  const { dog, fetchDogStatus, initFetchDog } = useFetchDog();
  const { cat, fetchCatStatus, initFetchCat } = useFetchCat();

  useEffect(() => {
    initFetchDog();
    initFetchCat();
  }, []);

  return (
    <div className='my-8 mx-auto max-w-2xl'>
      <div className='flex gap-8'>
        <div className='w-64 h-64'>
          {(fetchCatStatus || fetchDogStatus) === 'IDLE' ? (
            <p>Welcome!...</p>
          ) : null}
          {(fetchCatStatus || fetchDogStatus) === 'PENDING' ? (
            <p>Loading Data...</p>
          ) : null}
          {(fetchCatStatus || fetchDogStatus) === 'ERROR' ? (
            <p>There was a problem</p>
          ) : null}
        </div>

        <div className='w-1/2'>
          {fetchCatStatus === 'SUCCESS' ? (
            <img className='h-64 w-full object-cover' src={cat} alt='Cat' />
          ) : null}
        </div>
        <div className='w-1/2'>
          {fetchDogStatus === 'SUCCESS' ? (
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
