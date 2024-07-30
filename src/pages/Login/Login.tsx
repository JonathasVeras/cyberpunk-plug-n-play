import React, { FormEvent } from "react";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent) => {
    alert("Login sucessfull");
    e.preventDefault();
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
          onSubmit={(e) => {
            handleSubmit(e);
          }}
          className="
            flex flex-col p-4 rounded-lg 
            space-y-4 text-white bg-black/50
          "
        >
          <div className="flex flex-col space-y-4 items-center text-center">
            <div className="flex flex-col m-2">
              <label>Username</label>
              <input className="border-2 p-2 rounded-lg" type="text" />
            </div>
            <div className="flex flex-col">
              <label>Password</label>
              <input className="border-2 p-2 rounded-lg" type="password" />
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
