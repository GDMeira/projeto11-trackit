import { useContext, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { UserContext } from './constants/Contexts';
import LoginPage from './Pages/LoginPage/LoginPage';
import SignInPage from './Pages/SignInPage/SignInPage';
import HabbitsPage from './Pages/HabbitsPage/HabbitsPage';
import TodaysPage from './Pages/TodaysPage/TodaysPage';
import HistoryPage from './Pages/HistoryPage/HistoryPage';
import { Pages } from './constants/routes';

function App() {
  useContext(UserContext);
  const [user, setUser] = useState(0);

  return (
    <UserContext.Provider value={{user, setUser}}>
      <BrowserRouter>
        <Routes>
          <Route path={Pages.login} element={<LoginPage />} />
          <Route path={Pages.signIn} element={<SignInPage />} />
          <Route path={Pages.habbits} element={<HabbitsPage />} />
          <Route path={Pages.today} element={<TodaysPage />} />
          <Route path={Pages.history} element={<HistoryPage />} />
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  )
}

export default App