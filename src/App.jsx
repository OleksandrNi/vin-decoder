import './App.scss';
import { FindVehicle } from './components/FindVehicles/FindVehicle';
import { Route, Routes, } from 'react-router-dom';
import { NotFoundPage } from './components/NotFoundPage/NotFoundPage';
import { Header } from './components/Header/Header';
import { Variables } from './components/Variables/Variables';
import { VariableId } from './components/VariableId/VariableId';

function App() {
  
  return (
    <div className='container'>
    <Header />

    <Routes>
      <Route path='/' exact element={<FindVehicle />} />
      <Route path='/variables' element={<Variables />} />
      <Route path='/variables/:variablesId' element={<VariableId />} />
      <Route path='*' element={<NotFoundPage />} />
    </Routes>
  </div>
  );
}

export default App;
