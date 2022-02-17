import { BrowserRouter } from 'react-router-dom';

import { Routing } from './routing';

export const App = () => {
  return (
    <BrowserRouter>
      <div className='container'>
        <Routing />
      </div>
    </BrowserRouter>
  );
}

export default App;
