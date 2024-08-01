import React, { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginAPI } from "../../services/loginAPI";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const response: any = await loginAPI(username, password);
    if (response) {
      localStorage.setItem(
        "perfilAtual",
        JSON.stringify({ nome: response.nome, id: response.id })
      );
      navigate("/characters");
    } else {
      alert("Nome ou senha incorretos. Tente novamente.");
    }
  };

  return (
    <div
      className="
      bg-[url('../public/wallpapers/login-register-wp.png')] 
      bg-cover bg-center bg-fixed min-h-screen
    "
    >
      <div className="min-h-[90vh] flex flex-col justify-center items-center">
        <form
          onSubmit={handleSubmit}
          className="
            flex flex-col p-4 rounded-lg 
            space-y-4 text-white bg-black/50
          "
        >
          <div className="flex flex-col space-y-4 items-center text-center">
            <div className="flex flex-col m-2">
              <label>Username</label>
              <input
                className="border-2 p-2 rounded-lg text-black"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="flex flex-col">
              <label>Password</label>
              <input
                className="border-2 p-2 rounded-lg text-black"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <div className="flex justify-center m-2 space-x-4 font-semibold">
            <button
              className="p-2 rounded-lg bg-yellow-500 text-white"
              type="submit"
            >
              <p>Login</p>
            </button>
            <button
              className="p-2 rounded-lg bg-yellow-500 text-white"
              type="button"
              onClick={() => {
                navigate("/register");
              }}
            >
              <p>Register</p>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
