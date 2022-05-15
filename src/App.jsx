import { onAuthStateChanged } from 'firebase/auth';
import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { Footer, Navbar } from './components';
import { useAuth } from './context/auth-context/Context';
import { Authenticate, Error, Home } from './pages';
import { Lists } from './pages/Lists/Lists';
import { SingleList } from './pages/SingleList/SingleList';
import { RedirectAuth } from './router/RedirectAuth';
import { RequireAuth } from './router/RequireAuth';
import { auth } from './utils/firebase-config';

function App() {
  const { isLoggedIn, setIsLoggedIn } = useAuth();

  React.useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        localStorage.setItem('loggedIn', true);
        setIsLoggedIn(true);
      } else {
        localStorage.setItem('loggedIn', false);
        setIsLoggedIn(false);
      }
    });

    return () => unsub;
  }, [isLoggedIn]);
  const location = useLocation();
  const routeCheck = location.pathname.includes('/list/');
  return (
    <>
      {isLoggedIn && !routeCheck && <Navbar />}
      <Routes>
        <Route path='*' element={<Error />} />
        <Route path='/' element={<Home />} />
        <Route element={<RedirectAuth />}>
          <Route path='/authenticate' element={<Authenticate />} />
        </Route>

        <Route element={<RequireAuth />}>
          <Route path='/lists' element={<Lists />} />
          <Route path='/list/:id' element={<SingleList />} />
        </Route>
      </Routes>
      <Footer />
    </>
  );
}

export default App;
