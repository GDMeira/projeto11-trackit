import { useContext, useState } from 'react';
import { BrowserRouter, Router, Route } from 'react-router-dom';
import { UserContext } from './constants/Contexts';
import LoginPage from './Pages/LoginPage/LoginPage';
import SignPage from './Pages/SignPage/SignPage';
import HabbitsPage from './Pages/HabbitsPage/HabbitsPage';
import TodaysPage from './Pages/TodaysPage/TodaysPage';
import HistoryPage from './Pages/HistoryPage/HistoryPage';

function App() {
  useContext(UserContext);
  const user = {
    name: '',
    token: '',
    seila: ''
  };

  return (
    <UserContext.Provider value={user}>
      <BrowserRouter>
        <Router>
          <Route path='/' element={<LoginPage />} />
          <Route path='/cadastro' element={<SignPage />} />
          <Route path='/habitos' element={<HabbitsPage />} />
          <Route path='/hoje' element={<TodaysPage />} />
          <Route path='/historico' element={<HistoryPage />} />
        </Router>
      </BrowserRouter>
    </UserContext.Provider>
  )
}

export default App
