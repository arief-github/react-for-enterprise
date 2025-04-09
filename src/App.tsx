import { faker } from '@faker-js/faker';
import {
  Suspense,
  lazy,
  useState,
  useEffect,
  useRef,
  useCallback,
} from 'react';
import { useVirtual } from 'react-virtual';
import './App.css';

import { Link, Route, Routes } from 'react-router-dom';
import Spinner from '@/components/Spinner';

type User = {
  id: number;
  name: string;
  surname: string;
  email: string;
};

const About = lazy(() => import('./views/About'));
const Home = lazy(() => import('./views/Home'));
const Contact = lazy(() => import('./views/Contact'));

function App() {
  const [items, setItems] = useState<User[]>([]);
  const parentRef = useRef<HTMLDivElement>(null);

  const rowVirtualizer = useVirtual({
    size: items.length,
    parentRef,
    estimateSize: useCallback(() => 35, []),
    overscan: 5,
  });

  useEffect(() => {
    const users = [];

    for (let i = 0; i < 10000; i++) {
      users.push({
        id: i,
        name: faker.name.firstName(),
        surname: faker.name.lastName(),
        email: faker.internet.email(),
      });

      setItems(users);
      console.log('Data Ready');
    }
  }, []);

  return (
    <div className='App mx-auto max-w-6xl text-center my-8'>
      <div className='my-8'>
        <nav className='space-x-4'>
          <Link to='/'>Home</Link>
          <Link to='/about'>About</Link>
          <Link to='/contact'>Contact</Link>
        </nav>
      </div>

      <div
        ref={parentRef}
        className='h-64 w-2/3 mx-auto overflow-y-auto mt-16 flex justify-center text-left'
      >
        <div className='w-full relative'>
          <div className='flex gap-6 mb-3 font-semibold'>
            <span className='w-8'>ID</span>
            <span className='w-24'>Name</span>
            <span className='w-24'>Surname</span>
            <span className='w-24'>Email</span>
          </div>
          <div
            className='relative'
            style={{
              height: `${rowVirtualizer.totalSize}px`,
            }}
          >
            {rowVirtualizer.virtualItems.map((virtualRow) => {
              const item = items[virtualRow.index];
              return (
                <div
                  key={virtualRow.index}
                  className='flex gap-6'
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: `${virtualRow.size}px`,
                    transform: `translateY(${virtualRow.start}px)`,
                  }}
                >
                  <span className='w-8'>{item.id}</span>
                  <span className='w-24'>{item.name}</span>
                  <span className='w-24'>{item.surname}</span>
                  <span className='w-24'>{item.email}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <Suspense
        fallback={
          <div className='flex justify-center'>
            <Spinner show delay={500} />
          </div>
        }
      >
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/contact' element={<Contact />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
