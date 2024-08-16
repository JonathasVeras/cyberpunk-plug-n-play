import { Route, Routes, Link, useLocation } from 'react-router-dom';
import Login from './pages/Login/Login';
import './App.css';
import NotFound from './pages/NotFound/NotFound';
import { CharacterRoutes } from './routes/CharacterRoutes';
import Register from './pages/Register/Register';
import { AuthProvider } from './contexts/AuthContext';
import { WeaponsRoutes } from './routes/WeaponsRoutes';

export function App() {
  const location = useLocation();

  return (
    <AuthProvider>
      <div className="App">
        {location.pathname !== '/' && location.pathname !== '/register' && (
          <nav>
            <ul className="flex space-x-4 p-4 bg-yellow-500">
              <li>
                <Link to="/">Login</Link>
              </li>
              <li>
                <Link to="/characters">Characters</Link>
              </li>
              <li>
                <Link to="/weapons">Weapons</Link>
              </li>
              <li>
                <Link to="/characters/new-character">New Character</Link>
              </li>
            </ul>
          </nav>
        )}
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
