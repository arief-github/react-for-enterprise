import './App.css';
import PostForm from './components/PostForm/PostForm';

function App() {
  return (
    <div className='App mx-auto max-w-6xl text-center my-8'>
      <h1 className='font-semibold text-2xl'>Post Form</h1>
      <PostForm />
    </div>
  );
}

export default App;
