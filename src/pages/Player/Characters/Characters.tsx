import React, { useEffect, useState } from "react";
import { useAuth } from "../../../contexts/AuthContext";
import { ICharacterSheet } from "../../../interfaces/characterSheet";

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

interface CharacterDetails {
  age: number;
}

interface CharacterData {
  [key: string]: CharacterDetails;
}
interface SimpleCharacter {
  name: string;
  age: number;
}

const Characters: React.FC = () => {
  const { isAuthenticated, isOnline } = useAuth(); // Usando o contexto para acessar a autenticação e o estado online
  const [localSheets, setLocalSheets] = useState<ICharacterSheet[]>([]);
  // Criando um estado separado para as informações dos cards
  const [simpleSheets, setSimpleSheets] = useState<SimpleCharacter[]>([]);

  useEffect(() => {
    const fetchSheets = async () => {
      console.log("Teste");
      if (isAuthenticated && isOnline) {
        console.log("autenticado e online");
        try {
          // Lógica para buscar fichas online do Firebase
          const response = await fetch(
            "https://cyberpunk-react-default-rtdb.firebaseio.com/fichas.json"
          );
          const data: CharacterData = await response.json();

          // Transforme o objeto em um array
          const sheetsArray: SimpleCharacter[] = Object.entries(data).map(
            ([name, details]) => ({
              name,
              age: details.age,
            })
          );

          setSimpleSheets(sheetsArray); // Atualiza o estado com o array de fichas
          console.log("Sucesso no firebase");
        } catch (error) {
          console.error("Erro ao buscar fichas online:", error);
        }
      } else {
        // Lógica para buscar fichas offline do localStorage
        const storedSheets = localStorage.getItem("characterSheets");
        if (storedSheets) {
          setLocalSheets(JSON.parse(storedSheets));
        } else {
        }
      }
    };

    fetchSheets(); // Executa a função para buscar as fichas

    // Retorne void ou nada no useEffect
  }, [isAuthenticated, isOnline]); // Dependências corretas para o useEffect

  return (
    <div className="bg-[url('../wallpapers/characters-list-wp.png')] bg-cover bg-center bg-fixed min-h-screen">
      <div className="flex flex-col items-left">
        {/* Seção de Fichas Online */}
        <h1 className="text-[3rem] bg-black/50 text-gray-300 p-2 m-2 w-[300px] text-center rounded-lg">
          Fichas Online
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {simpleSheets.map((sheet) => (
            <div
              key={sheet.name}
              className="bg-black/50 text-gray-300 p-4 m-2 rounded-lg"
            >
              <h2>{sheet.name}</h2>
              <p>Idade: {sheet.age}</p>
            </div>
          ))}
        </div>

        {/* Seção de Fichas Locais */}
        <h1 className="text-[3rem] bg-black/50 text-gray-300 p-2 m-2 w-[300px] text-center rounded-lg">
          Fichas Locais
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {localSheets.map((sheet) => (
            <div
              key={sheet.name}
              className="bg-black/50 text-gray-300 p-4 m-2 rounded-lg"
            >
              <h2>{sheet.name}</h2>
              <p>Idade: {sheet.age}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Characters;
