import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { Header } from './components';
import { Dashboard, Login, Register } from './pages';

export const App = () => {
  return (
    <>
      <Router>
        <div className='container'>
          <Header />
          <Routes>
            <Route exact path='/' element={<Dashboard />} />
            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
