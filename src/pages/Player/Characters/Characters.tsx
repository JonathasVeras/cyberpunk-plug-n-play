import React, { useEffect, useState } from "react";
import { useAuth } from "../../../contexts/AuthContext";
import { ICharacterSheet } from "../../../interfaces/characterSheet";
import { Link } from "react-router-dom";

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
  const { isAuthenticated, isOnline } = useAuth();
  const [localSheets, setLocalSheets] = useState<ICharacterSheet[]>([]);
  const [simpleSheets, setSimpleSheets] = useState<SimpleCharacter[]>([]);

  useEffect(() => {
    fetchSheets();
  }, [isAuthenticated, isOnline]);

  const fetchSheets = async () => {
    if (isAuthenticated && isOnline) {
      try {
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

        setSimpleSheets(sheetsArray);
      } catch (error) {
        console.error("Erro ao buscar fichas online:", error);
      }
    } else {
      const storedSheets = localStorage.getItem("CharacterSheetsOffline");
      if (storedSheets) {
        setLocalSheets(JSON.parse(storedSheets));
      } else {
        setLocalSheets([]);
      }
    }
  };

  return (
    <div className="bg-[url('../wallpapers/characters-list-wp.png')] bg-cover bg-center bg-fixed min-h-screen">
      <div className="flex flex-col items-left">
        {/* Seção de Fichas Online */}
        <h1 className="text-[3rem] bg-black/50 text-gray-300 p-2 m-2 w-[300px] text-center rounded-lg">
          Fichas Online
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {simpleSheets.map((sheet, index) => (
            <Link to={`/characters/${index}`} key={sheet.name}>
              <div className="bg-black/50 text-gray-300 p-4 m-2 rounded-lg">
                <h2>{sheet.name}</h2>
                <p>Idade: {sheet.age}</p>
              </div>
            </Link>
          ))}
        </div>

        {/* Seção de Fichas Locais */}
        <h1 className="text-[3rem] bg-black/50 text-gray-300 p-2 m-2 w-[300px] text-center rounded-lg">
          Fichas Locais
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {localSheets.map((sheet, index) => (
            <Link to={`/characters/local-${index}`} key={sheet.name}>
              <div className="bg-black/50 text-gray-300 p-4 m-2 rounded-lg">
                <h2>{sheet.name}</h2>
                <p>Idade: {sheet.age}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Characters;
