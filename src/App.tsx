import { Route, Routes, Link } from "react-router-dom";
import Login from "./pages/Login/Login";
import "./App.css";
import NotFound from "./pages/NotFound/NotFound";
import { BookRoutes } from "./routes/CharacterRoutes";

export function App() {
  return (
    <>
      <div className="App">
        <nav>
          <ul className="flex space-x-4 p-4 bg-yellow-500">
            <li>
              <Link to="/">Login</Link>
            </li>
            <li>
              <Link to="/characters">Characters</Link>
            </li>
            <li>
              <Link to="/characters/new-character">New Character</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/characters/*" element={<BookRoutes />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </>
  );
}
