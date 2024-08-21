import React, { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginAPI } from '../../services/loginAPI';
import GenericModal from '../../components/GenericModal/GenericModal';
import { useAuth } from '../../contexts/AuthContext';

const characterSheet: any = {
  background: "media",
  attributes: {
    acceptance: 2,
    agility: 8,
    selfControl: 2,
    blocking: 2,
    fighting: 2,
    body: 8,
    destiny: 2,
    dexterity: 2,
    empathy: 2,
    dodge: 2,
    faith: 2,
    focus: 2,
    strength: 8,
    humanity: 2,
    intelligence: 2,
    intimidation: 2,
    hacking: 2,
    leadership: 2,
    narrative: 2,
    protection: 2,
    endurance: 8,
    wisdom: 2,
    seduction: 2,
    luck: 2,
  },
  difficultTerrainMovement: 8,
  run: 16,
  woundedAndOverloaded: 4,
  userId: "-O2RF-ZooC3Yf_vLCOWh",
  age: "40",
  identity: 26,
  movement: 4,
  name: "Datena",
  passivePerception: 2,
  maxWeight: 84,
  tokenHealthPoints: 160,
  damageReduction: 4,
  maxSanity: 4,
  gender: "M",
  baseSpeed: 5,
  maxHealth: 16,
  weapons: [],
  cyberware: [],
};

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { setIsAuthenticated, setIsOnline } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [warningModal, setWarningModal] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const response: any = await loginAPI(username, password);
    if (response) {
      setIsAuthenticated(true);
      setIsOnline(true);
      navigate('/characters');
    } else {
      alert('name or password is incorrect. Try again.');
    }
  };

  const logOffline = () => {
    setIsOnline(false);
    setIsAuthenticated(false);

    const storedSheets = localStorage.getItem('CharacterSheetsOffline');
    const sheetsList = storedSheets ? JSON.parse(storedSheets) : [];

    sheetsList.push(characterSheet);

    localStorage.setItem('CharacterSheetsOffline', JSON.stringify(sheetsList));

    navigate('/characters');
  };

  return (
    <div className="bg-[url('../wallpapers/login-register-wp.png')] bg-cover bg-center bg-fixed min-h-screen">
      <div className="min-h-[90vh] flex flex-col justify-center items-center">
        <form onSubmit={handleSubmit} className="flex flex-col p-4 rounded-lg space-y-4 text-white bg-black/50">
          <div className="flex flex-col space-y-4 items-center text-center">
            <div className="flex flex-col m-2">
              <label>Username</label>
              <input
                className="border-2 p-2 rounded-lg text-white bg-gray-800"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="flex flex-col">
              <label>Password</label>
              <input
                className="border-2 p-2 rounded-lg text-white bg-gray-800"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <div className="flex justify-center m-2 space-x-4 font-semibold">
            <button className="p-2 rounded-lg bg-yellow-500 text-white" type="submit">
              <p>Login</p>
            </button>
            <button className="p-2 rounded-lg bg-yellow-500 text-white font-semibold" type="button" onClick={() => navigate('/register')}>
              <p>Register</p>
            </button>
          </div>
          <button
            className="p-2 rounded-lg bg-yellow-500 text-white font-semibold"
            type="button"
            onClick={() => setWarningModal(true)}
          >
            <p>Enter Anonymously</p>
          </button>
        </form>
      </div>
      <GenericModal isOpen={warningModal} onRequestClose={() => { }}>
        <div className="bg-black text-white flex flex-col space-y-4 items-center justify-center">
          <p className="w-[200px] lg:w-[300px]">
            When you enter anonymously, your tokens will only be saved in your browser, with the ability to export or import them via JSON. However, there is no option to save them in the cloud.
          </p>
          <div className="flex flex-col lg:flex-row space-y-2 lg:space-y-0 lg:space-x-2">
            <button
              className="text-white bg-yellow-500 p-2 rounded-xl"
              onClick={() => {
                setWarningModal(false);
                logOffline();
              }}
            >
              Okay
            </button>
            <button
              className="text-white bg-yellow-500 p-2 rounded-xl"
              onClick={() => setWarningModal(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      </GenericModal>
    </div>
  );
};

export default Login;
