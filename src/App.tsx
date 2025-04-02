import { Suspense, lazy } from 'react';
import './App.css';

import { Link, Route, Routes } from 'react-router-dom';
import Spinner from '@/components/Spinner';

const About = lazy(() => import('./views/About'));
const Home = lazy(() => import('./views/Home'));
const Contact = lazy(() => import('./views/Contact'));

function App() {
  return (
    <div className='App mx-auto max-w-6xl text-center my-8'>
      <div className='my-8'>
        <nav className='space-x-4'>
          <Link to='/'>Home</Link>
          <Link to='/about'>About</Link>
          <Link to='/contact'>Contact</Link>
        </nav>
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
