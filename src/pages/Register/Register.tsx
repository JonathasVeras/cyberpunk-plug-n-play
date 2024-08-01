import React, { FormEvent } from "react";
import { useNavigate } from "react-router-dom";

const Register: React.FC = () => {
  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent) => {
    alert("User created");
    e.preventDefault();
  };

  return (
    <div
      className="
    bg-[url('../public/wallpapers/register-wp.png')] 
    bg-cover bg-center bg-fixed min-h-screen
  "
    >
      <div className="min-h-[90vh] flex flex-col justify-center items-center">
        <form
          className="flex flex-col space-y-4 text-white bg-black/50 p-4"
          onSubmit={(e) => {
            handleSubmit(e);
          }}
        >
          <h1 className="text-xl font-semibold text-center my-4">
            Create User
          </h1>
          <div className="flex flex-col space-y-4 items-center text-center">
            <div className="flex flex-col m-2">
              <label>Username</label>
              <input className="border-2 p-2" type="text" />
            </div>
            <div className="flex flex-col">
              <label>Password</label>
              <input className="border-2 p-2" type="password" />
            </div>
            <div className="flex flex-col">
              <label>Repeat Password</label>
              <input className="border-2 p-2" type="password" />
            </div>
          </div>
          <div className="flex justify-center m-2 space-x-4 font-semibold">
            <button
              className="p-2 rounded-lg bg-yellow-500 text-white"
              type="submit"
            >
              <p>Create user</p>
            </button>
            <button
              className="p-2 rounded-lg bg-yellow-500 text-white"
              type="button"
              onClick={() => {
                navigate("/");
              }}
            >
              <p>Return to login</p>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
