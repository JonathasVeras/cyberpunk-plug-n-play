import { Route, Routes, Link, useLocation } from 'react-router-dom';
import Login from './pages/Login/Login';
import './App.css';
import NotFound from './pages/NotFound/NotFound';
import { CharacterRoutes } from './routes/CharacterRoutes';
import Register from './pages/Register/Register';
import { AuthProvider } from './contexts/AuthContext';
import { WeaponsRoutes } from './routes/WeaponsRoutes';
import cyberlogo from '../public/cyberlogo.png'

export function App() {
  const location = useLocation();

  // Função para renderizar links da Navbar com base na rota atual
  const renderNavLinks = () => {
    if (location.pathname === '/') {
      return null;
    } else if (location.pathname.startsWith('/characters')) {
      return (
        <div className='sm:flex space-x-4 p-4 bg-yellow-punk'>
          <img src={cyberlogo} className='w-[200px]'></img>
          <ul className="sm:flex space-x-4 p-4 sm:text-lg font-semibold">
            <li className='sm:hover:text-xl'>
              <Link to="/characters">Characters</Link>
            </li>
            <li className='sm:hover:text-xl'>
              <Link to="/weapons">Weapons</Link>
            </li>
            <li className='sm:hover:text-xl'>
              <Link to="/characters/new-character">New Character</Link>
            </li>
            <li className='sm:hover:text-xl'>
              <Link to="/">Logout</Link>
            </li>
          </ul></div>

      );
    } else if (location.pathname.startsWith('/weapons')) {
      return (
        <div className='sm:flex space-x-4 p-4 bg-yellow-punk'>
          <img src={cyberlogo} className='w-[200px]'></img>
          <ul className="sm:flex space-x-4 p-4 sm:text-lg font-semibold">
            <li className='sm:hover:text-xl'>
              <Link to="/characters">Characters</Link>
            </li>
            <li className='sm:hover:text-xl'>
              <Link to="/weapons">Weapons</Link>
            </li>
            <li className='sm:hover:text-xl'>
              <Link to="/">Logout</Link>
            </li>
          </ul>
        </div>
      );
    } else {
      return null;
    }
  };

  return (
    <AuthProvider>
      <div className="App">
        {renderNavLinks()}
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/characters/*" element={<CharacterRoutes />} />
          <Route path="/weapons/*" element={<WeaponsRoutes />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </AuthProvider>
  );
}
