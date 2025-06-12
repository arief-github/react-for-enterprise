import './App.css';
import Accordion from './components/accordion/Accordion';
import ToggleButton from './components/toggle/Toggle';

const items = [
  {
    heading: 'Heading one',
    content: 'Content one',
  },
  {
    heading: 'Heading two',
    content: 'Content two',
  },
  {
    heading: 'Heading three',
    content: 'Content three',
  },
];

function App() {
  return (
    <div className='App mx-auto max-w-6xl text-center my-8'>
      <ToggleButton />
      <div className='mb-3'></div>
      <Accordion items={items} />
    </div>
  );
}

export default App;
