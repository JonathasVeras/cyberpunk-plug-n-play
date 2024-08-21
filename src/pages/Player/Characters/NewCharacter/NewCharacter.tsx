import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Background from "../../../../components/CreateCharacter/Background/Background";
import Attributes from "../../../../components/CreateCharacter/Attributes/Attributes";
import InfoCharacter from "../../../../components/CreateCharacter/InfoCharacter/InfoCharacter";
import { useAuth } from "../../../../contexts/AuthContext";
import { IAttributes, ICharacterSheet } from "../../../../interfaces/characterSheet";
export interface ICharacterStats {
  maxHealth: number;
  tokenHealthPoints: number;
  maxSanity: number;
  damageReduction: number;
  walkAndDifficultTerrain: number;
  runSpeed: number;
  woundedAndOverloadedPenalty: number;
  passivePerception: number;
  maxWeight: number;
  identity: number;
  baseSpeed: number;
  movement: number;
}

const CriarFicha: React.FC = () => {
  const { isAuthenticated, isOnline } = useAuth();
  const [background, setBackground] = useState<string>("");
  const [attributes, setAttributes] = useState<IAttributes>({
    acceptance: 2,
    agility: 2,
    selfControl: 2,
    blocking: 2,
    fighting: 2,
    body: 2,
    destiny: 2,
    dexterity: 2,
    empathy: 2,
    dodge: 2,
    faith: 2,
    focus: 2,
    strength: 2,
    humanity: 2,
    intelligence: 2,
    intimidation: 2,
    hacking: 2,
    leadership: 2,
    narrative: 2,
    protection: 2,
    endurance: 2,
    wisdom: 2,
    seduction: 2,
    luck: 2,
    invasion: 2,
    block: 2,
    fight: 2,
  });
  const [stats, setStats] = useState<ICharacterStats>({
    maxHealth: 0,
    tokenHealthPoints: 0,
    maxSanity: 0,
    damageReduction: 0,
    walkAndDifficultTerrain: 0,
    runSpeed: 0,
    woundedAndOverloadedPenalty: 0,
    passivePerception: 0,
    maxWeight: 0,
    identity: 0,
    baseSpeed: 0,
    movement: 0,
  });
  const [characterName, setCharacterName] = useState<string>("");
  const [age, setAge] = useState<number>(0);
  const [gender, setGender] = useState<string>("");
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  const createSheet = () => {
    return {
      background: background,
      attributes: attributes,
      difficultTerrainMovement: stats.walkAndDifficultTerrain,
      run: stats.runSpeed,
      woundedAndOverloaded: stats.woundedAndOverloadedPenalty,
      userId: "offlineUser",
      age: age.toString(),
      identity: stats.identity,
      movement: stats.movement,
      name: characterName,
      passivePerception: stats.passivePerception,
      maxWeight: stats.maxWeight,
      tokenHealthPoints: stats.tokenHealthPoints,
      damageReduction: stats.damageReduction,
      maxSanity: stats.maxSanity,
      gender: gender,
      baseSpeed: stats.baseSpeed,
      maxHealth: stats.maxHealth,
      weapons: [],
      cyberware: []
    };
  };


  const handleSair = () => {
    setStep(step - 1)
  };

  const handleContinuar = () => {
    let auxStep = step + 1;

    if (auxStep == 4) {
      const sheet: ICharacterSheet = createSheet();
      if (isAuthenticated && isOnline) {
        postSheetFirebase(sheet);
      } else {
        postSheetLocal(sheet);
        alert("You are offline. your sheet will be save locally.");
      }
      navigate("/characters");
    }
    setStep(auxStep)
  };

  const postSheetLocal = (sheet: ICharacterSheet) => {
    const storedSheets = localStorage.getItem('CharacterSheetsOffline');
    const sheetsList = storedSheets ? JSON.parse(storedSheets) : [];

    sheetsList.push(sheet);

    localStorage.setItem('CharacterSheetsOffline', JSON.stringify(sheetsList));
  };

  const postSheetFirebase = (sheet: ICharacterSheet) => {
    const nomePersonagem = sheet.name;

    const url = `https://cyberpunk-react-default-rtdb.firebaseio.com/fichas/${nomePersonagem}.json`;
    const options = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(sheet),
    };

    fetch(url, options)
      .then((response) => {
        if (!response.ok) throw new Error("Erro na requisição");
        return response.json();
      })
      .then(() => {
        alert("Ficha criada com sucesso");
      })
      .catch((error) => {
        console.error("Erro ao enviar os dados:", error);
      });
  };

  return (
    <div className="bg-[url('../wallpapers/characters-list-wp.png')] min-h-screen bg-cover bg-fixed bg-center flex flex-col items-center">
      <h1 className="text-4xl font-bold text-[#ef767a] py-4 self-start ml-4">
        Crie Sua Ficha
      </h1>

      <div className="bg-[#220425] text-[#00ffff] border-2 border-[#00ffff] p-6 rounded-tr-xl rounded-bl-xl mt-20">
        {step == 1 &&
          <Background background={background} setBackground={setBackground} />
        }
        {step == 2 &&
          <Attributes attributes={attributes} setAttributes={setAttributes} setStats={setStats} />
        }
        {step == 3 &&
          <InfoCharacter characterName={characterName} setCharacterName={setCharacterName} age={age} setAge={setAge} gender={gender} setGender={setGender} />
        }
        <div className="flex justify-between mt-8">
          <button
            type="button"
            onClick={handleSair}
            className="bg-red-600 text-black font-bold py-2 px-4 rounded-lg"
          >
            Step back
          </button>
          <button
            type="button"
            onClick={handleContinuar}
            className="bg-yellow-400 text-black font-bold py-2 px-4 rounded-lg"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default CriarFicha;
