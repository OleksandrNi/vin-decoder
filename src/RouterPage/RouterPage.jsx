import { Route, Routes, } from 'react-router-dom';

import { FindVehicle } from '../Pages/HomePage/HomePage';
import { NotFoundPage } from '../Pages/NotFoundPage/NotFoundPage';
import { Variables } from '../Pages/Variables/Variables';
import { VariableId } from '../Pages/VariableId/VariableId';

function RouterPage() {
  
  return (
    <Routes>
      <Route path='/' exact element={<FindVehicle />} />
      <Route path='/variables' element={<Variables />} />
      <Route path='/variables/:variablesId' element={<VariableId />} />
      <Route path='*' element={<NotFoundPage />} />
    </Routes>
  );
}

export default RouterPage;