import './App.css';
import CompositionAlert from './components/composition-configuration/Alert/CompositionAlert';
import AuthLayout from './layout/AuthLayout';
import DashboardLayout from './layout/dashboardLayout';
import {
  Dashboard,
  Login,
  Register,
  Welcome,
  Settings,
  Profile,
} from './views';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

function App() {
  return (
    <div className='App mx-auto max-w-6xl text-center my-8'>
      <Router>
        <CompositionAlert />
        <nav className='my-8 space-x-4'>
          <Link to='/'>Dashboard</Link>
          <Link to='/login'>Login</Link>
          <Link to='/register'>Register</Link>
        </nav>
        <div>
          <Routes>
            <Route element={<DashboardLayout />}>
              <Route path='/' element={<Dashboard />}>
                <Route index element={<Welcome />} />
                <Route path='/settings' element={<Settings />} />
                <Route path='/profile' element={<Profile />} />
              </Route>
            </Route>

            <Route element={<AuthLayout />}>
              <Route path='/login' element={<Login />} />
              <Route path='/register' element={<Register />} />
            </Route>
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
