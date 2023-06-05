import { useContext, useState } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import { HabbitsContext, UserContext } from './constants/Contexts';
import LoginPage from './Pages/LoginPage/LoginPage';
import SignInPage from './Pages/SignInPage/SignInPage';
import HabbitsPage from './Pages/HabbitsPage/HabbitsPage';
import TodaysPage from './Pages/TodaysPage/TodaysPage';
import HistoryPage from './Pages/HistoryPage/HistoryPage';
import { Pages } from './constants/routes';

function App() {
  useContext(UserContext);
  useContext(HabbitsContext);

  const [user, setUser] = useState(0);
  const [todaysHabbits, setTodaysHabbits] = useState([]);
  const [allHabbits, setAllHabbits] = useState([]);

  const redirectToPrimeiraPagina = () => {
    navigate(Pages.login);
  };

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <HabbitsContext.Provider value={{ todaysHabbits, setTodaysHabbits, allHabbits, setAllHabbits }}>
        <BrowserRouter>
          <Routes>
            <Route path={Pages.login} element={<LoginPage />} />
            <Route path={Pages.signIn} element={<SignInPage />} />
            <Route path={Pages.habbits} element={<HabbitsPage />} />
            <Route path={Pages.today} element={<TodaysPage />} />
            <Route path={Pages.history} element={<HistoryPage />} />
          </Routes>
        </BrowserRouter>
      </HabbitsContext.Provider>
    </UserContext.Provider>
  )
}

export default App