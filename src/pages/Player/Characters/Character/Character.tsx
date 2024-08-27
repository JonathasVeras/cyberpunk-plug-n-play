import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ICharacterSheet } from "../../../../interfaces/characterSheet";
import { Weapon } from "../../../../interfaces/IWeapon";
import WeaponsListSheet from "../../../../components/WeaponsList/WeaponsListSheet";
import weaponsData from "../../../../jsons/Weapons-Cyberpunk.json";
import { ICyberware } from "../../../../interfaces/ICyberware";
import cyberwareData from "../../../../jsons/Cyberwares.json";
import CyberwareListSheet from "../../../../components/CyberwareList/CyberwareListSheet";
import { FaDiceD20, FaDiceD6 } from "react-icons/fa";
import FaDiceD8 from "../../../../../public/diceIcon/d8icon.png";
import FaDiceD10 from "../../../../../public/diceIcon/d10icon.png";
import FaDiceD4 from "../../../../../public/diceIcon/d4icon.png";
import FaDiceD12 from "../../../../../public/diceIcon/d12icon.png";
import EditCharacterSheet from "../../../../components/EditCharacterSheet/EditCharacterSheet";

const Character: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [isEditing, setIsEditing] = useState(false);
  const [character, setCharacter] = useState<ICharacterSheet | null>(null);
  const [weaponList, setWeaponList] = useState<Weapon[]>([]);
  const [cyberwareList, setCyberwareList] = useState<ICyberware[]>([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [diceResult, setDiceResult] = useState<number | null>(null);

  useEffect(() => {
    const formattedData: Weapon[] = weaponsData.map((weapon) => ({
      Category: weapon.Category,
      Manufacturer: weapon.Manufacturer,
      Name: weapon.Name,
      WeaponSkill: weapon["Weapon Skill"],
      Damage: weapon.Damage,
      AccuracyBonus: weapon["Accuracy Bonus"],
      Magazine: weapon.Magazine,
      RateOfFire: weapon["Rate of Fire"],
      HandsRequired: weapon["Hands Required"],
      Availability: weapon.Availability,
      Concealment: weapon.Concealment,
      Quality: weapon.Quality,
      Cost: weapon.Cost,
      AdditionalInfo: weapon["Additional Info"],
      Description: weapon.Description,
    }));
    const formattedDataCyberware: ICyberware[] = cyberwareData.map(
      (cyberware) => ({
        Title: cyberware.Title,
        Category: cyberware.Category,
        Manufacturer: cyberware.Manufacturer,
        Description: cyberware.Description,
        Cost: Number(cyberware.Cost),
      })
    );

    setWeaponList(formattedData);
    setCyberwareList(formattedDataCyberware);
  }, []);

  useEffect(() => {
    fetchCharacter();
  }, [id]);

  const handleAddWeapon = (weapon: Weapon) => {
    if (character) {
      const newWeapon: Weapon = {
        Category: weapon.Category || null,
        Manufacturer: weapon.Manufacturer || null,
        Name: weapon.Name || "",
        WeaponSkill: weapon.WeaponSkill || null,
        Damage: weapon.Damage || "",
        AccuracyBonus: weapon.AccuracyBonus || null,
        Magazine: weapon.Magazine || null,
        RateOfFire: weapon.RateOfFire || null,
        HandsRequired: weapon.HandsRequired || null,
        Availability: weapon.Availability || null,
        Concealment: weapon.Concealment || null,
        Quality: weapon.Quality || null,
        Cost: weapon.Cost || null,
        AdditionalInfo: weapon.AdditionalInfo || null,
        Description: weapon.Description || null,
      };

      const updatedCharacter = {
        ...character,
        weapons: [...character.weapons, newWeapon],
      };
      setCharacter(updatedCharacter);

      if (id?.startsWith("local-")) {
        const localIndex = parseInt(id.replace("local-", ""), 10);
        const storedSheets = localStorage.getItem("CharacterSheetsOffline");
        if (storedSheets) {
          const sheets = JSON.parse(storedSheets) as ICharacterSheet[];
          sheets[localIndex] = updatedCharacter;
          localStorage.setItem(
            "CharacterSheetsOffline",
            JSON.stringify(sheets)
          );
        }
      } else {
        // updateFichaNoFirebase(id, updatedCharacter);
      }
    }
  };

  const handleRemoveWeapon = (index: number) => {
    if (character) {
      const newWeapons = [...character.weapons];
      newWeapons.splice(index, 1);
      const updatedCharacter = { ...character, weapons: newWeapons };
      setCharacter(updatedCharacter);

      if (id?.startsWith("local-")) {
        const localIndex = parseInt(id.replace("local-", ""), 10);
        const storedSheets = localStorage.getItem("CharacterSheetsOffline");
        if (storedSheets) {
          const sheets = JSON.parse(storedSheets) as ICharacterSheet[];
          sheets[localIndex] = updatedCharacter;
          localStorage.setItem(
            "CharacterSheetsOffline",
            JSON.stringify(sheets)
          );
        }
      } else {
        // updateFichaNoFirebase(id, updatedCharacter);
      }
    }
  };

  const handleAddCyberware = (cyberware: ICyberware) => {
    if (character) {
      const newCyberware: ICyberware = {
        Title: cyberware.Title || null,
        Category: cyberware.Category || null,
        Manufacturer: cyberware.Manufacturer || null,
        Description: cyberware.Description || null,
        Cost: Number(cyberware.Cost) || null,
      };

      const updatedCharacter = {
        ...character,
        cyberware: [...character.cyberware, newCyberware],
      };
      setCharacter(updatedCharacter);

      if (id?.startsWith("local-")) {
        const localIndex = parseInt(id.replace("local-", ""), 10);
        const storedSheets = localStorage.getItem("CharacterSheetsOffline");
        if (storedSheets) {
          const sheets = JSON.parse(storedSheets) as ICharacterSheet[];
          sheets[localIndex] = updatedCharacter;
          localStorage.setItem(
            "CharacterSheetsOffline",
            JSON.stringify(sheets)
          );
        }
      } else {
        // updateFichaNoFirebase(id, updatedCharacter);
      }
    }
  };

  const handleRemoveCyberware = (index: number) => {
    if (character) {
      const newCyberwares = [...character.cyberware];
      newCyberwares.splice(index, 1);
      const updatedCharacter = { ...character, cyberware: newCyberwares };
      setCharacter(updatedCharacter);

      if (id?.startsWith("local-")) {
        const localIndex = parseInt(id.replace("local-", ""), 10);
        const storedSheets = localStorage.getItem("CharacterSheetsOffline");
        if (storedSheets) {
          const sheets = JSON.parse(storedSheets) as ICharacterSheet[];
          sheets[localIndex] = updatedCharacter;
          localStorage.setItem(
            "CharacterSheetsOffline",
            JSON.stringify(sheets)
          );
        }
      } else {
        // updateFichaNoFirebase(id, updatedCharacter);
      }
    }
  };

  // const updateFichaNoFirebase = (
  //   id: string | undefined,
  //   updatedCharacter: ICharacterSheet | null
  // ) => {
  //   const url = `https://cyberpunk-react-default-rtdb.firebaseio.com/fichas/${id}.json`;
  //   const options = {
  //     method: "PUT",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify(updatedCharacter),
  //   };

  //   fetch(url, options)
  //     .then((response) => {
  //       if (!response.ok) throw new Error("Erro na requisição");
  //       return response.json();
  //     })
  //     .catch((error) => {
  //       console.error("Erro ao enviar os dados:", error);
  //     });
  // };

  const fetchCharacter = async () => {
    if (id?.startsWith("local-")) {
      const localIndex = parseInt(id.replace("local-", ""), 10);
      const storedSheets = localStorage.getItem("CharacterSheetsOffline");
      if (storedSheets) {
        const sheets = JSON.parse(storedSheets) as ICharacterSheet[];
        setCharacter(sheets[localIndex]);
      }
    } else {
      try {
        const response = await fetch(
          `https://cyberpunk-react-default-rtdb.firebaseio.com/fichas/${id}.json`
        );
        if (!response.ok) {
          throw new Error("Erro ao buscar ficha online.");
        }
        const data = await response.json();
        if (data) {
          // Inserir manualmente os campos faltantes do firebase
          if (!data.weapons) {
            data.weapons = [];
          }
          if (!data.cyberware) {
            data.cyberware = [];
          }
          setCharacter(data);
        } else {
          console.error("Ficha online não encontrada.");
        }
      } catch (error) {
        console.error("Erro ao buscar ficha online:", error);
      }
    }
  };

  const rollDice = (sides: number) => {
    return Math.floor(Math.random() * sides) + 1;
  };

  const handleDiceClick = (sides: number) => {
    setDiceResult(rollDice(sides));
    setDropdownOpen(false);
  };

  if (!character) {
    return <div>Loading...</div>;
  }

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCloseEdit = () => {
    setIsEditing(false);
  };

  const saveCharacter = async (formState: any) => {
    if (id?.startsWith("local-")) {
      const localIndex = parseInt(id.replace("local-", ""), 10);
      const storedSheets = localStorage.getItem("CharacterSheetsOffline");
      if (storedSheets) {
        const sheets = JSON.parse(storedSheets) as ICharacterSheet[];
        sheets[localIndex] = formState;
        localStorage.setItem("CharacterSheetsOffline", JSON.stringify(sheets));
      }
    } else {
      // updateFichaNoFirebase(id, formState);
    }
  };

  return (
    <div
      className={`bg-[url('../wallpapers/character-sheet-play-wallpaper.jpg')] bg-cover bg-center bg-fixed min-h-screen text-white ${isEditing ? "" : "flex flex-col sm:grid sm:grid-cols-2"}`}
    >
      {isEditing ? (
        <>
          <EditCharacterSheet
            character={character}
            setCharacter={setCharacter}
            saveCharacter={saveCharacter}
            onClose={handleCloseEdit}
          />
        </>
      ) : (
        <>
          <div className="container mx-auto p-8 bg-black/50 rounded-lg sm:col-span-2">
            <header className="mb-6 text-center">
              <h1 className="text-3xl font-bold">{character.name}</h1>
              <p className="text-lg">Age: {character.age}</p>
              <p>Gender: {character.gender}</p>
              <button
                onClick={handleEditClick}
                className="bg-gray-500/50 p-2 rounded-xl"
              >
                Edit
              </button>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Attributes Section */}
              <div className="lg:col-span-1 bg-gray-800/70 p-4 rounded-lg">
                <h2 className="text-xl font-semibold mb-4">Attributes</h2>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  {Object.entries(character.attributes).map(([key, value]) => (
                    <div key={key} className="flex justify-between">
                      <span>{key.charAt(0).toUpperCase() + key.slice(1)}:</span>
                      <span>{value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Character Stats Section */}
              <div className="lg:col-span-2 bg-gray-800/70 p-4 rounded-lg space-y-4">
                <h2 className="text-xl font-semibold mb-4">Character Stats</h2>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex justify-between">
                    <span>Identity:</span>
                    <span>{character.identity}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Max Weight:</span>
                    <span>{character.maxWeight}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Base Speed:</span>
                    <span>{character.baseSpeed}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Movement:</span>
                    <span>{character.movement}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Run:</span>
                    <span>{character.run}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Wounded & Overloaded:</span>
                    <span>{character.woundedAndOverloaded}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Difficult Terrain Movement:</span>
                    <span>{character.difficultTerrainMovement}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Passive Perception:</span>
                    <span>{character.passivePerception}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Max Health:</span>
                    <span>{character.maxHealth}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Max Sanity:</span>
                    <span>{character.maxSanity}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Damage Reduction:</span>
                    <span>{character.damageReduction}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Token Health Points:</span>
                    <span>{character.tokenHealthPoints}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Items, Weapons, Cyberware, and Skills */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
              <WeaponsListSheet
                weapons={character.weapons}
                onAddWeapon={handleAddWeapon}
                onRemoveWeapon={handleRemoveWeapon}
                availableWeapons={weaponList}
              />
              <div className="bg-gray-800/70 p-4 rounded-lg">
                <h2 className="text-xl font-semibold mb-4">Items</h2>
                <div className="space-y-2">
                  {/* Example of an item */}
                  <div className="flex justify-between bg-gray-900 p-2 rounded-lg">
                    <span>Item Name</span>
                    <span>Quantity: 3</span>
                  </div>
                  {/* Additional items */}
                </div>
              </div>

              <CyberwareListSheet
                cyberwares={character.cyberware}
                onAddCyberware={handleAddCyberware}
                onRemoveCyberware={handleRemoveCyberware}
                availableCyberware={cyberwareList}
              />

              <div className="bg-gray-800/70 p-4 rounded-lg">
                <h2 className="text-xl font-semibold mb-4">Skills</h2>
                <div className="space-y-2">
                  {/* Example of a skill */}
                  <div className="flex justify-between bg-gray-900 p-2 rounded-lg">
                    <span>Skill Name</span>
                    <span>Level: 4</span>
                  </div>
                  {/* Additional skills */}
                </div>
              </div>
            </div>
          </div>

          {/* Dice Button and Dropdown */}
          <div className="fixed bottom-4 right-4">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="bg-yellow-500 text-white p-4 rounded-full shadow-lg flex items-center justify-center"
            >
              <FaDiceD20 size={24} color={"white"} />
            </button>
            {dropdownOpen && (
              <div className="mt-2 bg-white text-black rounded-lg shadow-lg w-48">
                <ul>
                  <li
                    onClick={() => handleDiceClick(4)}
                    className="sm:flex sm:gap-2 p-2 hover:bg-gray-200 cursor-pointe"
                  >
                    <img src={FaDiceD4} className="w-[2rem]"></img> d4
                  </li>
                  <li
                    onClick={() => handleDiceClick(6)}
                    className="p-2 hover:bg-gray-200 cursor-pointer"
                  >
                    <FaDiceD6 className="inline-block mr-2" size={35} /> d6
                  </li>
                  <li
                    onClick={() => handleDiceClick(8)}
                    className="sm:flex sm:gap-2 p-2 hover:bg-gray-200 cursor-pointer"
                  >
                    <img src={FaDiceD8} className="w-[2rem]"></img> d8
                  </li>
                  <li
                    onClick={() => handleDiceClick(10)}
                    className="sm:flex sm:gap-2 p-2 hover:bg-gray-200 cursor-pointe"
                  >
                    <img src={FaDiceD10} className="w-[2rem]"></img> d10
                  </li>
                  <li
                    onClick={() => handleDiceClick(12)}
                    className="sm:flex sm:gap-2 p-2 hover:bg-gray-200 cursor-pointe"
                  >
                    <img src={FaDiceD12} className="w-[2rem]"></img> d12
                  </li>
                  <li
                    onClick={() => handleDiceClick(20)}
                    className="p-2 hover:bg-gray-200 cursor-pointer"
                  >
                    <FaDiceD20 className="inline-block mr-2" size={35} /> d20
                  </li>
                </ul>
              </div>
            )}
            {diceResult !== null && (
              <div className="mt-2 bg-black text-white font-bold p-2 rounded-lg">
                <p>Result: {diceResult}</p>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Character;
