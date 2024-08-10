import React, { useEffect } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import { ICharacterSheet } from '../../../interfaces/characterSheet';

// const characterSheet: ICharacterSheet = {
//   background: "media",
//   attributes: {
//     acceptance: 2,
//     agility: 8,
//     selfControl: 2,
//     blocking: 2,
//     fighting: 2,
//     body: 8,
//     destiny: 2,
//     dexterity: 2,
//     empathy: 2,
//     dodge: 2,
//     faith: 2,
//     focus: 2,
//     strength: 8,
//     humanity: 2,
//     intelligence: 2,
//     intimidation: 2,
//     hacking: 2,
//     leadership: 2,
//     narrative: 2,
//     protection: 2,
//     endurance: 8,
//     wisdom: 2,
//     seduction: 2,
//     luck: 2,
//   },
//   difficultTerrainMovement: 8,
//   run: 16,
//   woundedAndOverloaded: 4,
//   userId: "-O2RF-ZooC3Yf_vLCOWh",
//   age: "40",
//   identity: 26,
//   movement: 4,
//   name: "Datena",
//   passivePerception: 2,
//   maxWeight: 84,
//   tokenHealthPoints: 160,
//   damageReduction: 4,
//   maxSanity: 4,
//   gender: "M",
//   baseSpeed: 5,
//   maxHealth: 16,
// };


const Characters: React.FC = () => {
  const { isOnline, isAuthenticated } = useAuth();

  useEffect(() => {
    // Checar se o usuário está offline ou online
    // Tentar pegar todas as fichas LocalStorage ou online
    if (isAuthenticated) {
      console.log(isAuthenticated && isOnline)
      // lógica para pegar fichas online
    } else{
      console.log('Are ooffline')
      // lógica para pegar fichas offline
    }
  }, [isAuthenticated, isOnline]);

  return (
    <div className="bg-[url('../wallpapers/characters-list-wp.png')] bg-cover bg-center bg-fixed min-h-screen">
      <div className="flex">
        <h1 className="text-[3rem] bg-black/50 text-gray-300 p-2 m-2 w-[300px] text-center rounded-lg">
          Characters
        </h1>
      </div>
    </div>
  );
};

export default Characters;
