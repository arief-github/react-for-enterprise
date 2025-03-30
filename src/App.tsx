import './App.css';
import GlobalSpinnerExample from '@/components/GlobalSpinner/GlobalSpinnerExample';
import { GlobalSpinnerContextProvider } from '@/context/GlobalSpinnerContext';

// import BussinessCard from '@/components/BussinessCard/BussinessCard';

// function BussinesCardWrapper() {
//     return (
//         <div className='App mx-auto max-w-6xl text-center my-8'>
//             <h1 className='font-semibold text-2xl'>Bussiness Form</h1>
//             <BussinessCard />
//         </div>
//     )
// }

function App() {
  return (
    <GlobalSpinnerContextProvider>
      <div className='App mx-auto max-w-6xl text-center my-8'>
        <h1 className='font-semibold text-2xl'>Tombol Spinner</h1>
      </div>
      <GlobalSpinnerExample />
    </GlobalSpinnerContextProvider>
  );
}

export default App;
